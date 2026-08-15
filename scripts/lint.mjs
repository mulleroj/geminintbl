import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';

async function sourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => entry.isDirectory() ? sourceFiles(join(directory, entry.name)) : []));
  return entries.filter((entry) => entry.isFile() && /\.(ts|mjs|css|html)$/.test(entry.name)).map((entry) => join(directory, entry.name)).concat(nested.flat());
}

const files = ['index.html', 'src/styles.css', ...(await sourceFiles('src')), ...(await sourceFiles('scripts')).filter((file) => !file.replaceAll('\\', '/').endsWith('scripts/lint.mjs'))].sort();
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
