import { readdir, readFile } from 'node:fs/promises';
import { extname, join, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const dataRoot = join(root, 'src', 'data');
const guidesRoot = join(dataRoot, 'guides');

async function tsFiles(directory, includeIndex = false) {
  const entries = await readdir(directory, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && extname(entry.name) === '.ts' && (includeIndex || entry.name !== 'index.ts'))
    .map((entry) => join(directory, entry.name))
    .sort();
}

async function sourceTexts(directory, includeIndex = false) {
  const files = await tsFiles(directory, includeIndex);
  return Promise.all(files.map(async (file) => ({ file, text: await readFile(file, 'utf8') })));
}

function recordsFromSource(text) {
  const matches = [...text.matchAll(/\bid:\s*'([^']+)'/g)];
  return matches.map((match, index) => ({
    id: match[1],
    block: text.slice(text.lastIndexOf('{', match.index), matches[index + 1] ? text.lastIndexOf('{', matches[index + 1].index) : text.length),
  }));
}

function literal(block, field) {
  const direct = block.match(new RegExp(`\\b${field}:\\s*'([^']+)'`))?.[1];
  if (direct) return direct;
  const reference = block.match(new RegExp(`\\b${field}:\\s*([A-Za-z_$][\\w$]*)`))?.[1];
  return reference === 'verified' ? '2026-08-16' : reference;
}

function arrayField(block, field) {
  const value = block.match(new RegExp(`\\b${field}:\\s*\\[([\\s\\S]*?)\\]`))?.[1] ?? '';
  return [...value.matchAll(/'([^']+)'/g)].map((match) => match[1]);
}

function referenceCount(block) {
  const value = block.match(/\bofficialReferences:\s*\[([\s\S]*?)\]/)?.[1] ?? '';
  return (value.match(/\burl:\s*'https:\/\//g) ?? []).length;
}

function wordCount(block) {
  const content = block.match(/\bcontent:\s*\[([\s\S]*)\]/)?.[1] ?? '';
  return (content.match(/[A-Za-zÀ-ž0-9]+(?:[-'][A-Za-zÀ-ž0-9]+)*/g) ?? []).length;
}

function duplicates(values) {
  const counts = new Map();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  return [...counts.entries()].filter(([, count]) => count > 1).map(([value]) => value).sort();
}

function registryIds(text, name) {
  const section = text.match(new RegExp(`export const ${name}[^=]*= \\[([\\s\\S]*?)\\];`))?.[1] ?? '';
  return [...section.matchAll(/\bid:\s*'([^']+)'/g)].map((match) => match[1]);
}

const [guideSources, promptSources, sourceSources, toolSources, workflowText, categoriesText] = await Promise.all([
  sourceTexts(guidesRoot, true),
  sourceTexts(join(dataRoot, 'prompts')),
  sourceTexts(join(dataRoot, 'sources')),
  sourceTexts(join(dataRoot, 'tools'), true),
  readFile(join(dataRoot, 'teacher-workflows.ts'), 'utf8'),
  readFile(join(dataRoot, 'categories.ts'), 'utf8'),
]);

const guides = guideSources.flatMap(({ file, text }) => recordsFromSource(text).map((record) => ({ ...record, file })));
const ids = {
  prompt: new Set(promptSources.flatMap(({ text }) => recordsFromSource(text).map((record) => record.id))),
  source: new Set(sourceSources.flatMap(({ text }) => recordsFromSource(text).map((record) => record.id))),
  tool: new Set(toolSources.flatMap(({ text }) => recordsFromSource(text).map((record) => record.id))),
  workflow: new Set(recordsFromSource(workflowText).map((record) => record.id)),
};
const guideCategoryIds = new Set(registryIds(categoriesText, 'guideCategories'));
const required = ['slug', 'title', 'excerpt', 'category', 'readingMinutes', 'tags', 'content', 'level', 'audience', 'relatedPromptIds', 'relatedSourceIds', 'relatedToolIds', 'relatedWorkflowIds', 'officialReferences', 'lastVerified'];
const allowedLevels = new Set(['beginner', 'intermediate', 'advanced']);
const allowedAudiences = new Set(['teacher', 'student', 'researcher', 'professional', 'general']);
const structuralIssues = [];
const dangling = [];

for (const guide of guides) {
  for (const field of required) if (!new RegExp(`\\b${field}:`).test(guide.block)) structuralIssues.push(`${guide.id} missing ${field}`);
  if (!guideCategoryIds.has(literal(guide.block, 'category'))) structuralIssues.push(`${guide.id} unknown category ${literal(guide.block, 'category') ?? '(missing)'}`);
  if (!allowedLevels.has(literal(guide.block, 'level'))) structuralIssues.push(`${guide.id} invalid level`);
  for (const audience of arrayField(guide.block, 'audience')) if (!allowedAudiences.has(audience)) structuralIssues.push(`${guide.id} invalid audience ${audience}`);
  for (const [field, type] of [['relatedPromptIds', 'prompt'], ['relatedSourceIds', 'source'], ['relatedToolIds', 'tool'], ['relatedWorkflowIds', 'workflow']]) {
    for (const id of arrayField(guide.block, field)) if (!ids[type].has(id)) dangling.push(`${guide.id}:${field}:${id}`);
  }
  if (referenceCount(guide.block) < 1) structuralIssues.push(`${guide.id} missing official reference`);
  if (wordCount(guide.block) < 200) structuralIssues.push(`${guide.id} content below 200 words`);
}

const byCategory = Object.fromEntries([...guideCategoryIds].map((category) => [category, guides.filter((guide) => literal(guide.block, 'category') === category).length]));
const byLevel = Object.fromEntries(['beginner', 'intermediate', 'advanced'].map((level) => [level, guides.filter((guide) => literal(guide.block, 'level') === level).length]));
const byAudience = Object.fromEntries([...allowedAudiences].map((audience) => [audience, guides.filter((guide) => arrayField(guide.block, 'audience').includes(audience)).length]));
const featured = guides.filter((guide) => /\bfeatured:\s*true\b/.test(guide.block));
const needsReview = guides.filter((guide) => /\bneedsReview:\s*true\b/.test(guide.block));
const missingLastVerified = guides.filter((guide) => !literal(guide.block, 'lastVerified'));
const missingAvailabilityNote = guides.filter((guide) => !/\bavailabilityNote:/.test(guide.block));
const duplicateTitles = duplicates(guides.map((guide) => literal(guide.block, 'title')).filter(Boolean));
const normalizedTitles = duplicates(guides.map((guide) => (literal(guide.block, 'title') ?? '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, ' ').trim()).filter(Boolean));
const officialCoverage = guides.filter((guide) => referenceCount(guide.block) > 0).length;
const contentWordCounts = guides.map((guide) => wordCount(guide.block));
const tooShort = guides.filter((guide) => wordCount(guide.block) < 200);
const relatedCounts = guides.map((guide) => ['relatedPromptIds', 'relatedSourceIds', 'relatedToolIds', 'relatedWorkflowIds'].reduce((count, field) => count + arrayField(guide.block, field).length, 0));
const totalRelated = relatedCounts.reduce((sum, count) => sum + count, 0);
const format = (values) => Object.entries(values).map(([key, value]) => `${key}=${value}`).join(', ');

const lines = [
  `Guides: ${guides.length}`,
  `Guide categories: ${guideCategoryIds.size}`,
  `Guides by category: ${format(byCategory)}`,
  `Guides by level: ${format(byLevel)}`,
  `Guides by audience: ${format(byAudience)}`,
  `Featured guides: ${featured.length}`,
  `needsReview: ${needsReview.length}`,
  `Missing lastVerified: ${missingLastVerified.length}`,
  `Availability notes: ${guides.length - missingAvailabilityNote.length}`,
  `Official reference coverage: ${officialCoverage}/${guides.length}`,
  `Related references: ${totalRelated}`,
  `Dangling references: ${dangling.length ? dangling.join(', ') : 'none'}`,
  `Content words: min=${Math.min(...contentWordCounts)}, max=${Math.max(...contentWordCounts)}, average=${Math.round(contentWordCounts.reduce((sum, count) => sum + count, 0) / guides.length)}`,
  `Too-short content (<200 words): ${tooShort.length ? tooShort.map((guide) => guide.id).join(', ') : 'none'}`,
  `Duplicate normalized titles: ${normalizedTitles.length ? normalizedTitles.join(', ') : 'none'}`,
  `Duplicate job-to-be-done: ${duplicateTitles.length ? duplicateTitles.join(', ') : 'none'}`,
];
console.log(lines.join('\n'));

const errors = [...structuralIssues, ...dangling.map((item) => `dangling reference: ${item}`), ...duplicateTitles.map((title) => `duplicate title: ${title}`), ...normalizedTitles.map((title) => `duplicate normalized title: ${title}`)];
if (guides.length < 25 || guides.length > 35) errors.push(`guide count outside 25-35: ${guides.length}`);
if (featured.length < 6) errors.push(`featured guide count below 6: ${featured.length}`);
if (tooShort.length) errors.push(...tooShort.map((guide) => `guide below target length: ${guide.id}`));
if (errors.length) {
  console.error(`\nGuides audit failed:\n${errors.map((error) => `- ${error}`).join('\n')}`);
  process.exitCode = 1;
}
