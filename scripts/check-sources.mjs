import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const sourceRoot = join(root, 'src', 'data', 'sources');
const reportPath = join(root, 'docs', 'source-link-check.md');
const timeoutMs = 8000;
const concurrency = 6;

function fieldValue(line, field) {
  return line.match(new RegExp('\\b' + field + ":\\s*'([^']*)'"))?.[1] ?? '';
}

function canonicalUrl(value) {
  const url = new URL(value);
  url.hash = '';
  if (url.pathname !== '/') url.pathname = url.pathname.replace(/\/+$/u, '');
  return url.toString();
}

async function sourceRecords() {
  const files = (await readdir(sourceRoot, { withFileTypes: true }))
    .filter((entry) => entry.isFile() && entry.name.endsWith('.ts') && !['index.ts', 'source-utils.ts'].includes(entry.name))
    .map((entry) => entry.name)
    .sort();
  const records = [];
  for (const file of files) {
    const text = await readFile(join(sourceRoot, file), 'utf8');
    for (const line of text.split(/\r?\n/u)) {
      if (!/\bid:\s*'/u.test(line)) continue;
      const id = fieldValue(line, 'id');
      const url = fieldValue(line, 'url');
      if (id && url) records.push({ id, title: fieldValue(line, 'title'), url });
    }
  }
  return records;
}

async function request(url, method) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      method,
      redirect: 'follow',
      headers: {
        accept: 'text/html,application/xhtml+xml,application/pdf;q=0.8,*/*;q=0.5',
        'user-agent': 'Notebook-Hub-CZ-source-audit/1.0',
      },
      signal: controller.signal,
    });
    return { status: response.status, finalUrl: response.url || url };
  } finally {
    clearTimeout(timer);
  }
}

function statusClass(result, originalUrl) {
  if (result.error === 'timeout') return 'TIMEOUT';
  if (result.error) return 'MANUAL_REVIEW';
  if ([401, 403, 407, 429].includes(result.status)) return 'BOT_BLOCKED';
  if (result.status >= 200 && result.status < 300) return result.finalUrl !== originalUrl ? 'REDIRECT' : 'VALID';
  if (result.status >= 300 && result.status < 400) return 'REDIRECT';
  if (result.status >= 400) return 'BROKEN';
  return 'MANUAL_REVIEW';
}

async function checkRecord(record) {
  let response;
  try {
    response = await request(record.url, 'HEAD');
    if ([400, 405, 501].includes(response.status)) response = await request(record.url, 'GET');
  } catch (error) {
    if (error?.name === 'AbortError' || error?.code === 'ABORT_ERR') return { ...record, status: 'TIMEOUT', detail: 'request timeout' };
    return { ...record, status: 'MANUAL_REVIEW', detail: error?.message ?? 'network error' };
  }
  return { ...record, status: statusClass(response, record.url), httpStatus: response.status, finalUrl: response.finalUrl, detail: response.finalUrl !== record.url ? 'redirected to final URL' : '' };
}

async function mapWithConcurrency(items, worker) {
  const results = new Array(items.length);
  let next = 0;
  async function run() {
    while (next < items.length) {
      const index = next;
      next += 1;
      results[index] = await worker(items[index]);
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, run));
  return results;
}

const records = await sourceRecords();
const results = await mapWithConcurrency(records, checkRecord);
const statuses = ['VALID', 'REDIRECT', 'BOT_BLOCKED', 'BROKEN', 'TIMEOUT', 'MANUAL_REVIEW'];
const counts = Object.fromEntries(statuses.map((status) => [status, results.filter((result) => result.status === status).length]));
const nonValidRows = results
  .filter((result) => result.status !== 'VALID')
  .map((result) => '| ' + result.id + ' | ' + result.status + ' | ' + (result.httpStatus ?? '') + ' | ' + result.url + ' | ' + (result.finalUrl ?? '') + ' | ' + (result.detail ?? '') + ' |')
  .join('\n');
const report = [
  '# Live source link check',
  '',
  'Checked: ' + new Date().toISOString(),
  'Scope: ' + records.length + ' source records',
  'Network policy: HEAD first, GET fallback for 400/405/501, follow redirects, 8 second timeout, concurrency ' + concurrency + '.',
  '',
  '| Status | Count |',
  '| --- | ---: |',
  ...statuses.map((status) => '| ' + status + ' | ' + counts[status] + ' |'),
  '',
  'BROKEN and TIMEOUT are release-blocking. BOT_BLOCKED and MANUAL_REVIEW remain visible because an access restriction is not proof that the source is gone.',
  '',
  '## Non-VALID results',
  '',
  '| ID | Status | HTTP | Original URL | Final URL | Note |',
  '| --- | --- | ---: | --- | --- | --- |',
  nonValidRows || '| — | none |  |  |  |  |',
  '',
].join('\n');
await writeFile(reportPath, report, 'utf8');

console.log('Source link check: ' + ((counts.BROKEN || counts.TIMEOUT) ? 'FAIL' : 'PASS'));
console.log('Checked: ' + records.length);
for (const status of statuses) console.log(status + ': ' + counts[status]);
console.log('Report written: ' + reportPath);
if (counts.BROKEN || counts.TIMEOUT) {
  console.error('Broken or timed-out source links:');
  for (const result of results.filter((item) => ['BROKEN', 'TIMEOUT'].includes(item.status))) console.error('- ' + result.id + ' ' + result.status + ' ' + result.url);
  process.exitCode = 1;
}
