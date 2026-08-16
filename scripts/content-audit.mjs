import { readdir, readFile } from 'node:fs/promises';
import { basename, extname, join, resolve } from 'node:path';
import { auditPromptQuality } from './prompt-quality.mjs';

const root = resolve(import.meta.dirname, '..');
const contentRoot = join(root, 'src', 'data');

async function contentFiles(directory, includeIndex = false) {
  const entries = await readdir(directory, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && extname(entry.name) === '.ts' && (includeIndex || entry.name !== 'index.ts'))
    .map((entry) => join(directory, entry.name))
    .sort();
}

async function readSources(files) {
  return Promise.all(files.map(async (file) => ({ file, text: await readFile(file, 'utf8') })));
}

function recordsFromSource(text) {
  const matches = [...text.matchAll(/\bid:\s*'([^']+)'/g)];
  return matches.map((match, index) => ({
    id: match[1],
    block: text.slice(text.lastIndexOf('{', match.index), matches[index + 1] ? text.lastIndexOf('{', matches[index + 1].index) : text.length),
  }));
}

function duplicateValues(values) {
  const counts = new Map();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  return [...counts.entries()].filter(([, count]) => count > 1).map(([value]) => value).sort();
}

function registryIds(text, name) {
  const section = text.match(new RegExp(`export const ${name}[^=]*= \\[([\\s\\S]*?)\\];`))?.[1] ?? '';
  return [...section.matchAll(/\bid:\s*'([^']+)'/g)].map((match) => match[1]);
}

function fieldValue(block, field) {
  const literal = block.match(new RegExp(`\\b${field}:\\s*'([^']+)'`))?.[1];
  if (literal) return literal;
  const reference = block.match(new RegExp(`\\b${field}:\\s*([A-Za-z_$][\\w$]*)`))?.[1];
  const knownReferences = { featuredSourceUrl: ['https://blog.google/innovation-and-ai/models-and-research/google-labs/notebook', 'lm-featured-notebooks/'].join('') };
  return reference ? knownReferences[reference] ?? reference : undefined;
}

function hasField(block, field) {
  return new RegExp(`\\b${field}:`).test(block) || (field === 'verifiedAt' && new RegExp(`\\b${field},`).test(block));
}

function validUrl(value, allowInternal = false) {
  if (allowInternal && value.startsWith('/')) return true;
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

const groups = {
  prompts: { directory: join(contentRoot, 'prompts'), includeIndex: false, required: ['slug', 'title', 'description', 'prompt', 'category'], category: 'prompt' },
  sources: { directory: join(contentRoot, 'sources'), includeIndex: false, required: ['title', 'url', 'category', 'description'], category: 'source' },
  tools: { directory: join(contentRoot, 'tools'), includeIndex: true, required: ['title', 'type', 'category', 'description', 'tags', 'pricing', 'url', 'sourceType', 'integrationLevel', 'workflowTip', 'verifiedAt'], category: 'tool' },
  notebooks: { directory: join(contentRoot, 'notebooks'), includeIndex: true, required: ['title', 'category', 'description', 'url', 'language', 'region', 'topicTags', 'sourceType', 'access', 'verifiedAt', 'needsReview'], category: 'notebook' },
  guides: { directory: join(contentRoot, 'guides'), includeIndex: true, required: ['slug', 'title', 'excerpt', 'category', 'readingMinutes', 'tags', 'content', 'level', 'audience', 'relatedPromptIds', 'relatedSourceIds', 'relatedToolIds', 'relatedWorkflowIds', 'officialReferences', 'lastVerified'], category: 'guide' },
};

const categoryText = await readFile(join(contentRoot, 'categories.ts'), 'utf8');
const registryMap = {
  prompt: new Set(registryIds(categoryText, 'promptCategories')),
  source: new Set(registryIds(categoryText, 'sourceCategories')),
  guide: new Set(registryIds(categoryText, 'guideCategories')),
  tool: new Set(registryIds(categoryText, 'toolCategories')),
  notebook: new Set(registryIds(categoryText, 'notebookCategories')),
};
const allRecords = [];
const structuralIssues = [];
const invalidUrls = [];
const groupRecords = {};

for (const [name, config] of Object.entries(groups)) {
  const files = (await contentFiles(config.directory, config.includeIndex))
    .filter((file) => name !== 'guides' || !basename(file).startsWith('depth-'));
  const sources = await readSources(files);
  const records = sources.flatMap(({ file, text }) => recordsFromSource(text).map((record) => ({ ...record, file })));
  groupRecords[name] = records;
  allRecords.push(...records.map((record) => ({ ...record, type: name })));

  for (const record of records) {
    for (const field of config.required) {
      if (!hasField(record.block, field)) structuralIssues.push(`${name}:${record.id} missing ${field}`);
    }
    if (config.category && !registryMap[config.category].has(fieldValue(record.block, 'category'))) {
      structuralIssues.push(`${name}:${record.id} unknown category ${fieldValue(record.block, 'category') ?? '(missing)'}`);
    }
    for (const field of ['url', 'sourceUrl', 'github', 'githubUrl']) {
      const value = fieldValue(record.block, field);
      if (!value) continue;
      const allowInternal = field !== 'github';
      if (!validUrl(value, allowInternal)) invalidUrls.push(`${name}:${record.id}:${field}`);
    }
  }
}

const duplicateIds = duplicateValues(allRecords.map((record) => record.id));
const duplicateSlugs = [
  ...duplicateValues(groupRecords.prompts.map((record) => fieldValue(record.block, 'slug')).filter(Boolean)).map((slug) => `prompt:${slug}`),
  ...duplicateValues(groupRecords.guides.map((record) => fieldValue(record.block, 'slug')).filter(Boolean)).map((slug) => `guide:${slug}`),
].sort();
const provenanceScope = allRecords.filter((record) => ['prompts', 'notebooks', 'guides'].includes(record.type));
const isOriginalInternal = (record) => /\.\.\.projectProvenance\b/.test(record.block) || /\bsourceLabel:\s*'Originální obsah/.test(record.block);
const originalInternal = provenanceScope.filter(isOriginalInternal).length;
const externalRecords = provenanceScope.filter((record) => !isOriginalInternal(record));
const externalWithSourceUrl = externalRecords.filter((record) => fieldValue(record.block, 'sourceUrl'));
const externalMissingSourceUrl = externalRecords.filter((record) => !fieldValue(record.block, 'sourceUrl'));
const sourceUrlNotApplicable = originalInternal;
const needsReview = allRecords.filter((record) => /\bneedsReview:\s*true\b/.test(record.block)).length;
const toolPricing = Object.fromEntries(['free', 'freemium', 'paid', 'open source'].map((value) => [value, groupRecords.tools.filter((record) => fieldValue(record.block, 'pricing') === value).length]));
const toolIntegration = Object.fromEntries(['direct', 'workflow', 'adjacent'].map((value) => [value, groupRecords.tools.filter((record) => fieldValue(record.block, 'integrationLevel') === value).length]));
const toolSourceTypes = Object.fromEntries(['official', 'open-source', 'commercial', 'community'].map((value) => [value, groupRecords.tools.filter((record) => fieldValue(record.block, 'sourceType') === value).length]));
const notebookSourceTypes = Object.fromEntries(['official', 'education', 'research', 'community'].map((value) => [value, groupRecords.notebooks.filter((record) => fieldValue(record.block, 'sourceType') === value).length]));
const notebookAccess = Object.fromEntries(['public', 'google-account'].map((value) => [value, groupRecords.notebooks.filter((record) => fieldValue(record.block, 'access') === value).length]));
const featuredTools = groupRecords.tools.filter((record) => /\bfeatured:\s*true\b/.test(record.block)).length;
const featuredNotebooks = groupRecords.notebooks.filter((record) => /\bfeatured:\s*true\b/.test(record.block)).length;
const workflowTips = groupRecords.tools.filter((record) => /\bworkflowTip:\s*'[^']{80,}'/.test(record.block)).length;
const notebookVerified = groupRecords.notebooks.filter((record) => hasField(record.block, 'verifiedAt')).length;
const promptQuality = auditPromptQuality(groupRecords.prompts);
const formatMetrics = (metrics) => Object.entries(metrics).map(([key, value]) => `${key}=${value}`).join(', ');

const lines = [
  `Prompts: ${groupRecords.prompts.length}`,
  `Sources: ${groupRecords.sources.length}`,
  `Tools: ${groupRecords.tools.length}`,
  `Notebooks: ${groupRecords.notebooks.length}`,
  `Guides: ${groupRecords.guides.length}`,
  `Prompt categories: ${registryMap.prompt.size}`,
  `Source categories: ${registryMap.source.size}`,
  `Guide categories: ${registryMap.guide.size}`,
  `Tool categories: ${registryMap.tool.size}`,
  `Notebook categories: ${registryMap.notebook.size}`,
  `Tools by pricing: ${formatMetrics(toolPricing)}`,
  `Tools by integration: ${formatMetrics(toolIntegration)}`,
  `Tools by source type: ${formatMetrics(toolSourceTypes)}`,
  `Tool workflow tips >=80 chars: ${workflowTips}`,
  `Featured tools: ${featuredTools}`,
  `Notebooks by source type: ${formatMetrics(notebookSourceTypes)}`,
  `Notebooks by access: ${formatMetrics(notebookAccess)}`,
  `Verified notebooks: ${notebookVerified}`,
  `Featured notebooks: ${featuredNotebooks}`,
  `Prompts by category: ${formatMetrics(promptQuality.metrics.byCategory)}`,
  `Prompts by target: ${formatMetrics(promptQuality.metrics.byTarget)}`,
  `Prompts by audience: ${formatMetrics(promptQuality.metrics.byAudience)}`,
  `Prompts by complexity: ${formatMetrics(promptQuality.metrics.byComplexity)}`,
  `Featured prompts: ${promptQuality.metrics.featured}`,
  `Differentiation-tagged prompts: ${promptQuality.metrics.differentiation}`,
  `Tag vocabulary: ${promptQuality.metrics.tagVocabulary}`,
  `Rare prompt tags: ${promptQuality.metrics.rareTags.length}`,
  `Original Notebook Hub CZ: ${promptQuality.metrics.original}`,
  `External attributed prompts: ${promptQuality.metrics.externalAttributed}`,
  `Prompt quality: ${promptQuality.errors.length ? 'FAIL' : 'PASS'}`,
  `Prompt quality missing description: ${promptQuality.metrics.missingDescription}`,
  `Prompt quality missing prompt: ${promptQuality.metrics.missingPrompt}`,
  `Prompt quality missing tags: ${promptQuality.metrics.missingTags}`,
  `Prompt quality missing author: ${promptQuality.metrics.missingAuthor}`,
  `Prompt quality missing provenance: ${promptQuality.metrics.missingProvenance}`,
  `Prompt quality placeholders/TODO: ${promptQuality.metrics.placeholders}`,
  `Prompt quality duplicate titles: ${promptQuality.duplicateTitles.length ? promptQuality.duplicateTitles.join(', ') : 'none'}`,
  `Prompt quality duplicate normalized titles: ${promptQuality.duplicateNormalizedTitles.length ? promptQuality.duplicateNormalizedTitles.join(', ') : 'none'}`,
  `needsReview: ${needsReview}`,
  `Provenance original internal: ${originalInternal}`,
  `Provenance external with sourceUrl: ${externalWithSourceUrl.length}`,
  `Provenance external missing sourceUrl: ${externalMissingSourceUrl.length}`,
  `Provenance sourceUrl not applicable: ${sourceUrlNotApplicable}`,
  `Duplicate IDs: ${duplicateIds.length ? duplicateIds.join(', ') : 'none'}`,
  `Duplicate slugs: ${duplicateSlugs.length ? duplicateSlugs.join(', ') : 'none'}`,
  `Invalid URLs: ${invalidUrls.length ? invalidUrls.sort().join(', ') : 'none'}`,
];
console.log(lines.join('\n'));

const errors = [...structuralIssues, ...promptQuality.errors, ...duplicateIds.map((id) => `duplicate id: ${id}`), ...duplicateSlugs.map((slug) => `duplicate slug: ${slug}`), ...invalidUrls.map((url) => `invalid url: ${url}`)];
if (errors.length) {
  console.error(`\nContent audit failed:\n${errors.map((error) => `- ${error}`).join('\n')}`);
  process.exitCode = 1;
}
