import { mkdir, readFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import PptxGenJS from 'pptxgenjs';

const root = resolve(import.meta.dirname, '..');
const imageDir = process.argv[2] ? resolve(process.argv[2]) : 'C:\\tmp';
const outputPath = process.argv[3] ? resolve(process.argv[3]) : join(root, 'artifacts', 'qa', 'notebook-slide-editor-regression.pptx');
const pages = [
  { image: 'slideqa-1.png', blocks: [{ text: 'Jednoduchý název', x: 64, y: 54, w: 340, h: 42, fontSize: 32, bold: true }, { text: 'Tento krátký odstavec ověří základní tok.', x: 72, y: 112, w: 520, h: 28, fontSize: 19 }] },
  { image: 'slideqa-2.png', blocks: [{ text: 'Více textových bloků', x: 64, y: 54, w: 420, h: 42, fontSize: 32, bold: true }, { text: 'První blok obsahuje hlavní myšlenku.', x: 72, y: 112, w: 520, h: 28, fontSize: 19 }, { text: 'Druhý blok doplňuje příklad.', x: 72, y: 160, w: 520, h: 28, fontSize: 19 }] },
  { image: 'slideqa-3.png', blocks: [{ text: 'Česká diakritika', x: 64, y: 54, w: 360, h: 42, fontSize: 32, bold: true }, { text: 'Příliš žluťoučký kůň úpěl ďábelské ódy.', x: 72, y: 112, w: 650, h: 28, fontSize: 19 }] },
  { image: 'slideqa-4.png', blocks: [{ text: 'English slide', x: 64, y: 54, w: 300, h: 42, fontSize: 32, bold: true }, { text: 'Editable text should remain readable.', x: 72, y: 112, w: 560, h: 28, fontSize: 19, italic: true }] },
  { image: 'slideqa-5.png', blocks: [{ text: 'Čísla a štítky', x: 64, y: 54, w: 340, h: 42, fontSize: 32, bold: true }, { text: '75 % · 16. 8. 2026 · Třída 4.A', x: 72, y: 112, w: 600, h: 28, fontSize: 19 }, { text: 'Skóre: 98,5 · verze 2.04 · #42', x: 72, y: 160, w: 600, h: 28, fontSize: 19, align: 'center' }] },
  { image: 'slideqa-6.png', blocks: [{ text: 'Světlý text na tmavém pozadí', x: 64, y: 54, w: 620, h: 42, fontSize: 32, bold: true, color: '#ffffff', maskColor: '#18231f' }, { text: 'Kontrastní blok 42', x: 72, y: 112, w: 420, h: 28, fontSize: 19, color: '#ffffff', maskColor: '#18231f' }] },
  { image: 'slideqa-7.png', blocks: [{ text: 'Text přes barevný gradient', x: 64, y: 54, w: 560, h: 42, fontSize: 32, bold: true }, { text: 'Přechodové pozadí z modré do oranžové.', x: 72, y: 112, w: 650, h: 28, fontSize: 19 }] },
  { image: 'slideqa-8.png', blocks: [{ text: 'Komplexní ilustrace', x: 64, y: 54, w: 420, h: 42, fontSize: 32, bold: true, color: '#ffffff', maskColor: '#251b3e' }, { text: 'Tři vrstvy a 12 prvků', x: 72, y: 112, w: 420, h: 28, fontSize: 19, color: '#ffffff', maskColor: '#251b3e' }] },
];

function hexColor(value) { return (value ?? '#17211c').replace('#', '').slice(0, 6).padEnd(6, 'F').toUpperCase(); }
function toInches(value, sourceSize, targetSize) { return (value / sourceSize) * targetSize; }

await mkdir(dirname(outputPath), { recursive: true });
const pptx = new PptxGenJS();
pptx.defineLayout({ name: 'NOTEBOOK_CUSTOM', width: 10, height: 5.625 });
pptx.layout = 'NOTEBOOK_CUSTOM';
pptx.author = 'Notebook Hub CZ';
pptx.company = 'Notebook Hub CZ';
pptx.subject = 'Upravitelná prezentace z osmislidového regression decku';
pptx.title = 'notebook-slide-editor-regression';
for (const page of pages) {
  const slide = pptx.addSlide();
  const imageBytes = await readFile(join(imageDir, page.image));
  slide.background = { data: `data:image/png;base64,${imageBytes.toString('base64')}` };
  for (const block of page.blocks) {
    const x = toInches(block.x, 960, 10);
    const y = toInches(540 - block.y - block.h, 540, 5.625);
    const w = toInches(block.w, 960, 10);
    const h = toInches(block.h, 540, 5.625);
    slide.addShape(pptx.ShapeType.rect, { x, y, w, h, fill: { color: hexColor(block.maskColor) }, line: { color: hexColor(block.maskColor), transparency: 100 } });
    slide.addText(block.text, { x, y, w, h, margin: 0.03, fontFace: 'Arial', fontSize: Math.min(48, Math.max(7, (block.fontSize / 540) * 5.625 * 72 * 0.78)), color: hexColor(block.color), bold: Boolean(block.bold), italic: Boolean(block.italic), align: block.align ?? 'left', valign: 'middle', breakLine: false, fit: 'shrink' });
  }
}
await pptx.writeFile({ fileName: outputPath, compression: true });
console.log(`Wrote ${outputPath} (${pages.length} slides).`);
