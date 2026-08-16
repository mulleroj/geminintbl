import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('homepage keeps hero, stats, teacher teaser and featured prompts in order', async () => {
  const main = await readFile('src/main.ts', 'utf8');
  const legacyStart = main.indexOf('function legacyHome');
  const homeStart = main.indexOf('function teacherHomeSection');
  const legacyHome = main.slice(legacyStart, homeStart);
  const hero = legacyHome.indexOf('<section class="hero">');
  const stats = legacyHome.indexOf('<section class="stats-section wrap">');
  const statsEnd = legacyHome.indexOf('</section>', stats) + '</section>'.length;
  const featured = legacyHome.indexOf('card-grid prompt-grid');

  assert.ok(hero >= 0, 'hero marker is required');
  assert.ok(stats > hero, 'stats must follow hero');
  assert.ok(featured > statsEnd, 'featured prompts must follow stats');
  assert.match(main, /class="section section-tint teacher-home-section"/);
  assert.match(main, /insertHomepageSectionAfter\(legacyHome\(\), 'stats-section wrap', teacherHomeSection\(\)\)/);
  assert.doesNotMatch(main, /legacyHome\(\)\.replace\(/, 'homepage must not inject through the main wrapper');
});
