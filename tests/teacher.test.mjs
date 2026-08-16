import test from 'node:test';
import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const read = (path) => readFile(path, 'utf8');
const root = process.cwd();

test('teacher workflow library is complete and prompt references are not dangling', async () => {
  const [data, schema] = await Promise.all([read(join(root, 'src/data/teacher-workflows.ts')), read(join(root, 'src/schemas/teacher.ts'))]);
  const workflowBlocks = [...data.matchAll(/\bid:\s*'wf-[^']+'[\s\S]*?(?=\n  \},|\n\];)/g)].map((match) => match[0]);
  assert.equal(workflowBlocks.length, 13);
  for (const block of workflowBlocks) {
    assert.match(block, /whatYouNeed:/);
    assert.match(block, /sourcesToUpload:/);
    assert.match(block, /promptIds:/);
    assert.match(block, /steps:/);
    assert.match(block, /checkBeforeUse:/);
  }
  const promptIds = [...data.matchAll(/promptIds:\s*\[([^\]]+)\]/g)].flatMap((match) => [...match[1].matchAll(/'([^']+)'/g)].map((item) => item[1]));
  const promptFiles = await readdir(join(root, 'src/data/prompts'), { withFileTypes: true });
  const promptText = (await Promise.all(promptFiles.filter((file) => file.isFile()).map((file) => read(join(root, 'src/data/prompts', file.name))))).join('\n');
  for (const id of promptIds) assert.match(promptText, new RegExp(`id: '${id}'`), `dangling prompt reference ${id}`);
  assert.match(schema, /TeacherWorkflowCategory/);
  assert.match(data, /Odpovídat diagnózu|diagnózu|doporučením/);
});

test('generator routes are internal and have no iframe or external-redirect implementation', async () => {
  const [main, presentation, infographic, audio] = await Promise.all([
    read(join(root, 'src/main.ts')),
    read(join(root, 'src/generators/presentation/view.ts')),
    read(join(root, 'src/generators/infographic/view.ts')),
    read(join(root, 'src/generators/audio-video/view.ts')),
  ]);
  for (const route of ['/nastroje/generator-prezentace', '/nastroje/generator-infografiky', '/nastroje/generator-audio-video']) assert.match(main, new RegExp(route.replaceAll('/', '\\/')));
  for (const text of [presentation, infographic, audio]) assert.doesNotMatch(text, /<iframe/i);
  assert.match(main, /import\('\.\/generators\/presentation\/view'/);
});

test('generator builders preserve the audited feature surfaces', async () => {
  const [presentation, infographic, audio, presets] = await Promise.all([
    read(join(root, 'src/generators/presentation/prompt-builder.ts')),
    read(join(root, 'src/generators/infographic/prompt-builder.ts')),
    read(join(root, 'src/generators/audio-video/prompt-builder.ts')),
    read(join(root, 'src/generators/infographic/presets.ts')),
  ]);
  for (const field of ['deckLength', 'numSlides', 'targetAudience', 'illustrationPreset', 'themePack']) assert.match(presentation, new RegExp(field));
  for (const field of ['ratio', 'detail', 'style', 'layoutPreset', 'colorMode', 'fixTypography', 'spellcheck']) assert.match(infographic, new RegExp(field));
  for (const field of ['mediaType', 'duration', 'narrationStyle', 'speaker1', 'speaker2', 'aspectRatio', 'allowOverlap']) assert.match(audio, new RegExp(field));
  for (const field of ['stylePresets', 'layoutPresets', 'colorModes']) assert.match(presets, new RegExp(field));
});

test('prompt library remains locked at 95 and generator output is explicitly a prompt', async () => {
  const files = await readdir(join(root, 'src/data/prompts'), { withFileTypes: true });
  const text = (await Promise.all(files.filter((file) => file.isFile()).map((file) => read(join(root, 'src/data/prompts', file.name))))).join('\n');
  assert.equal([...text.matchAll(/\bid:\s*'p-[^']+'/g)].length, 95);
  const generatorViews = await Promise.all([
    read(join(root, 'src/generators/presentation/view.ts')),
    read(join(root, 'src/generators/infographic/view.ts')),
    read(join(root, 'src/generators/audio-video/view.ts')),
  ]);
  for (const view of generatorViews) assert.match(view, /prompt/i);
});
