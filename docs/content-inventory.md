# Content inventory

Stav po etapě M-TEACHER-1. Číselný výpis je ověřován skriptem `npm run content:audit`.

```text
Prompts: 95
Sources: 175
Tools: 28
Notebooks: 15
Guides: 5
Prompt categories: 9
Source categories: 10
Guide categories: 6
Tool categories: 8
Notebook categories: 10
Tools by pricing: free=11, freemium=5, paid=0, open source=12
Tools by integration: direct=7, workflow=10, adjacent=11
Tools by source type: official=7, open-source=12, commercial=6, community=3
Tool workflow tips >=80 chars: 28
Featured tools: 10
Notebooks by source type: official=8, education=2, research=0, community=5
Notebooks by access: public=0, google-account=15
Verified notebooks: 15
Featured notebooks: 5
```

Teacher workflows: 13
Internal generators: 3 (`/nastroje/generator-*`)
Prompt library: 95 (locked; no new prompt bodies)

## Trusted Sources v1

```text
Source categories: 10
CZ-region sources: 119 (68 %)
Sources with import tip: 175 (100 %)
Featured sources: 10
Duplicate IDs: none
Duplicate canonical URLs: none
```

Rozdělení zdrojů a metadata jsou v `docs/source-quality-audit.md`; živé výsledky URL jsou v `docs/source-link-check.md`.

## Prompty podle kategorie

```text
audio-overviews: 6
deep-analysis: 10
setup-accuracy: 8
slides-video-infographics: 7
strategy-decisions: 8
study-exam-prep: 10
teaching: 29
workflows: 9
writing-content: 8
```

## Prompty podle targetu

```text
audio: 5
chat: 79
chat-settings: 4
infographic: 2
slides: 4
video: 1
```

## Audience a complexity

```text
teacher: 45
student: 28
researcher: 29
professional: 26
general: 23

quick: 6
standard: 47
advanced: 42
featured: 6
needsReview (prompts): 0
```

Audience je vícehodnotové metadata, proto se jeho součet nerovná celkovému počtu promptů.

## Quality a tagy

```text
Differentiation-tagged prompts: 6
Tag vocabulary: 144
Rare prompt tags: 90
Duplicate IDs: none
Duplicate slugs: none
Duplicate normalized titles: none
Placeholders/TODO: 0
```

Kompletní coverage matrix, overlap groups a manuální vzorek 35 promptů jsou v `docs/prompt-quality-audit.md`.

## Provenance

```text
Original Notebook Hub CZ prompts: 95
External attributed prompts: 0
Provenance original internal records: 100
Provenance external with sourceUrl: 11
Provenance external missing sourceUrl: 4
Provenance sourceUrl not applicable: 100
needsReview (whole catalog): 0
```

Historický záznam `n-otevrena-data` byl z katalogu odstraněn, protože jeho veřejný notebook nebyl dohledatelný. V aktuální sadě notebooků není žádný záznam `needsReview: true`; komunitní odkazy mají transparentně uvedený přístup přes Google účet a datum ručního ověření.

Prompt Library zůstává uzamčená na 95 záznamech a Trusted Sources v1 na 175 záznamech. Nástroje a veřejné notebooky mají vlastní taxonomii, link-check skripty `npm run tools:check` a `npm run notebooks:check` a samostatnou dokumentaci v `docs/tools-v1.md` a `docs/public-notebooks-v1.md`.
