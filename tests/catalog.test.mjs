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
  for (const route of ['/prompty', '/zdroje', '/nastroje', '/notebooky', '/pruvodci', '/oblibene', '/pridat', '/pro-ucitele', '/nastroje/editor-prezentaci', '/nastroje/generator-prezentace', '/nastroje/generator-infografiky', '/nastroje/generator-audio-video']) assert.match(main, new RegExp(route.replace('/', '\\/')));
  for (const field of ['sourceUrl', 'sourceLabel', 'retrievedAt', 'license', 'needsReview']) assert.match(schemas, new RegExp(field));
  assert.match(schemas, /professional/);
  assert.match(promptSchema, /complexity/);
  assert.match(main, /navigator\.clipboard/);
  assert.match(main, /navigator\.share/);
});

test('content audit reports the current catalog inventory deterministically', async () => {
  const { stdout } = await run('node', ['scripts/content-audit.mjs'], { encoding: 'utf8' });
  const promptCount = Number(stdout.match(/^Prompts: (\d+)$/m)?.[1]);
  assert.ok(promptCount >= 90 && promptCount <= 100, `expected 90-100 prompts, got ${promptCount}`);
  for (const line of [
    'Sources: 175',
    'Tools: 30',
    'Notebooks: 15',
    'Guides: 32',
    'Prompt categories: 9',
    'Source categories: 10',
    'Guide categories: 5',
    'Tool categories: 8',
    'Notebook categories: 10',
    'Tools by pricing: free=13, freemium=5, paid=0, open source=12',
    'Tools by integration: direct=8, workflow=11, adjacent=11',
    'Tools by source type: official=7, open-source=12, commercial=7, community=4',
    'Tool workflow tips >=80 chars: 30',
    'Featured tools: 12',
    'Notebooks by source type: official=8, education=2, research=0, community=5',
    'Notebooks by access: public=0, google-account=15',
    'Verified notebooks: 15',
    'Featured notebooks: 5',
    'Prompts by category: audio-overviews=6, deep-analysis=10, setup-accuracy=8, slides-video-infographics=7, strategy-decisions=8, study-exam-prep=10, teaching=29, workflows=9, writing-content=8',
    'Prompts by target: audio=5, chat=79, chat-settings=4, infographic=2, slides=4, video=1',
    'Prompts by audience: general=23, professional=26, researcher=29, student=28, teacher=45',
    'Prompts by complexity: advanced=42, quick=6, standard=47',
    'Featured prompts: 6',
    'Differentiation-tagged prompts: 6',
    'Tag vocabulary: 144',
    'Rare prompt tags: 90',
    'Original Notebook Hub CZ: 95',
    'Prompt quality: PASS',
    'Prompt quality missing description: 0',
    'Prompt quality missing prompt: 0',
    'Prompt quality missing tags: 0',
    'Prompt quality missing author: 0',
    'Prompt quality missing provenance: 0',
    'Prompt quality placeholders/TODO: 0',
    'Prompt quality duplicate titles: none',
    'Prompt quality duplicate normalized titles: none',
    'needsReview: 0',
    'Provenance original internal: 127',
    'Provenance external with sourceUrl: 11',
    'Provenance external missing sourceUrl: 4',
    'Provenance sourceUrl not applicable: 127',
    'Duplicate IDs: none',
    'Duplicate slugs: none',
    'Invalid URLs: none',
  ]) assert.match(stdout, new RegExp(`^${line.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'm'));
});

test('tools and public notebooks expose the V1 metadata contract', async () => {
  const [main, tools, notebooks] = await Promise.all([
    readFile('src/main.ts', 'utf8'),
    readFile('src/data/tools/index.ts', 'utf8'),
    readFile('src/data/notebooks/index.ts', 'utf8'),
  ]);
  const toolLibrary = main.slice(main.indexOf('function toolLibrary'), main.indexOf('function notebookLibrary'));
  assert.match(toolLibrary, /Nástroje Notebook Hub CZ/);
  assert.match(main, /editor-prezentaci/);
  assert.match(toolLibrary, /isNotebookHubTool/);
  for (const field of ['category', 'sourceType', 'integrationLevel', 'workflowTip', 'verifiedAt']) assert.match(tools, new RegExp(field));
  assert.match(tools, /t-deckedit/);
  assert.match(tools, /Convert to PPTX/);
  assert.match(tools, /t-slide-editor/);
  assert.match(tools, /editor-prezentaci/);
  for (const field of ['category', 'language', 'region', 'topicTags', 'sourceType', 'access', 'verifiedAt', 'needsReview']) assert.match(notebooks, new RegExp(field));
  assert.doesNotMatch(notebooks, /needsReview:\s*true/);
});

test('guides V1 audit locks scale, provenance and cross-catalog links', async () => {
  const { stdout } = await run('node', ['scripts/guides-audit.mjs'], { encoding: 'utf8' });
  assert.match(stdout, /^Guides: 32$/m);
  assert.match(stdout, /^Guide categories: 5$/m);
  assert.match(stdout, /^Guides by depth: quick=3, standard=10, advanced=19$/m);
  assert.match(stdout, /^Guides by audience: teacher=16, student=21, researcher=9, professional=13, general=15$/m);
  assert.match(stdout, /^Featured guides: 6$/m);
  assert.match(stdout, /^needsReview: 0$/m);
  assert.match(stdout, /^Missing lastVerified: 0$/m);
  assert.match(stdout, /^Official reference coverage: 32\/32$/m);
  assert.match(stdout, /^Related refs per guide: min=9, max=14, average=11\.5$/m);
  assert.match(stdout, /^Dangling references: none$/m);
  assert.match(stdout, /^Below target: none$/m);
  assert.match(stdout, /^Too-short content \(<450 words\): none$/m);
  assert.match(stdout, /^Guides with example: 32$/m);
  assert.match(stdout, /^Guides with checklist: 32$/m);
  assert.match(stdout, /^Guides with TOC: 32$/m);
  assert.match(stdout, /^Generic filler phrases: none$/m);
  assert.match(stdout, /^Duplicate normalized titles: none$/m);
  assert.match(stdout, /^Duplicate job-to-be-done: none$/m);
});

test('prompt quality audit enforces the scale and metadata contract', async () => {
  const { stdout } = await run('node', ['scripts/prompt-quality-audit.mjs'], { encoding: 'utf8' });
  assert.match(stdout, /^Prompt quality: PASS$/m);
  assert.match(stdout, /^Prompts: 9[0-9]$/m);
  assert.match(stdout, /^Differentiation-tagged prompts: 6$/m);
  assert.match(stdout, /^Tag vocabulary: 144$/m);
  assert.match(stdout, /^Rare tags: 90$/m);
  assert.match(stdout, /^Missing tags: 0$/m);
  assert.match(stdout, /^Placeholders\/TODO: 0$/m);
  assert.match(stdout, /^Missing author: 0$/m);
  assert.match(stdout, /^Missing provenance: 0$/m);
  assert.match(stdout, /^Duplicate normalized titles: none$/m);
});

test('coverage audit locks all prompts and documents the v1 sample', async () => {
  const { stdout } = await run('node', ['scripts/prompt-coverage-audit.mjs'], { encoding: 'utf8' });
  const audit = await readFile('docs/prompt-quality-audit.md', 'utf8');
  assert.match(stdout, /^Prompts: 95$/m);
  assert.match(stdout, /Actions: KEEP: 90 · EDIT: 5 · MERGE: 0 · REPLACE: 0 · REMOVE: 0/);
  assert.match(audit, /Scope: all 95 prompts/);
  assert.match(audit, /Thirty-five prompts were reviewed/);
  assert.match(audit, /Result: 35 reviewed, 35 PASS/);
  assert.match(audit, /differentiation/);
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
  const search = await readFile('src/search.ts', 'utf8');
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
  assert.match(search, /isAcronym/);
});

test('slide editor keeps the local-first and editable-PPTX contracts visible in source', async () => {
  const [view, model, pdf, exporter, storage] = await Promise.all([
    readFile('src/slide-editor/view.ts', 'utf8'),
    readFile('src/slide-editor/model.ts', 'utf8'),
    readFile('src/slide-editor/pdf.ts', 'utf8'),
    readFile('src/slide-editor/export.ts', 'utf8'),
    readFile('src/slide-editor/storage.ts', 'utf8'),
  ]);
  for (const pattern of [/Nahrajte PDF nebo PPTX prezentaci/, /Exportovat do PowerPointu/, /data-block-text/, /data-resize-block/, /data-image-mode/, /data-image-upload/, /processPdf/, /processPptx/, /validateSourceFile/]) assert.match(view, pattern);
  for (const pattern of [/MAX_PDF_BYTES/, /MAX_PDF_PAGES/, /validatePdfFile/, /linesToBlocks/, /boxToPptx/, /serializeProject/]) assert.match(model, pattern);
  assert.match(pdf, /GlobalWorkerOptions\.workerSrc/);
  assert.match(pdf, /createWorker\('ces\+eng'/);
  assert.match(exporter, /createPptx/);
  assert.match(exporter, /slide\.addImage\(\{ data: source\.imageUrl/);
  assert.match(exporter, /source\.blocks\.filter/);
  assert.match(exporter, /exportNativeObjects \|\| isBlockEdited\(block\)/);
  assert.match(exporter, /noSelect="1" noMove="1" noResize="1"/);
  assert.doesNotMatch(exporter, /slide\.background = \{ data: source\.imageUrl/);
  assert.match(exporter, /addText\(block\.text/);
  assert.match(exporter, /addEditableImage/);
  assert.match(exporter, /source\.imageBlocks/);
  assert.match(storage, /indexedDB\.open/);
});
