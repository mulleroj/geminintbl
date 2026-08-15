import test from 'node:test';
import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const sourceRoot = join('src', 'data', 'sources');
const promptRoot = join('src', 'data', 'prompts');
const sourceCategories = new Set([
  'education', 'legislation', 'statistics', 'economics', 'science', 'history-archives',
  'czech-language', 'eu', 'international', 'journalism-fact-check',
]);
const sourceTypes = new Set(['official', 'academic', 'open-data', 'library', 'archive', 'reference', 'journalism', 'fact-check']);
const suitability = new Set(['high', 'medium', 'limited']);
const requiredFields = ['title', 'url', 'category', 'description', 'importTip', 'access', 'sourceType', 'notebookSuitability', 'verifiedAt', 'language', 'region', 'sourceLabel'];

async function tsFiles(directory) {
  return (await readdir(directory, { withFileTypes: true }))
    .filter((entry) => entry.isFile() && entry.name.endsWith('.ts') && entry.name !== 'index.ts' && entry.name !== 'source-utils.ts')
    .map((entry) => join(directory, entry.name));
}

async function records(directory) {
  const files = await tsFiles(directory);
  const loaded = await Promise.all(files.map(async (file) => ({ file, text: await readFile(file, 'utf8') })));
  return loaded.flatMap(({ file, text }) => [...text.matchAll(/source\(\{\s*id:\s*'([^']+)'/g)].map((match, index, matches) => ({
    file,
    id: match[1],
    block: text.slice(match.index, matches[index + 1]?.index ?? text.length),
  })));
}

function field(block, name) {
  return block.match(new RegExp(`\\b${name}:\\s*'([^']+)'`))?.[1] ?? '';
}

function canonical(value) {
  const url = new URL(value);
  const path = url.pathname.replace(/\/$/u, '') || '/';
  return `${url.protocol}//${url.host.toLowerCase()}${path}${url.search}`;
}

test('trusted source inventory has the required size and unique canonical links', async () => {
  const items = await records(sourceRoot);
  assert.ok(items.length >= 150 && items.length <= 200, `expected 150-200 sources, got ${items.length}`);
  assert.equal(items.length, 175);
  assert.equal(new Set(items.map((item) => item.id)).size, items.length, 'source IDs must be unique');
  const canonicalUrls = items.map((item) => canonical(field(item.block, 'url')));
  assert.equal(new Set(canonicalUrls).size, canonicalUrls.length, 'canonical source URLs must be unique');
});

test('every source has registry membership, trust metadata and a Czech verification date', async () => {
  const items = await records(sourceRoot);
  for (const item of items) {
    for (const name of requiredFields) assert.ok(new RegExp(`\\b${name}:`).test(item.block), `${item.id} missing ${name}`);
    assert.ok(sourceCategories.has(field(item.block, 'category')), `${item.id} has an unregistered category`);
    assert.ok(sourceTypes.has(field(item.block, 'sourceType')), `${item.id} has an invalid source type`);
    assert.ok(suitability.has(field(item.block, 'notebookSuitability')), `${item.id} has invalid notebook suitability`);
    assert.equal(field(item.block, 'verifiedAt'), '2026-08-15', `${item.id} has an unexpected verification date`);
    assert.ok(item.block.includes('language: [') && item.block.includes('region: ['), `${item.id} needs language and region metadata`);
  }
});

test('prompt library v1 remains locked at exactly 95 records', async () => {
  const files = await tsFiles(promptRoot);
  const texts = await Promise.all(files.map((file) => readFile(file, 'utf8')));
  const promptIds = texts.flatMap((text) => [...text.matchAll(/\bid:\s*'([^']+)'/g)].map((match) => match[1]));
  assert.equal(promptIds.length, 95);
  assert.equal(new Set(promptIds).size, 95, 'prompt IDs must remain unique');
});
