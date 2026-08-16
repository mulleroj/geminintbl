import test from 'node:test';
import assert from 'node:assert/strict';
import JSZip from 'jszip';
import PptxGenJS from 'pptxgenjs';
import { readFile } from 'node:fs/promises';

const onePixel = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIHWP4z8DwHwAFgAI/ScxW7QAAAABJRU5ErkJggg==';

test('PptxGenJS export contract keeps the raster as a non-selectable slide background', async () => {
  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_WIDE';
  for (const [index, text] of ['Český titulek 1', 'Editable English title 2'].entries()) {
    const slide = pptx.addSlide();
    slide.background = { data: onePixel };
    slide.addShape(pptx.ShapeType.rect, { x: 1, y: 1, w: 5, h: 0.6, fill: { color: 'FFFFFF' }, line: { color: 'FFFFFF', transparency: 100 } });
    slide.addText(text, { x: 1, y: 1, w: 5, h: 0.6, fontFace: 'Arial', fontSize: 24, bold: index === 0, italic: index === 1, color: '17211C', align: 'center' });
  }
  const output = await pptx.write({ outputType: 'nodebuffer', compression: true });
  const zip = await JSZip.loadAsync(output);
  const slideFiles = Object.keys(zip.files).filter((name) => /^ppt\/slides\/slide\d+\.xml$/.test(name)).sort();
  assert.deepEqual(slideFiles, ['ppt/slides/slide1.xml', 'ppt/slides/slide2.xml']);
  assert.match(await zip.file('ppt/presentation.xml').async('string'), /cx="12192000" cy="6858000"/);
  for (const slideName of slideFiles) {
    const xml = await zip.file(slideName).async('string');
    const tree = xml.slice(xml.indexOf('<p:spTree>'), xml.indexOf('</p:spTree>'));
    assert.match(xml, /<p:bg><p:bgPr><a:blipFill/);
    assert.doesNotMatch(tree, /<p:pic>/);
    assert.match(tree, /<p:sp>[\s\S]*<p:sp>[\s\S]*<p:txBody>/);
    assert.doesNotMatch(tree, /noSelect="1"|noMove="1"|noResize="1"/);
    assert.match(xml, /<a:t>(Český titulek 1|Editable English title 2)<\/a:t>/);
  }
  assert.match(await zip.file('ppt/slides/_rels/slide1.xml.rels').async('string'), /Target="\.\.\/media\//);
});

test('slide editor export uses the background contract instead of a selectable full-slide picture', async () => {
  const source = await readFile('src/slide-editor/export.ts', 'utf8');
  assert.match(source, /slide\.background = \{ data: source\.imageUrl \}/);
  assert.doesNotMatch(source, /slide\.addImage\(/);
});
