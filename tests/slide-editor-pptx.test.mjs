import test from 'node:test';
import assert from 'node:assert/strict';
import JSZip from 'jszip';
import PptxGenJS from 'pptxgenjs';

const onePixel = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIHWP4z8DwHwAFgAI/ScxW7QAAAABJRU5ErkJggg==';

test('PptxGenJS export contract keeps slides, ratio, background and editable text objects', async () => {
  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_WIDE';
  for (const [index, text] of ['Český titulek 1', 'Editable English title 2'].entries()) {
    const slide = pptx.addSlide();
    slide.addImage({ data: onePixel, x: 0, y: 0, w: 13.333, h: 7.5 });
    slide.addText(text, { x: 1, y: 1, w: 5, h: 0.6, fontFace: 'Arial', fontSize: 24, bold: index === 0, italic: index === 1, color: '17211C', align: 'center' });
  }
  const output = await pptx.write({ outputType: 'nodebuffer', compression: true });
  const zip = await JSZip.loadAsync(output);
  const slideFiles = Object.keys(zip.files).filter((name) => /^ppt\/slides\/slide\d+\.xml$/.test(name)).sort();
  assert.deepEqual(slideFiles, ['ppt/slides/slide1.xml', 'ppt/slides/slide2.xml']);
  assert.match(await zip.file('ppt/presentation.xml').async('string'), /cx="12192000" cy="6858000"/);
  assert.match(await zip.file('ppt/slides/slide1.xml').async('string'), /Český titulek 1/);
  assert.match(await zip.file('ppt/slides/slide2.xml').async('string'), /Editable English title 2/);
  assert.match(await zip.file('ppt/slides/_rels/slide1.xml.rels').async('string'), /Target="\.\.\/media\//);
});
