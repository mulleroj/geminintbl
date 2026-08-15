import { readdir, readFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { auditPromptQuality } from './prompt-quality.mjs';

const root = resolve(import.meta.dirname, '..');
const directory = join(root, 'src', 'data', 'prompts');
const files = (await readdir(directory, { withFileTypes: true }))
  .filter((entry) => entry.isFile() && entry.name.endsWith('.ts') && entry.name !== 'index.ts')
  .map((entry) => join(directory, entry.name))
  .sort();
const records = [];
for (const file of files) {
  const text = await readFile(file, 'utf8');
  for (const line of text.split(/\r?\n/u)) {
    if (/\bid:\s*'/.test(line)) records.push({ file, block: line, id: line.match(/\bid:\s*'([^']+)'/)?.[1] ?? '' });
  }
}
const report = auditPromptQuality(records);
console.log(`Prompt quality: ${report.errors.length ? 'FAIL' : 'PASS'}`);
console.log(`Prompts: ${report.prompts.length}`);
console.log(`Featured: ${report.metrics.featured}`);
console.log(`Differentiation-tagged prompts: ${report.metrics.differentiation}`);
console.log(`Tag vocabulary: ${report.metrics.tagVocabulary}`);
console.log(`Rare tags: ${report.metrics.rareTags.length}`);
console.log(`needsReview: ${report.metrics.needsReview}`);
console.log(`Missing description: ${report.metrics.missingDescription}`);
console.log(`Missing prompt: ${report.metrics.missingPrompt}`);
console.log(`Missing tags: ${report.metrics.missingTags}`);
console.log(`Missing author: ${report.metrics.missingAuthor}`);
console.log(`Missing provenance: ${report.metrics.missingProvenance}`);
console.log(`Placeholders/TODO: ${report.metrics.placeholders}`);
console.log(`Duplicate titles: ${report.duplicateTitles.length ? report.duplicateTitles.join(', ') : 'none'}`);
console.log(`Duplicate normalized titles: ${report.duplicateNormalizedTitles.length ? report.duplicateNormalizedTitles.join(', ') : 'none'}`);
if (report.errors.length) {
  console.error(report.errors.map((error) => `- ${error}`).join('\n'));
  process.exitCode = 1;
}
