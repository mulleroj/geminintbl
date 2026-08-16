import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const kind = process.argv[2];
if (!['tools', 'notebooks'].includes(kind)) {
  console.error('Usage: node scripts/check-catalog-links.mjs tools|notebooks');
  process.exitCode = 1;
}

const root = resolve(import.meta.dirname, '..');
const file = resolve(root, 'src', 'data', kind, 'index.ts');
const text = await readFile(file, 'utf8');
const records = [...text.matchAll(/\{\s*id:\s*'([^']+)'[\s\S]*?\burl:\s*'([^']+)'[\s\S]*?\}/g)].map((match) => ({ id: match[1], url: match[2] }));

const timeoutMs = 10000;

function statusForResponse(url, response) {
  const location = response.headers.get('location');
  if (response.status >= 300 && response.status < 400) {
    if (/accounts\.google\.com|accessrequest/i.test(location ?? '')) return 'AUTH_REQUIRED';
    return 'REDIRECT';
  }
  if (response.status === 401 || (response.status === 403 && /google\.(com|google)/i.test(url))) return 'AUTH_REQUIRED';
  if ([403, 429, 451].includes(response.status)) return 'BOT_BLOCKED';
  if (response.status >= 400) return 'BROKEN';
  return 'VALID';
}

async function check(url) {
  if (url.startsWith('/')) return 'VALID';
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { method: 'HEAD', redirect: 'manual', signal: controller.signal, headers: { 'user-agent': 'Notebook-Hub-CZ-link-check/1.0' } });
    return statusForResponse(url, response);
  } catch (error) {
    if (error?.name === 'AbortError') return 'TIMEOUT';
    return 'MANUAL_REVIEW';
  } finally {
    clearTimeout(timer);
  }
}

const results = [];
for (const record of records) results.push({ ...record, status: await check(record.url) });
const counts = Object.fromEntries(['VALID', 'REDIRECT', 'BOT_BLOCKED', 'AUTH_REQUIRED', 'BROKEN', 'TIMEOUT', 'MANUAL_REVIEW'].map((status) => [status, results.filter((result) => result.status === status).length]));
console.log(`${kind}: ${results.length}`);
console.log(`Statuses: ${Object.entries(counts).map(([status, count]) => `${status}=${count}`).join(', ')}`);
for (const result of results) console.log(`${result.status}\t${result.id}\t${result.url}`);
if (results.some((result) => result.status === 'BROKEN')) process.exitCode = 1;
