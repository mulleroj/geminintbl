import { readdir, readFile } from 'node:fs/promises';
import { basename, join, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const guidesRoot = join(root, 'src', 'data', 'guides');

function recordsFromSource(text) {
  const matches = [...text.matchAll(/\bid:\s*'([^']+)'/g)];
  return matches.map((match, index) => ({
    id: match[1],
    block: text.slice(text.lastIndexOf('{', match.index), matches[index + 1] ? text.lastIndexOf('{', matches[index + 1].index) : text.length),
  }));
}

function fieldArray(block, field) {
  const value = block.match(new RegExp(`\\b${field}:\\s*\\[([\\s\\S]*?)\\]`))?.[1] ?? '';
  return [...value.matchAll(/'([^']+)'/g)].map((match) => match[1]);
}

function headings(block) {
  return [...block.matchAll(/\bheading:\s*'([^']+)'/g)].map((match) => match[1]);
}

function wordCount(block, field) {
  const value = block.match(new RegExp(`\\b${field}:\\s*\\[([\\s\\S]*)\\]`))?.[1] ?? '';
  return (value.match(/[A-Za-zÀ-ž0-9]+(?:[-'][A-Za-zÀ-ž0-9]+)*/g) ?? []).length;
}

const files = (await readdir(guidesRoot)).filter((file) => file.endsWith('.ts') && file !== 'index.ts');
const sources = await Promise.all(files.map(async (file) => ({ file, text: await readFile(join(guidesRoot, file), 'utf8') })));
const base = sources.filter(({ file }) => !basename(file).startsWith('depth-')).flatMap(({ file, text }) => recordsFromSource(text).map((record) => ({ ...record, file })));
const depth = sources.filter(({ file }) => basename(file).startsWith('depth-') && !basename(file).startsWith('depth-extra')).flatMap(({ file, text }) => recordsFromSource(text).map((record) => ({ ...record, file })));
const extras = sources.filter(({ file }) => basename(file).startsWith('depth-extra')).flatMap(({ file, text }) => recordsFromSource(text).map((record) => ({ ...record, file })));
const depthById = new Map(depth.map((record) => [record.id, record]));
const extrasById = new Map();
for (const record of extras) {
  const previous = extrasById.get(record.id);
  extrasById.set(record.id, previous ? { ...record, block: `${previous.block}\n${record.block}` } : record);
}

const rows = base.map((record) => {
  const depthRecord = depthById.get(record.id);
  const extraRecord = extrasById.get(record.id);
  const baseSections = headings(record.block);
  const depthSections = headings(depthRecord?.block ?? '');
  const extraSections = headings(extraRecord?.block ?? '');
  return {
    id: record.id,
    baseWords: wordCount(record.block, 'content'),
    depthWords: wordCount(depthRecord?.block ?? '', 'sections'),
    extraWords: wordCount(extraRecord?.block ?? '', 'sections'),
    baseSections: baseSections.length,
    depthSections: depthSections.length,
    extraSections: extraSections.length,
    baseHeadings: baseSections,
    depthHeadings: depthSections,
    extraHeadings: extraSections,
  };
});

console.log(JSON.stringify(rows, null, 2));
