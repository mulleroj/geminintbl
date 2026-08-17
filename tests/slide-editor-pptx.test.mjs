import test from 'node:test';
import assert from 'node:assert/strict';
import JSZip from 'jszip';
import PptxGenJS from 'pptxgenjs';
import { readFile } from 'node:fs/promises';

const onePixel = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIHWP4z8DwHwAFgAI/ScxW7QAAAABJRU5ErkJggg==';

test('PptxGenJS export contract keeps the raster as a locked full-slide picture', async () => {
  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_WIDE';
  for (const [index, text] of ['Český titulek 1', 'Editable English title 2'].entries()) {
    const slide = pptx.addSlide();
    slide.addImage({ data: onePixel, x: 0, y: 0, w: 13.333, h: 7.5 });
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
    assert.doesNotMatch(xml, /<p:bg>/);
    assert.match(tree, /<p:pic>/);
    assert.match(tree, /<p:sp>[\s\S]*<p:sp>[\s\S]*<p:txBody>/);
    assert.match(tree, /<a:picLocks noChangeAspect="1"\/>/);
    assert.match(xml, /<a:t>(Český titulek 1|Editable English title 2)<\/a:t>/);
  }
  assert.match(await zip.file('ppt/slides/_rels/slide1.xml.rels').async('string'), /Target="\.\.\/media\//);
});

test('slide editor export uses a locked full-slide picture for PowerPoint compatibility', async () => {
  const source = await readFile('src/slide-editor/export.ts', 'utf8');
  assert.match(source, /slide\.addImage\(\{ data: source\.imageUrl, x: 0, y: 0, w: widthIn, h: heightIn \}\)/);
  assert.match(source, /lockFullSlidePictures/);
  assert.match(source, /noSelect="1" noMove="1" noResize="1"/);
  assert.doesNotMatch(source, /slide\.background = \{ data: source\.imageUrl \}/);
});

test('slide editor keeps the original page visible until a text block is edited', async () => {
  const [view, styles] = await Promise.all([
    readFile('src/slide-editor/view.ts', 'utf8'),
    readFile('src/styles.css', 'utf8'),
  ]);
  assert.match(view, /isBlockEdited\(block\)/);
  assert.match(styles, /\.slide-editor-text-block:not\(\.is-edited\) \{ background: transparent/);
  assert.match(styles, /\.slide-editor-text-block:not\(\.is-edited\)\.is-selected/);
});

test('slide editor supports replacing a selected image area with a contained PPTX image', async () => {
  const [view, exporter, types, model] = await Promise.all([
    readFile('src/slide-editor/view.ts', 'utf8'),
    readFile('src/slide-editor/export.ts', 'utf8'),
    readFile('src/slide-editor/types.ts', 'utf8'),
    readFile('src/slide-editor/model.ts', 'utf8'),
  ]);
  assert.match(view, /data-image-mode/);
  assert.match(view, /data-image-upload/);
  assert.match(view, /data-resize-image/);
  assert.match(view, /slide\.imageBlocks\.push/);
  assert.match(exporter, /function addEditableImage/);
  assert.match(exporter, /source\.imageBlocks\.filter\(\(image\) => image\.imageUrl\)/);
  assert.match(exporter, /sizing: \{ type: 'contain'/);
  assert.match(exporter, /image\.maskColor/);
  assert.match(types, /interface SlideImageBlock/);
  assert.match(model, /validateImageFile/);
});
