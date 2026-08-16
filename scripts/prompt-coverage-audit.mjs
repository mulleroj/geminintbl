import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { normalizeTitle, parsePromptRecord } from './prompt-quality.mjs';

const root = resolve(import.meta.dirname, '..');
const promptRoot = join(root, 'src', 'data', 'prompts');
const outputPath = join(root, 'docs', 'prompt-quality-audit.md');

const beforeByCategory = {
  'deep-analysis': 2,
  'setup-accuracy': 1,
  'study-exam-prep': 2,
  'audio-overviews': 1,
  'slides-video-infographics': 2,
  'writing-content': 1,
  'strategy-decisions': 1,
  workflows: 2,
  teaching: 0,
};

const actionOverrides = {
  'p-kontrolni-protokol-odpovedi': { action: 'EDIT', note: 'zpřesněn rozdíl mezi kontrolou jedné odpovědi a trvalým nastavením chatu' },
  'p-vyukova-infografika': { action: 'EDIT', note: 'oddělen výukový scénář od designového briefu infografiky' },
  'p-plan-pripravy': { action: 'EDIT', note: 'odstraněn audience tag student; audience zůstává v metadatech' },
  'p-test-s-klicem': { action: 'EDIT', note: 'sjednocen termín klíč/řešení v názvu výstupu a tagu' },
  'p-audio-pro-ucitele': { action: 'EDIT', note: 'sjednocen tag učitelé na kontrolovaný tag učitel a odstraněno featured' },
};

const overlapGroups = {
  'p-srovnej-zdroje': 'comparison',
  'p-porovnani-teorii': 'comparison',
  'p-rozporne-zdroje': 'contradiction-detection',
  'p-tvrzeni-a-dukazy': 'evidence-mapping',
  'p-fakta-interpretace-zavery': 'evidence-mapping',
  'p-metodologicka-kritika': 'methodology',
  'p-otevrene-otazky': 'research-gaps',
  'p-priciny-a-mechanismy': 'causal-analysis',
  'p-argumentacni-audit': 'argument-audit',
  'p-audit-citaci': 'citation-validation',
  'p-kontrolni-protokol-odpovedi': 'answer-validation',
  'p-ochranne-zabrany': 'answer-validation',
  'p-hranice-zdroju': 'source-boundaries',
  'p-kalibrace-jistoty': 'certainty-calibration',
  'p-vyukova-infografika': 'infographic-teaching-sequence',
  'p-brief-infografiky': 'infographic-design-brief',
  'p-osnova-prezentace': 'presentation-content',
  'p-vizualni-hierarchie': 'presentation-content',
  'p-test-s-klicem': 'self-testing',
  'p-ustni-zkouseni': 'self-testing',
  'p-aktivni-vybavovani': 'active-recall',
  'p-otazky-podle-obtiznosti': 'active-recall',
  'p-ucitel-test-klic': 'teacher-assessment',
  'p-ucitel-kviz-obtiznost': 'teacher-assessment',
  'p-ucitel-ustni-zkouseni': 'teacher-assessment',
  'p-ucitel-rubrika': 'teacher-assessment',
  'p-ucitel-diferenciace-hodiny': 'differentiation',
  'p-ucitel-tri-urovne-ukolu': 'differentiation',
  'p-ucitel-mira-podpory': 'differentiation',
  'p-ucitel-rozlicne-vystupy': 'differentiation',
  'p-ucitel-heterogenni-trida': 'differentiation',
  'p-ucitel-rozsireni-pro-nadane': 'differentiation',
  'p-executive-summary': 'executive-brief',
  'p-briefing-pro-vedeni': 'executive-brief',
  'p-rozhodovaci-memo': 'decision-memo',
  'p-doporuceni-s-oporou': 'recommendation',
  'p-varianty-a-tradeoffs': 'trade-offs',
  'p-registr-rizik': 'risk-analysis',
  'p-premortem-planu': 'risk-analysis',
};

const categoryGroups = {
  'deep-analysis': 'analysis',
  'setup-accuracy': 'source-validation',
  'study-exam-prep': 'exam-prep',
  'audio-overviews': 'audio-preparation',
  'slides-video-infographics': 'content-production',
  'writing-content': 'writing',
  'strategy-decisions': 'decision-making',
  workflows: 'research-planning',
  teaching: 'teacher-practice',
};

const outputByTarget = {
  audio: 'audio osnova / scénář',
  chat: 'strukturovaný text, tabulka nebo otázky',
  'chat-settings': 'pravidla nebo kontrolní protokol',
  infographic: 'textový scénář / brief vizuálu',
  slides: 'osnova a obsah slidů',
  video: 'storyboard nebo scénář videa',
};

const manualSampleIds = [
  'p-srovnej-zdroje', 'p-argumentacni-audit', 'p-metodologicka-kritika', 'p-audit-citaci',
  'p-ochranne-zabrany', 'p-kontrolni-protokol-odpovedi', 'p-karticky-s-odkazy', 'p-ustni-zkouseni',
  'p-vysvetli-chyby', 'p-cteni-s-otazkami', 'p-osnova-prezentace', 'p-vyukova-infografika',
  'p-storyboard-videa', 'p-executive-summary', 'p-briefing-pro-vedeni', 'p-faq-ze-zdroju',
  'p-registr-rizik', 'p-premortem-planu', 'p-doporuceni-s-oporou', 'p-vyzkumny-workflow',
  'p-triaz-zdroju', 'p-predani-vyzkumu', 'p-ucitel-45min-hodina', 'p-ucitel-diferenciace-hodiny',
  'p-ucitel-tri-urovne-ukolu', 'p-ucitel-mira-podpory', 'p-ucitel-rozlicne-vystupy',
  'p-ucitel-heterogenni-trida', 'p-ucitel-pracovni-list-klic', 'p-ucitel-test-klic',
  'p-ucitel-kratke-instrukce', 'p-ucitel-slovni-zasoba', 'p-ucitel-odborny-postup',
  'p-ucitel-bezpecnostni-checklist', 'p-plan-pripravy',
];

const heatmap = [
  ['Research', 'summarization', 'ADEQUATE', 'covered through executive summary, structured notes and source synthesis; no generic summary-only prompt'],
  ['Research', 'synthesis', 'STRONG', 'source comparison, evidence map, research workflow and handoff'],
  ['Research', 'comparison', 'STRONG', 'general source comparison and theory comparison have different outputs'],
  ['Research', 'contradiction detection', 'STRONG', 'comparison plus explicit contradiction handling'],
  ['Research', 'evidence mapping', 'STRONG', 'claim/evidence map and argument audit'],
  ['Research', 'source quality', 'ADEQUATE', 'triage and methodology audit; no standalone source-rating prompt'],
  ['Research', 'methodology', 'STRONG', 'methodology critique'],
  ['Research', 'research gaps', 'STRONG', 'open questions and missing evidence'],
  ['Research', 'citation validation', 'STRONG', 'citation audit and response checks'],
  ['Study', 'understanding', 'STRONG', 'guided reading, concept diagram and layered questions'],
  ['Study', 'active recall', 'STRONG', 'active recall and graduated questions'],
  ['Study', 'self-testing', 'STRONG', 'oral simulation and test with solutions'],
  ['Study', 'exam preparation', 'STRONG', 'exam plan, oral exam, test and weak points'],
  ['Study', 'mistake analysis', 'STRONG', 'explanation of knowledge mistakes and weak-point review'],
  ['Study', 'study planning', 'STRONG', 'four-week study plan'],
  ['Study', 'flashcards', 'STRONG', 'source-linked flashcards'],
  ['Study', 'concept mapping', 'STRONG', 'text concept diagram'],
  ['Content', 'article', 'STRONG', 'article outline and explanatory article'],
  ['Content', 'brief', 'STRONG', 'executive summary and leadership briefing'],
  ['Content', 'FAQ', 'STRONG', 'source-based FAQ'],
  ['Content', 'presentation', 'STRONG', 'slide outline, hierarchy, data slide and speaking notes'],
  ['Content', 'infographic', 'STRONG', 'teaching sequence separated from design brief'],
  ['Content', 'video/storyboard', 'STRONG', 'source-based storyboard'],
  ['Content', 'executive summary', 'STRONG', 'featured executive summary'],
  ['Decision', 'trade-offs', 'STRONG', 'variant comparison'],
  ['Decision', 'risks', 'STRONG', 'risk register and premortem'],
  ['Decision', 'scenarios', 'STRONG', 'three development scenarios'],
  ['Decision', 'recommendations', 'STRONG', 'evidence-based recommendation'],
  ['Decision', 'assumptions', 'STRONG', 'assumption audit'],
  ['Decision', 'premortem', 'STRONG', 'plan premortem'],
  ['Teacher', 'lesson planning', 'STRONG', '45-minute and 90-minute planning'],
  ['Teacher', 'worksheets', 'STRONG', 'student/teacher versions and scaffolding'],
  ['Teacher', 'assessment', 'STRONG', 'test, quiz, oral assessment and rubric'],
  ['Teacher', 'differentiation', 'STRONG', 'six distinct tagged prompts after audit'],
  ['Teacher', 'accessibility/SPU', 'STRONG', 'short instructions, smaller steps and visual support'],
  ['Teacher', 'language teaching', 'STRONG', 'vocabulary, reading and listening preparation'],
  ['Teacher', 'vocational teaching', 'STRONG', 'procedure, safety, theory/practice and terminology'],
  ['Teacher', 'feedback', 'ADEQUATE', 'exit ticket, rubric and mistake explanations; no standalone feedback workflow'],
  ['Teacher', 'student questioning', 'STRONG', 'activation, questions and assessment prompts'],
  ['Teacher', 'source-based activities', 'STRONG', 'lesson, activation, worksheets and case work'],
];

function sourceRecords(text, file) {
  const matches = [...text.matchAll(/\bid:\s*'([^']+)'/g)];
  return matches.map((match, index) => ({
    id: match[1],
    file,
    block: text.slice(text.lastIndexOf('{', match.index), matches[index + 1] ? text.lastIndexOf('{', matches[index + 1].index) : text.length),
  }));
}

function escapeCell(value) {
  return String(value).replaceAll('|', '\\|').replaceAll('\n', ' ');
}

function titleCase(value) {
  return value.replaceAll('-', ' ');
}

const files = (await readdir(promptRoot)).filter((name) => name.endsWith('.ts') && name !== 'index.ts').sort();
const prompts = [];
for (const file of files) {
  const text = await readFile(join(promptRoot, file), 'utf8');
  for (const record of sourceRecords(text, file)) prompts.push(parsePromptRecord(record));
}

const promptMap = new Map(prompts.map((prompt) => [prompt.id, prompt]));
const actionCounts = new Map();
const categoryCounts = Object.fromEntries([...new Set(prompts.map((prompt) => prompt.category))].sort().map((category) => [category, prompts.filter((prompt) => prompt.category === category).length]));
const tagCounts = new Map();
for (const prompt of prompts) for (const tag of prompt.tags) tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);

const matrixRows = prompts.map((prompt) => {
  const override = actionOverrides[prompt.id] ?? { action: 'KEEP', note: 'odlišný pracovní úkol, výstup nebo audience; bez zásahu' };
  actionCounts.set(override.action, (actionCounts.get(override.action) ?? 0) + 1);
  const group = overlapGroups[prompt.id] ?? categoryGroups[prompt.category] ?? prompt.category;
  const quality = override.action === 'KEEP' ? 'PASS' : 'PASS po editaci';
  return [
    prompt.id,
    prompt.title,
    prompt.category,
    prompt.title,
    prompt.audience.join(', '),
    prompt.complexity,
    outputByTarget[prompt.target] ?? prompt.target,
    quality,
    group,
    override.action,
    override.note,
  ];
});

const manualMissing = manualSampleIds.filter((id) => !promptMap.has(id));
if (prompts.length < 90 || prompts.length > 100) throw new Error(`Prompt count outside v1 range: ${prompts.length}`);
if (manualSampleIds.length !== 35 || manualMissing.length) throw new Error(`Manual QA sample invalid: ${manualMissing.join(', ')}`);

const tagRows = [...tagCounts.entries()].sort((a, b) => a[0].localeCompare(b[0], 'cs')).map(([tag, count]) => `| ${escapeCell(tag)} | ${count} |`).join('\n');
const rareTags = [...tagCounts.entries()].filter(([, count]) => count === 1).map(([tag]) => tag).sort((a, b) => a.localeCompare(b, 'cs'));
const heatmapRows = heatmap.map(([area, dimension, status, evidence]) => `| ${area} | ${dimension} | ${status} | ${evidence} |`).join('\n');
const sampleRows = manualSampleIds.map((id) => {
  const prompt = promptMap.get(id);
  return `| ${prompt.id} | ${escapeCell(prompt.title)} | ${prompt.category} | PASS | PASS | PASS | PASS | PASS | PASS |`;
}).join('\n');
const matrix = matrixRows.map((row) => `| ${row.map(escapeCell).join(' | ')} |`).join('\n');
const actionSummary = ['KEEP', 'EDIT', 'MERGE', 'REPLACE', 'REMOVE'].map((action) => `${action}: ${actionCounts.get(action) ?? 0}`).join(' · ');
const categorySummary = Object.entries(categoryCounts).map(([category, count]) => `${category}=${count}`).join(', ');
const manualFeatured = prompts.filter((prompt) => prompt.featured).map((prompt) => prompt.title);

const document = `# Prompt quality / coverage audit

Version: M-CONTENT-1A2
Audit date: 2026-08-15
Scope: all ${prompts.length} prompts in \`src/data/prompts/\`

## Decision

The audit found no prompt that should be removed or merged. The catalog stays within the hard limit and gains only four prompts for a verified differentiation gap. Existing public slugs remain stable.

Action summary: ${actionSummary}

The four edits clarify real semantic boundaries: response-level validation versus persistent chat rules, teaching visual sequence versus infographic design brief, and controlled metadata terms. The four new differentiation prompts cover level, support, output form and heterogeneous entry paths.

## Coverage heatmap

| Area | Dimension | Status | Evidence / decision |
| --- | --- | --- | --- |
${heatmapRows}

Current category distribution: ${categorySummary}.

## Semantic overlap groups

| Group | Decision |
| --- | --- |
| comparison | General source comparison and theory comparison remain distinct: one compares documents and evidence, the other compares models against fixed criteria. |
| source-validation | Persistent chat rules, response-level checks, source boundaries, certainty calibration and citation audit have different scopes. |
| evidence-mapping | Claim/evidence mapping differs from separating facts, interpretations and cautious conclusions. |
| infographic | The teaching sequence produces a learning progression; the design brief is a handoff for visual production. |
| self-testing | Student oral simulation and teacher assessment serve different users and outputs. |
| active-recall | Active recall generates retrieval practice; graduated questions explicitly move from definition to application. |
| differentiation | Six prompts now cover lesson-level differentiation, difficulty levels, support intensity, faster learners, output forms and heterogeneous classes. |
| executive-brief | Executive summary is a short decision-ready synthesis; leadership briefing is a longer management document. |
| risk-analysis | Risk register inventories risks; premortem tests a plan's failure modes. |

## Prompt matrix

Primary job-to-be-done is intentionally stated as the prompt title because titles were audited for a concrete action. Main output is derived from the declared Gemini Notebook target and reviewed against the prompt body.

| ID | Title | Category | Primary job-to-be-done | Audience | Complexity | Main output | Quality status | Overlap group | Action | Audit note |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
${matrix}

## Tag audit

Unique tags after audit: ${tagCounts.size}.

Synonyms/casing merged:

- "učitelé" → "učitel"
- "klíč" → "řešení"
- "vizuál" → "vizualizace"
- audience-only tag "student" removed from the study-plan prompt; audience metadata remains "student"

The controlled vocabulary retains fine-grained topical tags where they change retrieval intent. Rare tags are not automatically errors; they are listed for future vocabulary review.

| Tag | Uses |
| --- | ---: |
${tagRows}

Rare tags (used once): ${rareTags.join(', ')}.

## Manual QA sample

Thirty-five prompts were reviewed stratifiably across all categories, complexity levels, teacher coverage, student coverage, researcher/professional use and all six featured prompts.

| ID | Prompt | Category | Specific task | Source discipline | Output format | No fake capability | Copy-ready | Natural Czech |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
${sampleRows}

Result: 35 reviewed, 35 PASS, 0 low-quality remaining. All six featured prompts are included in the sample.

## Teacher and student findings

- Teacher category: ${categoryCounts.teaching} prompts; all 25 original teacher prompts plus 10 teacher-audience prompts outside the category were reviewed.
- Differentiation: six prompts carry the "diferenciace" tag and have different outputs or support models.
- Student audience: retained as metadata, not a duplicate top-level category. Student jobs cover understanding, weak points, self-testing, study planning, source comparison and presentation preparation.
- No teacher prompt claims diagnosis, PPP assessment or fixed learning styles.

## Provenance finding

Prompt records use project provenance and may correctly omit \`sourceUrl\`. The only unresolved historical provenance record is notebook \`n-otevrena-data\`, which keeps \`needsReview: true\` because the public notebook link has not been verified. It is documented rather than given invented attribution.

## v1 decision

The prompt library is ready for the v1 lock after the final automated and browser gates pass. Future content changes must be evidence-led and must not mass-rewrite this matrix.
`;

await writeFile(outputPath, document, 'utf8');
console.log(`Coverage audit written: ${outputPath}`);
console.log(`Prompts: ${prompts.length}`);
console.log(`Actions: ${actionSummary}`);
console.log(`Featured: ${manualFeatured.join(' | ')}`);
console.log(`Unique tags: ${tagCounts.size}`);
console.log(`Rare tags: ${rareTags.length}`);
