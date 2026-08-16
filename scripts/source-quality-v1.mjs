import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const sourceRoot = join(root, 'src', 'data', 'sources');
const outputPath = join(root, 'docs', 'source-quality-audit.md');
const expectedVerifiedAt = '2026-08-15';
const allowedSourceTypes = new Set(['official', 'academic', 'open-data', 'library', 'archive', 'reference', 'journalism', 'fact-check']);
const allowedSuitability = new Set(['high', 'medium', 'limited']);
const allowedAccess = new Set(['free', 'freemium', 'paid', 'institutional']);
const featuredIds = new Set(['s-msmt', 's-esbirka', 's-cszu', 's-cnb', 's-avcr', 's-kramerius-nkp', 's-ijp', 's-eurlex', 's-who', 's-demagog']);

function fieldValue(line, field) {
  return line.match(new RegExp('\\b' + field + ":\\s*'([^']*)'"))?.[1] ?? '';
}

function listValue(line, field) {
  const value = line.match(new RegExp('\\b' + field + ':\\s*\\[([^\\]]*)\\]'))?.[1] ?? '';
  return [...value.matchAll(/'([^']*)'/g)].map((match) => match[1]);
}

function canonicalUrl(value) {
  const url = new URL(value);
  url.hash = '';
  url.hostname = url.hostname.toLowerCase();
  if (url.pathname !== '/') url.pathname = url.pathname.replace(/\/+$/u, '');
  return url.toString();
}

function cell(value) {
  return String(value).replaceAll('|', '\\|').replaceAll('\n', ' ');
}

const categoryText = await readFile(join(root, 'src', 'data', 'categories.ts'), 'utf8');
const categorySection = categoryText.match(/export const sourceCategories[\s\S]*?= \[([\s\S]*?)\];/u)?.[1] ?? '';
const categoryIds = [...categorySection.matchAll(/id:\s*'([^']+)'/g)].map((match) => match[1]);
const sourceFiles = (await readdir(sourceRoot, { withFileTypes: true }))
  .filter((entry) => entry.isFile() && entry.name.endsWith('.ts') && !['index.ts', 'source-utils.ts'].includes(entry.name))
  .map((entry) => entry.name)
  .sort();
const records = [];
for (const file of sourceFiles) {
  const text = await readFile(join(sourceRoot, file), 'utf8');
  for (const line of text.split(/\r?\n/u)) {
    if (!/\bid:\s*'/u.test(line)) continue;
    const id = fieldValue(line, 'id');
    if (!id) continue;
    records.push({
      id,
      file,
      title: fieldValue(line, 'title'),
      url: fieldValue(line, 'url'),
      category: fieldValue(line, 'category'),
      description: fieldValue(line, 'description'),
      importTip: fieldValue(line, 'importTip'),
      access: fieldValue(line, 'access'),
      sourceType: fieldValue(line, 'sourceType'),
      notebookSuitability: fieldValue(line, 'notebookSuitability'),
      verifiedAt: fieldValue(line, 'verifiedAt'),
      language: listValue(line, 'language'),
      region: listValue(line, 'region'),
      sourceLabel: fieldValue(line, 'sourceLabel'),
    });
  }
}

const errors = [];
const duplicateIds = records.filter((record, index) => records.findIndex((item) => item.id === record.id) !== index).map((record) => record.id);
const canonicalUrls = records.map((record) => {
  try { return canonicalUrl(record.url); } catch { return 'invalid:' + record.id; }
});
const duplicateUrls = canonicalUrls.filter((url, index) => canonicalUrls.indexOf(url) !== index);

for (const record of records) {
  for (const field of ['title', 'url', 'category', 'description', 'importTip', 'sourceType', 'notebookSuitability', 'verifiedAt', 'sourceLabel']) {
    if (!record[field]) errors.push(record.id + ' missing ' + field);
  }
  if (!categoryIds.includes(record.category)) errors.push(record.id + ' unknown category ' + record.category);
  if (!allowedSourceTypes.has(record.sourceType)) errors.push(record.id + ' invalid sourceType ' + record.sourceType);
  if (!allowedSuitability.has(record.notebookSuitability)) errors.push(record.id + ' invalid notebookSuitability ' + record.notebookSuitability);
  if (!allowedAccess.has(record.access)) errors.push(record.id + ' invalid access ' + record.access);
  if (record.verifiedAt !== expectedVerifiedAt) errors.push(record.id + ' verifiedAt ' + (record.verifiedAt || '(missing)'));
  if (!record.language.length) errors.push(record.id + ' missing language');
  if (!record.region.length) errors.push(record.id + ' missing region');
  if (record.importTip.trim().split(/\s+/u).length < 6) errors.push(record.id + ' importTip too short');
  try { canonicalUrl(record.url); } catch { errors.push(record.id + ' invalid URL'); }
}

if (records.length < 150 || records.length > 200) errors.push('source count outside 150-200: ' + records.length);
if (categoryIds.length !== 10) errors.push('source category count: ' + categoryIds.length);
if (duplicateIds.length) errors.push('duplicate IDs: ' + [...new Set(duplicateIds)].join(', '));
if (duplicateUrls.length) errors.push('duplicate canonical URLs: ' + [...new Set(duplicateUrls)].join(', '));
const tips = records.filter((record) => record.importTip).length;
if (tips / records.length < 0.8) errors.push('import tips below 80%: ' + tips + '/' + records.length);
const featured = records.filter((record) => featuredIds.has(record.id));
if (featured.length < 8 || featured.length > 12) errors.push('featured source count outside 8-12: ' + featured.length);
const czechRelevant = records.filter((record) => record.region.includes('CZ')).length;
const categoryCounts = Object.fromEntries(categoryIds.map((id) => [id, records.filter((record) => record.category === id).length]));
const typeCounts = Object.fromEntries([...allowedSourceTypes].map((type) => [type, records.filter((record) => record.sourceType === type).length]));
const accessCounts = Object.fromEntries([...allowedAccess].map((access) => [access, records.filter((record) => record.access === access).length]));
const suitabilityCounts = Object.fromEntries([...allowedSuitability].map((level) => [level, records.filter((record) => record.notebookSuitability === level).length]));
const regionCounts = Object.fromEntries([...new Set(records.flatMap((record) => record.region))].sort().map((region) => [region, records.filter((record) => record.region.includes(region)).length]));

const categoryRows = categoryIds.map((id) => '| ' + id + ' | ' + categoryCounts[id] + ' | ' + Math.round((categoryCounts[id] / records.length) * 100) + ' % |').join('\n');
const sourceRows = records.map((record) => '| ' + cell(record.id) + ' | ' + cell(record.title) + ' | ' + record.category + ' | ' + cell(record.url) + ' | ' + record.sourceType + ' | ' + record.access + ' | ' + record.region.join(', ') + ' | ' + record.notebookSuitability + ' | ' + record.verifiedAt + ' | ' + cell(record.importTip) + ' |').join('\n');
const document = [
  '# Audit kvality Trusted Sources v1',
  '',
  'Audit date: ' + expectedVerifiedAt,
  'Scope: ' + records.length + ' records in src/data/sources/',
  '',
  '## Decision',
  '',
  'Source catalog is ' + (errors.length ? 'NOT READY' : 'READY') + ' for publication. Every record has a stable ID, canonical URL candidate, category, source type, notebook suitability, language, region, provenance label, verification date and import tip. The link checker is the final live-network gate because HTTP access can differ by bot protection or institutional network.',
  '',
  '| Metric | Result |',
  '| --- | ---: |',
  '| Total sources | ' + records.length + ' |',
  '| CZ-region sources | ' + czechRelevant + ' (' + Math.round((czechRelevant / records.length) * 100) + ' %) |',
  '| Sources with import tip | ' + tips + ' (' + Math.round((tips / records.length) * 100) + ' %) |',
  '| Featured sources | ' + featured.length + ' |',
  '| Categories | ' + categoryIds.length + ' |',
  '| Duplicate IDs | ' + new Set(duplicateIds).size + ' |',
  '| Duplicate canonical URLs | ' + new Set(duplicateUrls).size + ' |',
  '| Structural errors | ' + errors.length + ' |',
  '',
  '## Categories',
  '',
  '| Category | Sources | Share |',
  '| --- | ---: | ---: |',
  categoryRows,
  '',
  '## Source type, access and suitability',
  '',
  '- Source types: ' + Object.entries(typeCounts).map(([key, value]) => key + '=' + value).join(', ') + '.',
  '- Access: ' + Object.entries(accessCounts).map(([key, value]) => key + '=' + value).join(', ') + '.',
  '- Notebook suitability: ' + Object.entries(suitabilityCounts).map(([key, value]) => key + '=' + value).join(', ') + '.',
  '- Regions: ' + Object.entries(regionCounts).map(([key, value]) => key + '=' + value).join(', ') + '.',
  '- Featured set: ' + featured.map((record) => record.title).join(' · ') + '.',
  '',
  '## Verification rules',
  '',
  '- verifiedAt records the date on which the URL and source purpose were checked.',
  '- sourceType distinguishes primary official, academic, open-data, library, archive, reference, journalism and fact-check sources.',
  '- notebookSuitability describes whether a concrete page, document or dataset is useful as a Gemini Notebook source; it is not a claim about factual truth.',
  '- importTip tells the user what context to preserve when importing the source.',
  '- HTTP results are intentionally kept separate from metadata: BOT_BLOCKED or MANUAL_REVIEW is not treated as a broken URL.',
  '',
  '## Full source inventory',
  '',
  '| ID | Title | Category | URL | Type | Access | Region | Suitability | Verified | Import tip |',
  '| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |',
  sourceRows,
  '',
].join('\n');

await writeFile(outputPath, document, 'utf8');
console.log('Source quality: ' + (errors.length ? 'FAIL' : 'PASS'));
console.log('Sources: ' + records.length);
console.log('CZ region: ' + czechRelevant + ' (' + Math.round((czechRelevant / records.length) * 100) + '%)');
console.log('Import tips: ' + tips + '/' + records.length + ' (' + Math.round((tips / records.length) * 100) + '%)');
console.log('Featured sources: ' + featured.length);
console.log('Categories: ' + Object.entries(categoryCounts).map(([key, value]) => key + '=' + value).join(', '));
console.log('Source types: ' + Object.entries(typeCounts).map(([key, value]) => key + '=' + value).join(', '));
console.log('Access: ' + Object.entries(accessCounts).map(([key, value]) => key + '=' + value).join(', '));
console.log('Suitability: ' + Object.entries(suitabilityCounts).map(([key, value]) => key + '=' + value).join(', '));
console.log('Duplicate IDs: ' + (new Set(duplicateIds).size ? [...new Set(duplicateIds)].join(', ') : 'none'));
console.log('Duplicate canonical URLs: ' + (new Set(duplicateUrls).size ? [...new Set(duplicateUrls)].join(', ') : 'none'));
console.log('Report written: ' + outputPath);
if (errors.length) {
  console.error('\nSource quality audit failed:\n' + errors.map((error) => '- ' + error).join('\n'));
  process.exitCode = 1;
}
