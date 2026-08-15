import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('parity matrix documents every requested primary area', async () => {
  const text = await readFile('docs/reference-parity.md', 'utf8');
  for (const route of ['/prompts', '/sources', '/tools', '/notebooks', '/guides', '/favorites', '/submit', '/watermark-remover']) {
    assert.ok(text.includes(`| \`${route}\` |`), `missing route ${route}`);
  }
  assert.doesNotMatch(text, /\| TODO \|/);
});

test('static app contains all major Czech routes and provenance fields', async () => {
  const main = await readFile('src/main.ts', 'utf8');
  const data = await readFile('src/data.ts', 'utf8');
  for (const route of ['/prompty', '/zdroje', '/nastroje', '/notebooky', '/pruvodci', '/oblibene', '/pridat']) assert.match(main, new RegExp(route.replace('/', '\\/')));
  for (const field of ['sourceUrl', 'sourceLabel', 'retrievedAt', 'license', 'needsReview']) assert.match(data, new RegExp(field));
  assert.match(main, /navigator\.clipboard/);
  assert.match(main, /navigator\.share/);
});

test('SEO infrastructure is present', async () => {
  const [index, robots, sitemap] = await Promise.all([readFile('index.html', 'utf8'), readFile('public/robots.txt', 'utf8'), readFile('public/sitemap.xml', 'utf8')]);
  assert.match(index, /meta name="description"/);
  assert.match(index, /link rel="canonical"/);
  assert.match(robots, /Sitemap:/);
  assert.match(sitemap, /<urlset/);
});
