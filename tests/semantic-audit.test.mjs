import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';

const count = (text, token) => text.split(token).length - 1;

test('semantic heading and social metadata contracts are present', async () => {
  const [main, index] = await Promise.all([
    readFile('src/main.ts', 'utf8'),
    readFile('index.html', 'utf8'),
  ]);

  assert.match(main, /function semanticMarkup\(content: string, active: string\)/);
  for (const title of ['Výsledky promptů', 'Výsledky zdrojů', 'Výsledky nástrojů', 'Výsledky veřejných notebooků', 'Výsledky průvodců']) {
    assert.match(main, new RegExp(title));
  }
  assert.match(main, /footer-heading/);
  assert.match(main, /teacher-prompt-reference[\s\S]*?<h5>/);
  assert.match(main, /summary_large_image/);
  assert.match(main, /meta\[property="og:image:width"\]/);
  assert.match(main, /semanticToolLibraryMarkup/);

  for (const tag of [
    'og:image', 'og:image:width', 'og:image:height', 'og:image:alt',
    'twitter:title', 'twitter:description', 'twitter:image', 'twitter:image:alt',
  ]) assert.match(index, new RegExp(tag.replace(':', '\\:')));
  assert.match(index, /https:\/\/geminintbl\.netlify\.app\/og\/notebook-hub-cz\.png/);
  assert.match(index, /summary_large_image/);
  assert.match(index, /https:\/\/geminintbl\.netlify\.app\//);
});

test('primary templates keep one H1 and generators expose one H1 each', async () => {
  const main = await readFile('src/main.ts', 'utf8');
  const pageIntro = main.slice(main.indexOf('function pageIntro'), main.indexOf('function stat'));
  const legacyHome = main.slice(main.indexOf('function legacyHome'), main.indexOf('function teacherHomeSection'));
  const promptDetail = main.slice(main.indexOf('function promptDetail'), main.indexOf('function sourceLibrary'));
  const guideDetail = main.slice(main.indexOf('function guideDetail'), main.indexOf('function favorites'));
  assert.equal(count(pageIntro, '<h1>'), 1);
  assert.equal(count(legacyHome, '<h1>'), 1);
  assert.equal(count(promptDetail, '<h1>'), 1);
  assert.equal(count(guideDetail, '<h1>'), 1);

  for (const file of [
    'src/generators/presentation/view.ts',
    'src/generators/infographic/view.ts',
    'src/generators/audio-video/view.ts',
  ]) {
    const view = await readFile(file, 'utf8');
    assert.equal(count(view, '<h1>'), 1, `${file} should contain one H1 template`);
  }
});

test('social card is a valid 1200x630 PNG', async () => {
  const file = 'public/og/notebook-hub-cz.png';
  const [bytes, info] = await Promise.all([readFile(file), stat(file)]);
  assert.deepEqual([...bytes.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);
  assert.equal(bytes.readUInt32BE(16), 1200);
  assert.equal(bytes.readUInt32BE(20), 630);
  assert.ok(info.size > 100_000 && info.size < 2_000_000, `unexpected PNG size: ${info.size}`);
});
