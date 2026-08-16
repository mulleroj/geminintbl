import type { OcrLine, SlideBox, SlideEditorProject, SlideTextBlock, TextAlign } from './types';

export const MAX_PDF_BYTES = 40 * 1024 * 1024;
export const MAX_PDF_PAGES = 50;
export const MAX_RENDER_EDGE = 1800;

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function clampBox(box: SlideBox, slideWidth: number, slideHeight: number): SlideBox {
  const x = clamp(box.x, 0, Math.max(0, slideWidth - 1));
  const y = clamp(box.y, 0, Math.max(0, slideHeight - 1));
  const width = clamp(box.width, 24, Math.max(24, slideWidth - x));
  const height = clamp(box.height, 16, Math.max(16, slideHeight - y));
  return { x, y, width, height };
}

export function boxToPptx(box: SlideBox, slideWidth: number, slideHeight: number, widthIn: number, heightIn: number): SlideBox {
  return {
    x: (box.x / slideWidth) * widthIn,
    y: (box.y / slideHeight) * heightIn,
    width: (box.width / slideWidth) * widthIn,
    height: (box.height / slideHeight) * heightIn,
  };
}

export function sanitizeFileName(fileName: string): string {
  const base = fileName.replace(/\.[^.]+$/, '').replace(/[^a-z0-9\u00c0-\u017e_-]+/gi, '-').replace(/^-+|-+$/g, '').slice(0, 72);
  return base || 'notebook-prezentace';
}

export function validatePdfFile(file: Pick<File, 'name' | 'size' | 'type'>): string | null {
  const looksLikePdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
  if (!looksLikePdf) return 'Vyberte soubor ve formátu PDF.';
  if (file.size === 0) return 'Soubor PDF je prázdný.';
  if (file.size > MAX_PDF_BYTES) return `Soubor je příliš velký. Limit je ${Math.round(MAX_PDF_BYTES / 1024 / 1024)} MB.`;
  return null;
}

export function userFacingProcessError(error: unknown): string {
  const message = error instanceof Error ? error.message : String(error ?? '');
  if (/příliš mnoho stran|limit je 50/i.test(message)) return message;
  if (/heslem|password|encrypted/i.test(message)) return 'Toto PDF je chráněné heslem a nelze je v editoru otevřít.';
  if (/invalid\s*pdf|invalidpdf|unexpected eof|bad xref|pdf header|formaterror|neplatn.{0,4}pdf|poškozen/i.test(message)) return 'PDF je poškozené nebo v nepodporovaném formátu.';
  if (/fetch|network|worker|language|tesseract|wasm|cdn|load/i.test(message)) return 'OCR se nepodařilo načíst. Zkontrolujte připojení a zkuste to znovu.';
  return 'PDF se nepodařilo zpracovat. Zkontrolujte soubor a zkuste to znovu.';
}

export function normalizeOcrLines(lines: OcrLine[], slideWidth: number, slideHeight: number): OcrLine[] {
  return lines
    .map((line) => ({ ...line, text: line.text.replace(/\s+/g, ' ').trim(), bbox: clampBox(line.bbox, slideWidth, slideHeight) }))
    .filter((line) => line.text.length >= 2 && line.bbox.width >= 12 && line.bbox.height >= 8 && line.confidence >= 18)
    .sort((a, b) => a.bbox.y - b.bbox.y || a.bbox.x - b.bbox.x);
}

export function linesToBlocks(lines: OcrLine[], slideWidth: number, slideHeight: number, maskColorFor: (box: SlideBox) => string): SlideTextBlock[] {
  return normalizeOcrLines(lines, slideWidth, slideHeight).map((line, index) => ({
    id: `text-${index + 1}`,
    ...line.bbox,
    text: line.text,
    confidence: Math.round(line.confidence),
    maskColor: maskColorFor(line.bbox),
    fontSize: clamp(line.bbox.height * 0.88, 12, 84),
    color: '#17211c',
    bold: line.bbox.height > slideHeight * 0.045,
    italic: false,
    align: 'left' as TextAlign,
  }));
}

export function serializeProject(project: SlideEditorProject): string {
  return JSON.stringify(project);
}

export function parseProject(value: string): SlideEditorProject | null {
  try {
    const parsed = JSON.parse(value) as Partial<SlideEditorProject>;
    if (!parsed || typeof parsed !== 'object' || typeof parsed.id !== 'string' || !Array.isArray(parsed.slides)) return null;
    if (!parsed.slides.length || parsed.slides.some((slide) => !slide || typeof slide.imageUrl !== 'string' || !Array.isArray(slide.blocks))) return null;
    return parsed as SlideEditorProject;
  } catch {
    return null;
  }
}
