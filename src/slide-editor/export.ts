import PptxGenJS from 'pptxgenjs';
import JSZip from 'jszip';
import { boxToPptx, isBlockEdited, sanitizeFileName } from './model';
import type { SlideEditorProject, SlideModel, SlideTextBlock } from './types';

const PPTX_MIME = 'application/vnd.openxmlformats-officedocument.presentationml.presentation';

function hexColor(value: string): string {
  return value.replace('#', '').slice(0, 6).padEnd(6, 'F').toUpperCase();
}

function addEditableBlock(pptx: PptxGenJS, slide: PptxGenJS.Slide, source: SlideModel, block: SlideTextBlock, widthIn: number, heightIn: number): void {
  const position = boxToPptx(block, source.width, source.height, widthIn, heightIn);
  const fontSize = Math.min(48, Math.max(7, (block.fontSize / source.height) * heightIn * 72 * 0.78));
  const mask = hexColor(block.maskColor);
  slide.addShape(pptx.ShapeType.rect, {
    x: position.x,
    y: position.y,
    w: position.width,
    h: position.height,
    fill: { color: mask },
    line: { color: mask, transparency: 100 },
  });
  slide.addText(block.text, {
    x: position.x,
    y: position.y,
    w: position.width,
    h: position.height,
    margin: 0.03,
    fontFace: 'Arial',
    fontSize,
    color: hexColor(block.color),
    bold: block.bold,
    italic: block.italic,
    align: block.align,
    valign: 'middle',
    breakLine: false,
    fit: 'shrink',
  });
}

function lockFullSlidePicture(xml: string): string {
  const pictureMatch = xml.match(/<p:pic>[\s\S]*?<\/p:pic>/);
  if (!pictureMatch) return xml;

  const picture = pictureMatch[0];
  const lockedPicture = picture.replace(
    /<a:picLocks\b[^>]*\/>/,
    '<a:picLocks noChangeAspect="1" noSelect="1" noMove="1" noResize="1"/>',
  );
  if (lockedPicture === picture) return xml;
  return xml.replace(picture, lockedPicture);
}

async function lockFullSlidePictures(blob: Blob): Promise<Blob> {
  const zip = await JSZip.loadAsync(blob);
  const slideFiles = Object.keys(zip.files).filter((name) => /^ppt\/slides\/slide\d+\.xml$/.test(name));
  await Promise.all(slideFiles.map(async (name) => {
    const file = zip.file(name);
    if (!file) return;
    const xml = await file.async('string');
    const updated = lockFullSlidePicture(xml);
    if (updated !== xml) zip.file(name, updated);
  }));
  return zip.generateAsync({ type: 'blob', compression: 'DEFLATE', mimeType: PPTX_MIME });
}

export async function createPptx(project: SlideEditorProject): Promise<Blob> {
  const first = project.slides[0];
  if (!first) throw new Error('Projekt neobsahuje žádný slide.');
  const widthIn = 10;
  const heightIn = widthIn * (first.height / first.width);
  const pptx = new PptxGenJS();
  pptx.defineLayout({ name: 'NOTEBOOK_CUSTOM', width: widthIn, height: heightIn });
  pptx.layout = 'NOTEBOOK_CUSTOM';
  pptx.author = 'Notebook Hub CZ';
  pptx.company = 'Notebook Hub CZ';
  pptx.subject = 'Upravitelná prezentace z PDF';
  pptx.title = sanitizeFileName(project.fileName);
  for (const source of project.slides) {
    const slide = pptx.addSlide();
    slide.addImage({ data: source.imageUrl, x: 0, y: 0, w: widthIn, h: heightIn });
    source.blocks.filter(isBlockEdited).forEach((block) => addEditableBlock(pptx, slide, source, block, widthIn, heightIn));
  }
  const result = await pptx.write({ outputType: 'blob', compression: true });
  let blob: Blob;
  if (result instanceof Blob) blob = result;
  else if (result instanceof ArrayBuffer) blob = new Blob([result], { type: PPTX_MIME });
  else if (result instanceof Uint8Array) blob = new Blob([result.buffer.slice(result.byteOffset, result.byteOffset + result.byteLength) as ArrayBuffer], { type: PPTX_MIME });
  else throw new Error('PowerPoint se nepodařilo připravit.');
  return lockFullSlidePictures(blob);
}

export async function downloadPptx(project: SlideEditorProject): Promise<void> {
  const blob = await createPptx(project);
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `${sanitizeFileName(project.fileName)}-upraveno.pptx`;
  anchor.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
