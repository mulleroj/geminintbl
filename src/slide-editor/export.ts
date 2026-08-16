import PptxGenJS from 'pptxgenjs';
import { boxToPptx, sanitizeFileName } from './model';
import type { SlideEditorProject, SlideModel, SlideTextBlock } from './types';

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
    source.blocks.forEach((block) => addEditableBlock(pptx, slide, source, block, widthIn, heightIn));
  }
  const result = await pptx.write({ outputType: 'blob', compression: true });
  if (result instanceof Blob) return result;
  if (result instanceof ArrayBuffer) return new Blob([result], { type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' });
  if (result instanceof Uint8Array) return new Blob([result.buffer.slice(result.byteOffset, result.byteOffset + result.byteLength) as ArrayBuffer], { type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' });
  throw new Error('PowerPoint se nepodařilo připravit.');
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
