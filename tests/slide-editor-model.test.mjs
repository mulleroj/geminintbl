import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

async function loadModel() {
  const source = await readFile('src/slide-editor/model.ts', 'utf8');
  const output = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext } }).outputText;
  return import(`data:text/javascript;base64,${Buffer.from(output).toString('base64')}`);
}

test('slide editor model validates input and maps OCR boxes to PPTX coordinates', async () => {
  const model = await loadModel();
  assert.equal(model.validatePdfFile({ name: 'deck.pdf', type: 'application/pdf', size: 100 }), null);
  assert.match(model.validatePdfFile({ name: 'deck.txt', type: 'text/plain', size: 100 }), /PDF/);
  assert.match(model.validatePdfFile({ name: 'deck.pdf', type: 'application/pdf', size: model.MAX_PDF_BYTES + 1 }), /40 MB/);
  assert.equal(model.validateImageFile({ name: 'icon.png', type: 'image/png', size: 100 }), null);
  assert.match(model.validateImageFile({ name: 'icon.gif', type: 'image/gif', size: 100 }), /PNG/);
  assert.match(model.validateImageFile({ name: 'icon.png', type: 'image/png', size: model.MAX_IMAGE_BYTES + 1 }), /10 MB/);
  assert.equal(model.validatePptxFile({ name: 'deck.pptx', type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation', size: 100 }), null);
  assert.equal(model.validateSourceFile({ name: 'deck.pptx', type: 'application/octet-stream', size: 100 }), null);
  assert.match(model.validatePptxFile({ name: 'deck.pdf', type: 'application/pdf', size: 100 }), /PPTX/);
  assert.match(model.validatePptxFile({ name: 'deck.pptx', type: 'application/octet-stream', size: model.MAX_PPTX_BYTES + 1 }), /80 MB/);
  assert.deepEqual(model.boxToPptx({ x: 100, y: 50, width: 200, height: 100 }, 1000, 500, 10, 5), { x: 1, y: 0.5, width: 2, height: 1 });
});

test('slide editor model turns OCR lines into editable, bounded blocks', async () => {
  const model = await loadModel();
  const blocks = model.linesToBlocks([
    { text: '  Titulek  ', confidence: 96, bbox: { x: 10, y: 20, width: 300, height: 60 } },
    { text: 'x', confidence: 99, bbox: { x: 0, y: 0, width: 2, height: 2 } },
  ], 1000, 500, () => '#f5f5f0');
  assert.equal(blocks.length, 1);
  assert.equal(blocks[0].text, 'Titulek');
  assert.equal(blocks[0].originalText, 'Titulek');
  assert.equal(blocks[0].edited, false);
  assert.equal(blocks[0].maskColor, '#f5f5f0');
  assert.equal(blocks[0].id, 'text-1');
  assert.equal(blocks[0].x, 10);
});

test('slide editor model serializes and rejects malformed projects safely', async () => {
  const model = await loadModel();
  const project = { id: 'p1', fileName: 'deck.pdf', createdAt: '2026-08-16T00:00:00.000Z', sourceType: 'pdf', slides: [{ id: 'slide-1', pageNumber: 1, width: 100, height: 50, imageUrl: 'data:image/jpeg;base64,test', blocks: [], imageBlocks: [] }] };
  assert.deepEqual(model.parseProject(model.serializeProject(project)), project);
  assert.equal(model.parseProject('{"slides":[]}'), null);
  assert.equal(model.sanitizeFileName('Česká prezentace (verze 2).pdf'), 'Česká-prezentace-verze-2');
});

test('slide editor migrates legacy blocks and exports only edited text overlays', async () => {
  const model = await loadModel();
  const legacy = { id: 'p1', fileName: 'deck.pdf', createdAt: '2026-08-16T00:00:00.000Z', slides: [{ id: 'slide-1', pageNumber: 1, width: 100, height: 50, imageUrl: 'data:image/jpeg;base64,test', blocks: [{ id: 'text-1', x: 5, y: 5, width: 30, height: 10, text: 'Původní text', confidence: 95, maskColor: '#fff', fontSize: 10, color: '#000', bold: false, italic: false, align: 'left' }] }] };
  const parsed = model.parseProject(JSON.stringify(legacy));
  assert.equal(parsed.sourceType, 'pdf');
  assert.equal(parsed.slides[0].blocks[0].originalText, 'Původní text');
  assert.equal(parsed.slides[0].blocks[0].edited, false);
  assert.equal(model.isBlockEdited(parsed.slides[0].blocks[0]), false);
  parsed.slides[0].blocks[0].text = 'Upravený text';
  assert.equal(model.isBlockEdited(parsed.slides[0].blocks[0]), true);
});

test('slide editor maps technical processing failures to safe Czech UX messages', async () => {
  const model = await loadModel();
  assert.equal(model.userFacingProcessError(new Error('InvalidPDFException: Invalid PDF structure')), 'PDF je poškozené nebo v nepodporovaném formátu.');
  assert.equal(model.userFacingProcessError(new Error('Failed to fetch language data')), 'OCR se nepodařilo načíst. Zkontrolujte připojení a zkuste to znovu.');
  assert.equal(model.userFacingProcessError(new Error('PDF má příliš mnoho stran. Limit je 50.')), 'PDF má příliš mnoho stran. Limit je 50.');
  assert.equal(model.userFacingProcessError(new Error('internal stack trace')), 'PDF se nepodařilo zpracovat. Zkontrolujte soubor a zkuste to znovu.');
  assert.equal(model.userFacingProcessError(new Error('PowerPoint postrádá ppt/presentation.xml.')), 'PowerPoint se nepodařilo načíst. Zkontrolujte, že jde o platný soubor PPTX.');
  assert.equal(model.userFacingProcessError(new Error('PowerPoint má příliš mnoho slidů. Limit je 50.')), 'PowerPoint má příliš mnoho slidů. Limit je 50.');
});
