import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('regression fixture is an eight-slide 16:9 PDF with the required content matrix', async () => {
  const [bytes, generator] = await Promise.all([
    readFile('tests/fixtures/slide-editor-regression.pdf'),
    readFile('tests/fixtures/create-slide-editor-regression.mjs', 'utf8'),
  ]);
  const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
  const pdf = await pdfjs.getDocument({ data: new Uint8Array(bytes) }).promise;
  assert.equal(pdf.numPages, 8);
  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const viewport = page.getViewport({ scale: 1 });
    assert.ok(Math.abs(viewport.width / viewport.height - 16 / 9) < 0.01);
    page.cleanup();
  }
  for (const marker of ['Jednoduchý název', 'Více textových bloků', 'Česká diakritika', 'English slide', '75 %', 'Světlý text na tmavém pozadí', 'gradient', 'Komplexní ilustrace']) {
    assert.ok(generator.includes(marker), `missing regression marker: ${marker}`);
  }
});

test('slide editor hardening keeps user-facing progress and privacy contracts explicit', async () => {
  const [view, pdf, styles, storage, fixture] = await Promise.all([
    readFile('src/slide-editor/view.ts', 'utf8'),
    readFile('src/slide-editor/pdf.ts', 'utf8'),
    readFile('src/styles.css', 'utf8'),
    readFile('src/slide-editor/storage.ts', 'utf8'),
    readFile('tests/fixtures/create-slide-editor-regression.mjs', 'utf8'),
  ]);
  assert.match(view, /processToken/);
  assert.match(view, /aria-label="Postup zpracování prezentace"/);
  assert.match(view, /userFacingProcessError/);
  assert.doesNotMatch(pdf, /userJobId/);
  assert.match(pdf, /median/);
  assert.match(styles, /slide-editor-dropzone:focus-within/);
  assert.match(view, /await import\('\.\/pdf'\)/);
  assert.match(view, /await import\('\.\/export'\)/);
  assert.match(view, /recoveryProject/);
  assert.match(view, /Aktuální projekt zůstává dostupný/);
  assert.match(storage, /saveProject\(project: SlideEditorProject\): Promise<boolean>/);
  assert.match(fixture, /requestedPages/);
});
