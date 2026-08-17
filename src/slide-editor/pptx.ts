import JSZip from 'jszip';
import Tesseract from 'tesseract.js';
import { linesToBlocks, MAX_RENDER_EDGE } from './model';
import type { ProcessProgress } from './pdf';
import type { SlideBox, SlideImageBlock, SlideModel, SlideTextBlock } from './types';

const REL_NS = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships';
const EMU_PER_SLIDE = 1600;

interface PptxRelationship {
  target: string;
  type: string;
}

interface ParsedPptxSlide {
  slidePath: string;
  widthEmu: number;
  heightEmu: number;
  width: number;
  height: number;
  texts: SlideTextBlock[];
  images: SlideImageBlock[];
  backgroundImageUrl: string | null;
}

function xmlDocument(source: string): XMLDocument {
  const document = new DOMParser().parseFromString(source, 'application/xml');
  if (document.getElementsByTagName('parsererror').length) throw new Error('PowerPoint obsahuje neplatné XML.');
  return document;
}

function descendants(node: ParentNode, localName: string): Element[] {
  return Array.from(node.querySelectorAll('*')).filter((element) => element.localName === localName);
}

function firstDescendant(node: ParentNode, localName: string): Element | null {
  return descendants(node, localName)[0] ?? null;
}

function numberAttribute(node: Element | null, name: string, fallback = 0): number {
  const value = Number(node?.getAttribute(name));
  return Number.isFinite(value) ? value : fallback;
}

function relationshipAttribute(node: Element, name: string): string {
  return node.getAttributeNS(REL_NS, name) || node.getAttribute(`r:${name}`) || '';
}

function normalizeZipPath(path: string): string {
  const parts: string[] = [];
  for (const part of path.replaceAll('\\', '/').split('/')) {
    if (!part || part === '.') continue;
    if (part === '..') parts.pop();
    else parts.push(part);
  }
  return parts.join('/');
}

function resolvePart(basePart: string, target: string): string {
  if (target.startsWith('/')) return normalizeZipPath(target.slice(1));
  const directory = basePart.slice(0, basePart.lastIndexOf('/') + 1);
  return normalizeZipPath(`${directory}${target}`);
}

function relationshipsPath(partPath: string): string {
  const slash = partPath.lastIndexOf('/');
  const directory = slash >= 0 ? partPath.slice(0, slash + 1) : '';
  const fileName = slash >= 0 ? partPath.slice(slash + 1) : partPath;
  return `${directory}_rels/${fileName}.rels`;
}

async function readRelationships(zip: JSZip, partPath: string): Promise<Map<string, PptxRelationship>> {
  const file = zip.file(relationshipsPath(partPath));
  if (!file) return new Map();
  const document = xmlDocument(await file.async('string'));
  const relationships = new Map<string, PptxRelationship>();
  for (const node of descendants(document, 'Relationship')) {
    const id = node.getAttribute('Id');
    const target = node.getAttribute('Target');
    if (id && target) relationships.set(id, { target: resolvePart(partPath, target), type: node.getAttribute('Type') || '' });
  }
  return relationships;
}

function slideSize(document: XMLDocument): { widthEmu: number; heightEmu: number } {
  const size = firstDescendant(document, 'sldSz');
  const widthEmu = numberAttribute(size, 'cx', 12192000);
  const heightEmu = numberAttribute(size, 'cy', 6858000);
  return { widthEmu, heightEmu };
}

function objectBox(node: Element, widthEmu: number, heightEmu: number, width: number, height: number): SlideBox {
  const transform = firstDescendant(node, 'xfrm');
  const offset = firstDescendant(transform ?? node, 'off');
  const extent = firstDescendant(transform ?? node, 'ext');
  const x = numberAttribute(offset, 'x') / widthEmu * width;
  const y = numberAttribute(offset, 'y') / heightEmu * height;
  const boxWidth = numberAttribute(extent, 'cx') / widthEmu * width;
  const boxHeight = numberAttribute(extent, 'cy') / heightEmu * height;
  return { x, y, width: Math.max(24, boxWidth), height: Math.max(16, boxHeight) };
}

function colorFromText(node: Element): string {
  const color = firstDescendant(node, 'srgbClr')?.getAttribute('val');
  return color && /^[0-9a-f]{6}$/i.test(color) ? `#${color}` : '#17211c';
}

function textAlign(node: Element): SlideTextBlock['align'] {
  const alignment = firstDescendant(node, 'pPr')?.getAttribute('algn');
  return alignment === 'ctr' ? 'center' : alignment === 'r' ? 'right' : 'left';
}

function textStyle(node: Element, box: SlideBox): Pick<SlideTextBlock, 'fontSize' | 'color' | 'bold' | 'italic'> {
  const runProperties = firstDescendant(node, 'rPr') ?? firstDescendant(node, 'defRPr');
  const points = numberAttribute(runProperties, 'sz') / 100;
  return {
    fontSize: points > 0 ? Math.min(120, Math.max(8, points * 1.333)) : Math.max(12, box.height * 0.78),
    color: colorFromText(runProperties ?? node),
    bold: runProperties?.getAttribute('b') === '1',
    italic: runProperties?.getAttribute('i') === '1',
  };
}

function textFromShape(node: Element): string {
  return descendants(node, 'p')
    .map((paragraph) => descendants(paragraph, 't').map((text) => text.textContent ?? '').join(''))
    .filter(Boolean)
    .join('\n')
    .trim();
}

function escapeXml(value: string): string {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;');
}

function imageMime(path: string): string {
  const extension = path.split('.').pop()?.toLowerCase();
  if (extension === 'jpg' || extension === 'jpeg') return 'image/jpeg';
  if (extension === 'svg') return 'image/svg+xml';
  if (extension === 'gif') return 'image/gif';
  return 'image/png';
}

async function imageDataUrl(zip: JSZip, path: string, cache: Map<string, string>): Promise<string | null> {
  if (cache.has(path)) return cache.get(path) ?? null;
  const file = zip.file(path);
  if (!file) return null;
  const base64 = await file.async('base64');
  const dataUrl = `data:${imageMime(path)};base64,${base64}`;
  cache.set(path, dataUrl);
  return dataUrl;
}

function svgPreview(width: number, height: number, backgroundImageUrl: string | null, images: SlideImageBlock[], texts: SlideTextBlock[]): string {
  const imageMarkup = images.map((image) => `<image href="${escapeXml(image.imageUrl)}" x="${image.x}" y="${image.y}" width="${image.width}" height="${image.height}" preserveAspectRatio="none" />`).join('');
  const textMarkup = texts.map((text) => `<text x="${text.x + 4}" y="${text.y + 4}" width="${text.width}" font-family="Arial, sans-serif" font-size="${text.fontSize}" fill="${escapeXml(text.color)}" font-weight="${text.bold ? '700' : '400'}" font-style="${text.italic ? 'italic' : 'normal'}">${escapeXml(text.text).replaceAll('\n', '&#10;')}</text>`).join('');
  const background = backgroundImageUrl ? `<image href="${escapeXml(backgroundImageUrl)}" x="0" y="0" width="${width}" height="${height}" preserveAspectRatio="none" />` : '<rect width="100%" height="100%" fill="#ffffff" />';
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${background}${imageMarkup}${textMarkup}</svg>`)}`;
}

async function rasterize(dataUrl: string, width: number, height: number): Promise<{ canvas: HTMLCanvasElement; imageUrl: string }> {
  const image = new Image();
  image.decoding = 'async';
  image.src = dataUrl;
  await image.decode();
  const canvas = document.createElement('canvas');
  const scale = Math.min(1, MAX_RENDER_EDGE / Math.max(width, height));
  canvas.width = Math.max(1, Math.round(width * scale));
  canvas.height = Math.max(1, Math.round(height * scale));
  const context = canvas.getContext('2d', { alpha: false });
  if (!context) throw new Error('Pro náhled PowerPointu se nepodařilo vytvořit canvas.');
  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
  return { canvas, imageUrl: canvas.toDataURL('image/jpeg', 0.92) };
}

function parseTextShapes(slideDocument: XMLDocument, widthEmu: number, heightEmu: number, width: number, height: number): SlideTextBlock[] {
  return descendants(slideDocument, 'sp').map((shape, index) => {
    const box = objectBox(shape, widthEmu, heightEmu, width, height);
    const text = textFromShape(shape);
    const style = textStyle(shape, box);
    return { id: `ppt-text-${index + 1}`, ...box, text, originalText: text, edited: false, confidence: 100, maskColor: '#ffffff', ...style, align: textAlign(shape) };
  }).filter((block) => block.text.length >= 1 && block.width >= 12 && block.height >= 8);
}

async function parseImageShapes(zip: JSZip, slideDocument: XMLDocument, relationships: Map<string, PptxRelationship>, widthEmu: number, heightEmu: number, width: number, height: number, cache: Map<string, string>): Promise<SlideImageBlock[]> {
  const images: SlideImageBlock[] = [];
  for (const [index, picture] of descendants(slideDocument, 'pic').entries()) {
    const blip = firstDescendant(picture, 'blip');
    const relationshipId = blip ? relationshipAttribute(blip, 'embed') : '';
    const relationship = relationships.get(relationshipId);
    if (!relationship) continue;
    const dataUrl = await imageDataUrl(zip, relationship.target, cache);
    if (!dataUrl) continue;
    const box = objectBox(picture, widthEmu, heightEmu, width, height);
    const name = firstDescendant(picture, 'cNvPr')?.getAttribute('descr') || firstDescendant(picture, 'cNvPr')?.getAttribute('name') || `Obrázek ${index + 1}`;
    images.push({ id: `ppt-image-${index + 1}`, ...box, imageUrl: dataUrl, edited: false, maskColor: '#ffffff', altText: name });
  }
  return images;
}

async function parseSlide(zip: JSZip, slidePath: string, widthEmu: number, heightEmu: number, cache: Map<string, string>): Promise<ParsedPptxSlide> {
  const file = zip.file(slidePath);
  if (!file) throw new Error(`PowerPoint postrádá ${slidePath}.`);
  const slideDocument = xmlDocument(await file.async('string'));
  const width = EMU_PER_SLIDE;
  const height = Math.max(1, Math.round(width * heightEmu / widthEmu));
  const relationships = await readRelationships(zip, slidePath);
  const texts = parseTextShapes(slideDocument, widthEmu, heightEmu, width, height);
  const images = await parseImageShapes(zip, slideDocument, relationships, widthEmu, heightEmu, width, height, cache);
  const fullSlide = images.length === 1 && images[0].x <= width * 0.02 && images[0].y <= height * 0.02 && images[0].width >= width * 0.96 && images[0].height >= height * 0.96;
  const backgroundImageUrl = fullSlide ? images[0].imageUrl : null;
  return { slidePath, widthEmu, heightEmu, width, height, texts, images: fullSlide ? [] : images, backgroundImageUrl };
}

async function ocrPreview(canvas: HTMLCanvasElement, slideWidth: number, slideHeight: number, worker: Tesseract.Worker): Promise<SlideTextBlock[]> {
  const result = await worker.recognize(canvas, undefined, { blocks: true });
  const lines = result.data.blocks?.flatMap((block) => block.paragraphs.flatMap((paragraph) => paragraph.lines.map((line) => ({
    text: line.text,
    confidence: line.confidence,
    bbox: { x: line.bbox.x0, y: line.bbox.y0, width: line.bbox.x1 - line.bbox.x0, height: line.bbox.y1 - line.bbox.y0 },
  }))));
  return linesToBlocks(lines ?? [], slideWidth, slideHeight, () => '#ffffff');
}

export async function processPptx(file: File, onProgress: (progress: ProcessProgress) => void): Promise<SlideModel[]> {
  const zip = await JSZip.loadAsync(await file.arrayBuffer());
  const presentationFile = zip.file('ppt/presentation.xml');
  if (!presentationFile) throw new Error('Soubor PPTX neobsahuje prezentaci.');
  const presentationDocument = xmlDocument(await presentationFile.async('string'));
  const { widthEmu, heightEmu } = slideSize(presentationDocument);
  const presentationRelationships = await readRelationships(zip, 'ppt/presentation.xml');
  const slideIds = firstDescendant(presentationDocument, 'sldIdLst');
  const slidePaths = descendants(slideIds ?? presentationDocument, 'sldId').map((slideId) => presentationRelationships.get(relationshipAttribute(slideId, 'id'))?.target).filter((path): path is string => Boolean(path));
  if (!slidePaths.length) throw new Error('PowerPoint neobsahuje žádné slidy.');
  if (slidePaths.length > 50) throw new Error('PowerPoint má příliš mnoho slidů. Limit je 50.');
  const cache = new Map<string, string>();
  const parsed: ParsedPptxSlide[] = [];
  for (const [index, slidePath] of slidePaths.entries()) {
    onProgress({ stage: 'render', current: index + 1, total: slidePaths.length, message: `Načítám slide ${index + 1} z ${slidePaths.length}…` });
    parsed.push(await parseSlide(zip, slidePath, widthEmu, heightEmu, cache));
  }
  const needsOcr = parsed.some((slide) => slide.texts.length === 0);
  const worker = needsOcr ? await Tesseract.createWorker('ces+eng', 1) : null;
  try {
    const slides: SlideModel[] = [];
    for (const [index, item] of parsed.entries()) {
      onProgress({ stage: 'ocr', current: index + 1, total: parsed.length, message: item.texts.length ? `Přebírám textové objekty slidu ${index + 1}…` : `Rozpoznávám text slidu ${index + 1}…` });
      const previewSource = item.backgroundImageUrl && !item.texts.length && !item.images.length
        ? item.backgroundImageUrl
        : svgPreview(item.width, item.height, item.backgroundImageUrl, item.images, item.texts);
      const rendered = await rasterize(previewSource, item.width, item.height);
      const scaleX = rendered.canvas.width / item.width;
      const scaleY = rendered.canvas.height / item.height;
      const blocks = item.texts.length
        ? item.texts.map((block) => ({ ...block, x: block.x * scaleX, y: block.y * scaleY, width: block.width * scaleX, height: block.height * scaleY, fontSize: block.fontSize * scaleX }))
        : (worker ? await ocrPreview(rendered.canvas, rendered.canvas.width, rendered.canvas.height, worker) : []);
      slides.push({ id: `slide-${index + 1}`, pageNumber: index + 1, width: rendered.canvas.width, height: rendered.canvas.height, imageUrl: rendered.imageUrl, blocks, imageBlocks: item.images.map((image) => ({ ...image, x: image.x * rendered.canvas.width / item.width, y: image.y * rendered.canvas.height / item.height, width: image.width * rendered.canvas.width / item.width, height: image.height * rendered.canvas.height / item.height })) });
      rendered.canvas.width = 1;
      rendered.canvas.height = 1;
    }
    return slides;
  } finally {
    await worker?.terminate();
  }
}
