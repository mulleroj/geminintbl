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
  assert.equal(blocks[0].maskColor, '#f5f5f0');
  assert.equal(blocks[0].id, 'text-1');
  assert.equal(blocks[0].x, 10);
});

test('slide editor model serializes and rejects malformed projects safely', async () => {
  const model = await loadModel();
  const project = { id: 'p1', fileName: 'deck.pdf', createdAt: '2026-08-16T00:00:00.000Z', slides: [{ id: 'slide-1', pageNumber: 1, width: 100, height: 50, imageUrl: 'data:image/jpeg;base64,test', blocks: [] }] };
  assert.deepEqual(model.parseProject(model.serializeProject(project)), project);
  assert.equal(model.parseProject('{"slides":[]}'), null);
  assert.equal(model.sanitizeFileName('Česká prezentace (verze 2).pdf'), 'Česká-prezentace-verze-2');
});
