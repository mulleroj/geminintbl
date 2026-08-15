import test from 'node:test';
import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { promisify } from 'node:util';

const run = promisify(execFile);

test('parity matrix documents every requested primary area', async () => {
  const text = await readFile('docs/reference-parity.md', 'utf8');
  for (const route of ['/prompts', '/sources', '/tools', '/notebooks', '/guides', '/favorites', '/submit', '/watermark-remover']) {
    assert.ok(text.includes(`| \`${route}\` |`), `missing route ${route}`);
  }
  assert.doesNotMatch(text, /\| TODO \|/);
});

test('static app contains all major Czech routes and shared provenance fields', async () => {
  const main = await readFile('src/main.ts', 'utf8');
  const schemas = await readFile('src/schemas/common.ts', 'utf8');
  const promptSchema = await readFile('src/schemas/prompt.ts', 'utf8');
  for (const route of ['/prompty', '/zdroje', '/nastroje', '/notebooky', '/pruvodci', '/oblibene', '/pridat']) assert.match(main, new RegExp(route.replace('/', '\\/')));
  for (const field of ['sourceUrl', 'sourceLabel', 'retrievedAt', 'license', 'needsReview']) assert.match(schemas, new RegExp(field));
  assert.match(schemas, /professional/);
  assert.match(promptSchema, /complexity/);
  assert.match(main, /navigator\.clipboard/);
  assert.match(main, /navigator\.share/);
});

test('content audit reports the current catalog inventory deterministically', async () => {
  const { stdout } = await run('node', ['scripts/content-audit.mjs'], { encoding: 'utf8' });
  const promptCount = Number(stdout.match(/^Prompts: (\d+)$/m)?.[1]);
  assert.ok(promptCount >= 80, `expected at least 80 prompts, got ${promptCount}`);
  for (const line of [
    'Sources: 10',
    'Tools: 8',
    'Notebooks: 6',
    'Guides: 5',
    'Prompt categories: 9',
    'Source categories: 8',
    'Guide categories: 6',
    'Prompts by category: audio-overviews=6, deep-analysis=10, setup-accuracy=8, slides-video-infographics=7, strategy-decisions=8, study-exam-prep=10, teaching=25, workflows=9, writing-content=8',
    'Featured prompts: 6',
    'Original Notebook Hub CZ: 91',
    'Prompt quality: PASS',
    'Prompt quality missing description: 0',
    'Prompt quality missing prompt: 0',
    'Prompt quality missing author: 0',
    'Prompt quality missing provenance: 0',
    'Prompt quality duplicate titles: none',
    'Prompt quality duplicate normalized titles: none',
    'needsReview: 1',
    'Missing sourceUrl: 109',
    'Duplicate IDs: none',
    'Duplicate slugs: none',
    'Invalid URLs: none',
  ]) assert.match(stdout, new RegExp(`^${line.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'm'));
});

test('prompt quality audit enforces the scale and metadata contract', async () => {
  const { stdout } = await run('node', ['scripts/prompt-quality-audit.mjs'], { encoding: 'utf8' });
  assert.match(stdout, /^Prompt quality: PASS$/m);
  assert.match(stdout, /^Prompts: (9[0-9]|1[0-9]{2,})$/m);
  assert.match(stdout, /^Missing author: 0$/m);
  assert.match(stdout, /^Missing provenance: 0$/m);
  assert.match(stdout, /^Duplicate normalized titles: none$/m);
});

test('SEO infrastructure is present', async () => {
  const [index, robots, sitemap] = await Promise.all([readFile('index.html', 'utf8'), readFile('public/robots.txt', 'utf8'), readFile('public/sitemap.xml', 'utf8')]);
  assert.match(index, /meta name="description"/);
  assert.match(index, /link rel="canonical"/);
  assert.match(robots, /Sitemap:/);
  assert.match(sitemap, /<urlset/);
});

test('prompt browsing exposes expansion, view persistence and compatible filters', async () => {
  const [main, storage, styles] = await Promise.all([
    readFile('src/main.ts', 'utf8'),
    readFile('src/storage.ts', 'utf8'),
    readFile('src/styles.css', 'utf8'),
  ]);
  for (const pattern of [
    /expand-prompt:/,
    /aria-expanded=/,
    /aria-controls=/,
    /prompt-preview-/,
    /view-mode:cards/,
    /view-mode:compact/,
    /promptCard\(prompt, false, true, viewMode\)/,
    /history\.replaceState/,
    /categoryChips\(activeCategory\)/,
    /matchesSearch\(/,
  ]) assert.match(main, pattern);
  assert.match(storage, /notebook-hub-cz-prompt-view/);
  assert.match(storage, /readPromptViewMode/);
  assert.match(storage, /savePromptViewMode/);
  assert.match(styles, /prompt-results\.is-compact/);
});
