# Content inventory

Stav po etapě M-CONTENT-1B. Číselný výpis je ověřován skriptem `npm run content:audit`.

```text
Prompts: 95
Sources: 175
Tools: 8
Notebooks: 6
Guides: 5
Prompt categories: 9
Guide categories: 6
```

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
Provenance original internal records: 104
Provenance external with sourceUrl: 1
Provenance external missing sourceUrl: 1
Provenance sourceUrl not applicable: 104
needsReview (whole catalog): 1
```

Jeden historický záznam `n-otevrena-data` zůstává `needsReview: true`, protože veřejný notebook nebyl ověřen. Originální promptová knihovna a interní katalogové záznamy mají legitimně `sourceUrl` nepoužito.

Tools, Notebooks a Guides se v této etapě obsahově nerozšiřovaly. Prompt Library zůstává uzamčená na 95 záznamech. Reference audit sloužil pouze jako benchmark rozsahu a typů použití; Trusted Sources v1 používá vlastní, ověřené záznamy.
