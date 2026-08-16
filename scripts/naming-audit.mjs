import { readdir, readFile } from 'node:fs/promises';
import { extname, join, relative, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const legacyPattern = /NotebookLM/gi;
const forbiddenProductPattern = /Gemini\s+Notebook(?:LM|\s+LM)/i;
const scanRoots = ['README.md', 'index.html', 'package.json', 'src', 'docs', 'scripts', 'tests'];
const ignoredDirectories = new Set(['.git', 'dist', 'node_modules']);
const ignoredFiles = new Set(['scripts/naming-audit.mjs', 'tests/naming.test.mjs']);
const textExtensions = new Set(['.html', '.js', '.mjs', '.md', '.json', '.ts', '.txt']);

async function filesUnder(path) {
  const entry = await readdir(path, { withFileTypes: true });
  const files = [];
  for (const item of entry) {
    if (ignoredDirectories.has(item.name)) continue;
    const child = join(path, item.name);
    if (item.isDirectory()) files.push(...await filesUnder(child));
    else if (item.isFile() && textExtensions.has(extname(item.name).toLowerCase())) files.push(child);
  }
  return files;
}

const paths = new Set();
for (const scanRoot of scanRoots) {
  const absolute = join(root, scanRoot);
  const files = (await readdir(absolute, { withFileTypes: true }).catch(() => [])).length
    ? await filesUnder(absolute)
    : [absolute];
  for (const file of files) {
    if (!ignoredFiles.has(relative(root, file).replaceAll('\\', '/'))) paths.add(file);
  }
}

function classify(file, line) {
  const normalized = relative(root, file).replaceAll('\\', '/');
  if (/notebooklm\.google/i.test(line)) return 'URL';
  if (/t-notebooklm|slug:\s*'notebooklm-/i.test(line)) return 'CODE IDENTIFIER';
  if (/dříve\s+NotebookLM/i.test(line)) return 'SEO transition';
  if (normalized.startsWith('docs/')) return 'historical docs';
  if (normalized === 'README.md' || normalized === 'index.html') return 'SEO transition';
  if (normalized.startsWith('src/data/')) return 'external title';
  if (normalized.startsWith('src/')) return 'VISIBLE UI';
  return null;
}

const legacy = [];
const forbidden = [];
let currentReferences = 0;
for (const file of [...paths].sort()) {
  const text = await readFile(file, 'utf8');
  currentReferences += (text.match(/Gemini\s+Notebook/gi) ?? []).length;
  if (forbiddenProductPattern.test(text)) forbidden.push(relative(root, file).replaceAll('\\', '/'));
  const lines = text.split(/\r?\n/u);
  lines.forEach((line, index) => {
    for (const match of line.matchAll(legacyPattern)) {
      legacy.push({
        file: relative(root, file).replaceAll('\\', '/'),
        line: index + 1,
        text: line.trim(),
        category: classify(file, line.slice(Math.max(0, match.index - 80), match.index + match[0].length + 80)),
      });
    }
  });
}

const unclassified = legacy.filter((item) => !item.category);
const counts = new Map();
for (const item of legacy) counts.set(item.category ?? 'UNCLASSIFIED', (counts.get(item.category ?? 'UNCLASSIFIED') ?? 0) + 1);

console.log(`Gemini Notebook references: ${currentReferences}`);
console.log(`Legacy NotebookLM references: ${legacy.length}`);
console.log('Allowed legacy by type:');
for (const category of ['URL', 'historical docs', 'external title', 'SEO transition', 'CODE IDENTIFIER', 'VISIBLE UI']) {
  console.log(`  ${category}: ${counts.get(category) ?? 0}`);
}
console.log(`Unclassified legacy references: ${unclassified.length}`);
for (const item of unclassified) console.log(`- ${item.file}:${item.line} ${item.text}`);
if (forbidden.length) console.error(`Forbidden product spelling in: ${forbidden.join(', ')}`);

if (unclassified.length || forbidden.length) process.exitCode = 1;
