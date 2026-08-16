import { deflateSync } from 'node:zlib';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..', '..');
const outputPath = join(here, 'slide-editor-regression.pdf');
const fontPath = join(root, 'node_modules', 'pdfjs-dist', 'standard_fonts', 'LiberationSans-Regular.ttf');

function u16(buffer, offset) { return buffer.readUInt16BE(offset); }
function i16(buffer, offset) { return buffer.readInt16BE(offset); }
function u32(buffer, offset) { return buffer.readUInt32BE(offset); }

function readFont(buffer) {
  const tables = new Map();
  const count = u16(buffer, 4);
  for (let index = 0; index < count; index += 1) {
    const offset = 12 + index * 16;
    tables.set(buffer.toString('ascii', offset, offset + 4), { offset: u32(buffer, offset + 8), length: u32(buffer, offset + 12) });
  }
  const head = tables.get('head');
  const hhea = tables.get('hhea');
  const maxp = tables.get('maxp');
  const hmtx = tables.get('hmtx');
  const cmap = tables.get('cmap');
  if (!head || !hhea || !maxp || !hmtx || !cmap) throw new Error('Font lacks required TrueType tables.');
  const unitsPerEm = u16(buffer, head.offset + 18);
  const numberOfMetrics = u16(buffer, hhea.offset + 34);
  const glyphCount = u16(buffer, maxp.offset + 4);
  const widths = [];
  for (let glyph = 0; glyph < glyphCount; glyph += 1) {
    const metric = Math.min(glyph, numberOfMetrics - 1);
    widths.push(Math.round((u16(buffer, hmtx.offset + metric * 4) / unitsPerEm) * 1000));
  }

  const cmapCount = u16(buffer, cmap.offset + 2);
  const subtables = [];
  for (let index = 0; index < cmapCount; index += 1) {
    const record = cmap.offset + 4 + index * 8;
    subtables.push({ platform: u16(buffer, record), encoding: u16(buffer, record + 2), offset: cmap.offset + u32(buffer, record + 4) });
  }
  const format12 = subtables.find((item) => u16(buffer, item.offset) === 12);
  const format4 = subtables.find((item) => u16(buffer, item.offset) === 4);
  if (!format12 && !format4) throw new Error('Font lacks a supported cmap table.');

  function glyphFor(codePoint) {
    if (format12) {
      const groups = u32(buffer, format12.offset + 12);
      for (let index = 0; index < groups; index += 1) {
        const group = format12.offset + 16 + index * 12;
        const start = u32(buffer, group);
        const end = u32(buffer, group + 4);
        if (codePoint >= start && codePoint <= end) return u32(buffer, group + 8) + codePoint - start;
      }
    }
    if (format4 && codePoint <= 0xffff) {
      const segmentCount = u16(buffer, format4.offset + 6) / 2;
      const endCodes = format4.offset + 14;
      const startCodes = endCodes + segmentCount * 2 + 2;
      const deltas = startCodes + segmentCount * 2;
      const ranges = deltas + segmentCount * 2;
      for (let index = 0; index < segmentCount; index += 1) {
        const end = u16(buffer, endCodes + index * 2);
        const start = u16(buffer, startCodes + index * 2);
        if (codePoint < start || codePoint > end) continue;
        const delta = i16(buffer, deltas + index * 2);
        const range = u16(buffer, ranges + index * 2);
        if (range === 0) return (codePoint + delta) & 0xffff;
        const glyphOffset = ranges + index * 2 + range + (codePoint - start) * 2;
        return (u16(buffer, glyphOffset) + delta) & 0xffff;
      }
    }
    return 0;
  }
  return { widths, glyphFor };
}

class PdfBuilder {
  objects = [];

  add(value) {
    this.objects.push(Buffer.isBuffer(value) ? value : Buffer.from(value, 'ascii'));
    return this.objects.length;
  }

  stream(data, dictionary = '') {
    const buffer = Buffer.isBuffer(data) ? data : Buffer.from(data, 'ascii');
    return this.add(Buffer.concat([
      Buffer.from(`<< ${dictionary} /Length ${buffer.length} >>\nstream\n`, 'ascii'),
      buffer,
      Buffer.from('\nendstream', 'ascii'),
    ]));
  }

  build(root) {
    const chunks = [Buffer.from('%PDF-1.7\n%\xFF\xFF\xFF\xFF\n', 'binary')];
    const offsets = [0];
    for (let index = 0; index < this.objects.length; index += 1) {
      offsets.push(chunks.reduce((total, chunk) => total + chunk.length, 0));
      chunks.push(Buffer.from(`${index + 1} 0 obj\n`, 'ascii'), this.objects[index], Buffer.from('\nendobj\n', 'ascii'));
    }
    const xrefOffset = chunks.reduce((total, chunk) => total + chunk.length, 0);
    const xref = [`xref\n0 ${this.objects.length + 1}\n0000000000 65535 f \n`];
    for (let index = 1; index < offsets.length; index += 1) xref.push(`${String(offsets[index]).padStart(10, '0')} 00000 n \n`);
    xref.push(`trailer\n<< /Size ${this.objects.length + 1} /Root ${root} 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`);
    chunks.push(Buffer.from(xref.join(''), 'ascii'));
    return Buffer.concat(chunks);
  }
}

function streamObject(data, dictionary = '') {
  const buffer = Buffer.isBuffer(data) ? data : Buffer.from(data, 'ascii');
  return Buffer.concat([
    Buffer.from(`<< ${dictionary} /Length ${buffer.length} >>\nstream\n`, 'ascii'),
    buffer,
    Buffer.from('\nendstream', 'ascii'),
  ]);
}

function makeToUnicode(glyphMap) {
  const entries = [...glyphMap.entries()];
  const lines = [
    '/CIDInit /ProcSet findresource begin',
    '12 dict begin',
    'begincmap',
    '/CIDSystemInfo << /Registry (Adobe) /Ordering (UCS) /Supplement 0 >> def',
    '/CMapName /Adobe-Identity-UCS def',
    '/CMapType 2 def',
    '1 begincodespacerange',
    '<0000> <FFFF>',
    'endcodespacerange',
  ];
  for (let index = 0; index < entries.length; index += 100) {
    const chunk = entries.slice(index, index + 100);
    lines.push(`${chunk.length} beginbfchar`);
    for (const [gid, codePoint] of chunk) lines.push(`<${gid.toString(16).padStart(4, '0')}> <${codePoint.toString(16).padStart(4, '0')}>`);
    lines.push('endbfchar');
  }
  lines.push('endcmap', 'CMapName currentdict /CMap defineresource pop', 'end', 'end');
  return lines.join('\n');
}

function encodeText(value, font, glyphMap) {
  const gids = [];
  for (const character of value) {
    const codePoint = character.codePointAt(0);
    const glyph = font.glyphFor(codePoint);
    if (!glyph) throw new Error(`Font cannot encode ${character}.`);
    glyphMap.set(glyph, codePoint);
    gids.push(glyph.toString(16).padStart(4, '0'));
  }
  return gids.join('').toUpperCase();
}

function rgb(red, green, blue) { return `${(red / 255).toFixed(3)} ${(green / 255).toFixed(3)} ${(blue / 255).toFixed(3)}`; }

function rasterBackground(kind) {
  const width = 320;
  const height = 180;
  const pixels = Buffer.alloc(width * height * 3);
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const index = (y * width + x) * 3;
      const wave = Math.round(18 * Math.sin(x / 13) + 12 * Math.cos(y / 9));
      pixels[index] = Math.max(0, Math.min(255, 50 + Math.round((x / width) * 130) + wave));
      pixels[index + 1] = Math.max(0, Math.min(255, 80 + Math.round((y / height) * 100) + wave));
      pixels[index + 2] = Math.max(0, Math.min(255, 135 + Math.round(((x + y) / (width + height)) * 90) + wave));
    }
  }
  if (kind === 'warm') {
    for (let index = 0; index < pixels.length; index += 3) {
      const red = pixels[index];
      pixels[index] = Math.min(255, red + 55);
      pixels[index + 1] = Math.min(255, pixels[index + 1] + 18);
    }
  }
  return { width, height, data: deflateSync(pixels) };
}

const fontBytes = await readFile(fontPath);
const font = readFont(fontBytes);
const pdf = new PdfBuilder();
const pagesRef = pdf.add('');
const fontFileRef = pdf.stream(fontBytes, `/Length1 ${fontBytes.length}`);
const fontDescriptorRef = pdf.add(`<< /Type /FontDescriptor /FontName /LiberationSans /Flags 32 /FontBBox [0 -200 1200 1000] /ItalicAngle 0 /Ascent 905 /Descent -212 /CapHeight 700 /StemV 80 /FontFile2 ${fontFileRef} 0 R >>`);
const cidFontRef = pdf.add(`<< /Type /Font /Subtype /CIDFontType2 /BaseFont /LiberationSans /CIDSystemInfo << /Registry (Adobe) /Ordering (Identity) /Supplement 0 >> /FontDescriptor ${fontDescriptorRef} 0 R /CIDToGIDMap /Identity /DW 600 >>`);
const toUnicodeRef = pdf.add('');
const type0FontRef = pdf.add(`<< /Type /Font /Subtype /Type0 /BaseFont /LiberationSans /Encoding /Identity-H /DescendantFonts [${cidFontRef} 0 R] /ToUnicode ${toUnicodeRef} 0 R >>`);
const glyphMap = new Map([[0, 0]]);
const pages = [
  { title: 'Jednoduchý název', lines: ['Tento krátký odstavec ověří základní tok.', 'Jedna jasná myšlenka na jednom slidu.'], background: 'light', color: [23, 33, 28] },
  { title: 'Více textových bloků', lines: ['První blok obsahuje hlavní myšlenku.', 'Druhý blok doplňuje příklad.', 'Třetí blok uzavírá shrnutí.'], background: 'light', color: [23, 33, 28] },
  { title: 'Česká diakritika', lines: ['Příliš žluťoučký kůň úpěl ďábelské ódy.', 'Žáci čtou věty, řádky a měkká písmena.'], background: 'light', color: [23, 33, 28] },
  { title: 'English slide', lines: ['Editable text should remain readable.', 'Check the layout before sharing the deck.'], background: 'light', color: [23, 33, 28] },
  { title: 'Čísla a štítky', lines: ['75 % · 16. 8. 2026 · Třída 4.A', 'Skóre: 98,5 · verze 2.04 · #42'], background: 'light', color: [23, 33, 28] },
  { title: 'Světlý text na tmavém pozadí', lines: ['Kontrastní blok 42', 'Zkontrolujte čitelnost v PowerPointu.'], background: 'dark', color: [255, 255, 255] },
  { title: 'Text přes barevný gradient', lines: ['Přechodové pozadí z modré do oranžové.', 'Maska textu je záměrně lokální.'], background: 'gradient', color: [23, 33, 28] },
  { title: 'Komplexní ilustrace', lines: ['Tři vrstvy a 12 prvků', 'Barevná struktura napodobuje obrazové pozadí.'], background: 'raster', color: [255, 255, 255] },
];
const pageRefs = [];

function drawBackground(page) {
  if (page.background === 'dark') return `${rgb(24, 35, 31)} rg 0 0 960 540 re f`;
  if (page.background === 'gradient') {
    return Array.from({ length: 27 }, (_, index) => {
      const ratio = index / 26;
      return `${rgb(Math.round(44 + ratio * 190), Math.round(112 - ratio * 45), Math.round(190 - ratio * 100))} rg 0 ${index * 20} 960 21 re f`;
    }).join('\n');
  }
  if (page.background === 'raster') return '';
  return `${rgb(242, 245, 241)} rg 0 0 960 540 re f`;
}

function drawIllustration() {
  return [
    `${rgb(26, 45, 90)} rg 0 0 960 540 re f`,
    `${rgb(235, 139, 54)} rg 590 85 260 260 re f`,
    `${rgb(85, 201, 170)} rg 645 155 220 150 re f`,
    `${rgb(245, 214, 93)} rg 710 250 160 170 re f`,
    `${rgb(205, 88, 107)} rg 535 300 180 160 re f`,
    `${rgb(255, 255, 255)} rg 570 115 40 330 re f`,
    `${rgb(255, 255, 255)} rg 525 255 350 38 re f`,
    `${rgb(37, 27, 62)} rg 600 185 110 80 re f`,
  ].join('\n');
}

for (const page of pages) {
  const imageRef = page.background === 'raster' ? pdf.stream(rasterBackground('warm').data, `/Type /XObject /Subtype /Image /Width 320 /Height 180 /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /FlateDecode`) : null;
  const textLines = [page.title, ...page.lines];
  const encoded = textLines.map((line) => encodeText(line, font, glyphMap));
  let content = 'q\n';
  if (page.background === 'raster') content += 'q 960 0 0 540 0 0 cm /Im1 Do Q\n';
  content += `${drawBackground(page)}\n`;
  if (page.background === 'raster') content += drawIllustration();
  content += 'Q\n';
  content += `${rgb(...page.color)} rg\nBT /F1 32 Tf 1 0 0 1 64 454 Tm <${encoded[0]}> Tj ET\n`;
  encoded.slice(1).forEach((line, index) => { content += `BT /F1 19 Tf 1 0 0 1 72 ${390 - index * 48} Tm <${line}> Tj ET\n`; });
  const contentRef = pdf.stream(content);
  const resources = imageRef ? `/XObject << /Im1 ${imageRef} 0 R >>` : '';
  const pageRef = pdf.add(`<< /Type /Page /Parent ${pagesRef} 0 R /MediaBox [0 0 960 540] /Resources << /Font << /F1 ${type0FontRef} 0 R >> ${resources} >> /Contents ${contentRef} 0 R >>`);
  pageRefs.push(pageRef);
}

pdf.objects[toUnicodeRef - 1] = streamObject(makeToUnicode(glyphMap));
const kids = pageRefs.map((pageRef) => `${pageRef} 0 R`).join(' ');
pdf.objects[pagesRef - 1] = Buffer.from(`<< /Type /Pages /Kids [${kids}] /Count ${pageRefs.length} >>`, 'ascii');
const catalogRef = pdf.add(`<< /Type /Catalog /Pages ${pagesRef} 0 R >>`);
const output = pdf.build(catalogRef);
await writeFile(outputPath, output);
console.log(`Wrote ${outputPath} (${(output.length / 1024).toFixed(1)} KiB, ${pageRefs.length} pages).`);
