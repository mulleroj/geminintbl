import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import Tesseract from 'tesseract.js';
import { linesToBlocks, MAX_PDF_PAGES, MAX_RENDER_EDGE } from './model';
import type { OcrLine, SlideBox, SlideModel } from './types';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export interface ProcessProgress {
  stage: 'render' | 'ocr';
  current: number;
  total: number;
  message: string;
}

interface RenderedSlide {
  pageNumber: number;
  width: number;
  height: number;
  imageUrl: string;
  canvas: HTMLCanvasElement;
}

function colorForBox(canvas: HTMLCanvasElement, box: SlideBox): string {
  const context = canvas.getContext('2d');
  if (!context) return '#ffffff';
  const margin = Math.max(5, Math.round(Math.min(box.width, box.height) * 0.14));
  const points = [
    [box.x + box.width / 2, box.y - margin],
    [box.x + box.width / 2, box.y + box.height + margin],
    [box.x - margin, box.y + box.height / 2],
    [box.x + box.width + margin, box.y + box.height / 2],
  ];
  const pixels = points.map(([x, y]) => {
    const sampleX = Math.min(canvas.width - 1, Math.max(0, Math.round(x)));
    const sampleY = Math.min(canvas.height - 1, Math.max(0, Math.round(y)));
    const data = context.getImageData(sampleX, sampleY, 1, 1).data;
    return [data[0], data[1], data[2]];
  });
  const average = pixels.reduce((result, pixel) => result.map((value, index) => value + pixel[index]), [0, 0, 0]).map((value) => Math.round(value / pixels.length));
  return `#${average.map((value) => value.toString(16).padStart(2, '0')).join('')}`;
}

async function renderPages(file: File, onProgress: (progress: ProcessProgress) => void): Promise<RenderedSlide[]> {
  const buffer = await file.arrayBuffer();
  const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(buffer) });
  const pdf = await loadingTask.promise;
  if (pdf.numPages === 0) throw new Error('PDF neobsahuje žádné stránky.');
  if (pdf.numPages > MAX_PDF_PAGES) throw new Error(`PDF má příliš mnoho stran. Limit je ${MAX_PDF_PAGES}.`);
  const slides: RenderedSlide[] = [];
  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    onProgress({ stage: 'render', current: pageNumber, total: pdf.numPages, message: `Vykresluji slide ${pageNumber} z ${pdf.numPages}…` });
    const page = await pdf.getPage(pageNumber);
    const baseViewport = page.getViewport({ scale: 1 });
    const scale = Math.min(2, MAX_RENDER_EDGE / Math.max(baseViewport.width, baseViewport.height));
    const viewport = page.getViewport({ scale: Math.max(scale, 0.65) });
    const canvas = globalThis.document.createElement('canvas');
    canvas.width = Math.ceil(viewport.width);
    canvas.height = Math.ceil(viewport.height);
    const context = canvas.getContext('2d', { alpha: false });
    if (!context) throw new Error(`Pro slide ${pageNumber} se nepodařilo vytvořit canvas.`);
    await page.render({ canvasContext: context, canvas, viewport }).promise;
    slides.push({ pageNumber, width: canvas.width, height: canvas.height, imageUrl: canvas.toDataURL('image/jpeg', 0.92), canvas });
    page.cleanup();
  }
  await loadingTask.destroy();
  return slides;
}

function extractLines(data: Tesseract.Page): OcrLine[] {
  const lines = data.blocks?.flatMap((block) => block.paragraphs.flatMap((paragraph) => paragraph.lines.map((line) => ({
    text: line.text,
    confidence: line.confidence,
    bbox: { x: line.bbox.x0, y: line.bbox.y0, width: line.bbox.x1 - line.bbox.x0, height: line.bbox.y1 - line.bbox.y0 },
  }))));
  if (lines?.length) return lines;
  return data.blocks?.map((block) => ({
    text: block.text,
    confidence: block.confidence,
    bbox: { x: block.bbox.x0, y: block.bbox.y0, width: block.bbox.x1 - block.bbox.x0, height: block.bbox.y1 - block.bbox.y0 },
  })) ?? [];
}

export async function processPdf(file: File, onProgress: (progress: ProcessProgress) => void): Promise<SlideModel[]> {
  const rendered = await renderPages(file, onProgress);
  let worker: Tesseract.Worker | null = null;
  try {
    worker = await Tesseract.createWorker('ces+eng', 1, {
      logger: (message) => {
        const current = rendered.findIndex((slide) => slide.pageNumber === Number(message.userJobId)) + 1;
        if (current > 0) onProgress({ stage: 'ocr', current, total: rendered.length, message: `Rozpoznávám text slidu ${current} z ${rendered.length}…` });
      },
    });
    const slides: SlideModel[] = [];
    for (const item of rendered) {
      onProgress({ stage: 'ocr', current: item.pageNumber, total: rendered.length, message: `Rozpoznávám text slidu ${item.pageNumber} z ${rendered.length}…` });
      const result = await worker.recognize(item.canvas, undefined, { blocks: true });
      const lines = extractLines(result.data);
      const blocks = linesToBlocks(lines, item.width, item.height, (box) => colorForBox(item.canvas, box));
      slides.push({ id: `slide-${item.pageNumber}`, pageNumber: item.pageNumber, width: item.width, height: item.height, imageUrl: item.imageUrl, blocks });
      item.canvas.width = 1;
      item.canvas.height = 1;
    }
    return slides;
  } finally {
    await worker?.terminate();
  }
}
