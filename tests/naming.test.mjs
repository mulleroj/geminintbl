import test from 'node:test';
import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { promisify } from 'node:util';

const run = promisify(execFile);

test('naming audit classifies allowed legacy references', async () => {
  const { stdout } = await run('node', ['scripts/naming-audit.mjs'], { encoding: 'utf8' });
  assert.match(stdout, /Unclassified legacy references: 0/);
  assert.doesNotMatch(stdout, /Gemini NotebookLM|Gemini Notebook LM/);
});

test('current product naming and locked catalogs remain intact', async () => {
  const [main, index, readme] = await Promise.all([
    readFile('src/main.ts', 'utf8'),
    readFile('index.html', 'utf8'),
    readFile('README.md', 'utf8'),
  ]);
  assert.match(main, /Gemini Notebook/);
  assert.match(main, /dříve NotebookLM/);
  assert.match(main, /Notebook Hub CZ — prompty a zdroje pro Gemini Notebook/);
  assert.match(index, /Gemini Notebook/);
  assert.match(readme, /Gemini Notebook/);

  const { stdout } = await run('node', ['scripts/content-audit.mjs'], { encoding: 'utf8' });
  for (const line of ['Prompts: 95', 'Sources: 175', 'Tools: 8', 'Notebooks: 6', 'Guides: 5']) {
    assert.match(stdout, new RegExp(`^${line}$`, 'm'));
  }
});
