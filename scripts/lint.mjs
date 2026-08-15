import { readFile } from 'node:fs/promises';

const files = ['index.html', 'src/main.ts', 'src/data.ts', 'src/search.ts', 'src/storage.ts', 'src/styles.css'];
const forbidden = [/lorem ipsum/i, /target\s*=\s*["']_blank["'](?![^>]*rel=["'][^"']*noopener)/i];
const errors = [];
for (const file of files) {
  const text = await readFile(file, 'utf8');
  for (const pattern of forbidden) if (pattern.test(text)) errors.push(`${file}: ${pattern}`);
  if (text.includes('\r')) errors.push(`${file}: CRLF line endings are not allowed in generated source`);
}
if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`lint: checked ${files.length} files`);
}
