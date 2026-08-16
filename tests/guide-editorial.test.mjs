import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import test from 'node:test';
import assert from 'node:assert/strict';

const root = join(import.meta.dirname, '..');

async function source(path) {
  return readFile(join(root, path), 'utf8');
}

test('guide schema and renderer expose a closed progressive disclosure layer', async () => {
  const schema = await source('src/schemas/guide.ts');
  const index = await source('src/data/guides/index.ts');
  const main = await source('src/main.ts');

  assert.match(schema, /subsections\?: GuideSection\[\]/);
  assert.match(schema, /advancedSections\?: GuideSection\[\]/);
  assert.match(schema, /studySetup\?: GuideStudySetup/);
  assert.match(index, /advancedSections: \[\.\.\.advancedDepth, \.\.\.advancedExtra\]/);
  assert.match(index, /Math\.ceil\(guideWordCount\(content\) \/ 200\)/);
  assert.match(main, /class="guide-advanced"/);
  assert.doesNotMatch(main, /<details class="guide-advanced" open/);
  assert.match(main, /guide\.content\.map\(\(section, index\)/);
  assert.match(main, /href="#section-\$\{index\}"/);
});

test('study power layer keeps the Hub recommendation distinct from native product facts', async () => {
  const study = await source('src/data/guides/study-power.ts');
  const collection = await source('src/main.ts');
  const doc = await source('docs/study-power-layer-v1.md');

  for (const label of ['Mind Map', 'Flashcards / Quizzes', 'Audio / Video', 'Infographic / Slide Deck']) assert.match(study, new RegExp(label.replace(/[ /]/g, '[ /]')));
  for (const mode of ['Vysvětli', 'Sokratovský průvodce', 'Teach-back', 'Porovnej', 'Najdi mezeru', 'Zkoušející']) assert.match(study, new RegExp(mode));
  assert.match(collection, /id="studium"/);
  assert.match(collection, /Doporučený cyklus Hubu/);
  assert.match(doc, /Google Help/);
  assert.match(doc, /Cinematic and Short/);
  assert.match(doc, /sources → mind map → chat → flashcards → quiz → audio\/video → final check/);
});
