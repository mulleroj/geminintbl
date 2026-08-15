# Content inventory

Stav po etapě M-CONTENT-1A. Číselný výpis je ověřován skriptem `npm run content:audit`.

```text
Prompts: 91
Sources: 10
Tools: 8
Notebooks: 6
Guides: 5
Prompt categories: 9
Guide categories: 6
```

## Prompty podle kategorie

```text
audio-overviews: 6
deep-analysis: 10
setup-accuracy: 8
slides-video-infographics: 7
strategy-decisions: 8
study-exam-prep: 10
teaching: 25
workflows: 9
writing-content: 8
```

## Prompty podle targetu

```text
audio: 5
chat: 75
chat-settings: 4
infographic: 2
slides: 4
video: 1
```

## Audience a další metadata

```text
teacher: 41
student: 28
researcher: 29
professional: 26
general: 23

quick: 6
standard: 45
advanced: 40
featured: 6
needsReview (prompts): 0
Original Notebook Hub CZ: 91
External attributed prompts: 0
```

`audience` je vícehodnotové metadata, proto se jeho součet nerovná celkovému počtu promptů. `Missing sourceUrl: 109` v celkovém auditu je očekávané pro originální promptový obsah a další lokální katalogové záznamy; nové prompty mají dohledatelnou projektovou provenance přes `projectProvenance`.

Sources, Tools, Notebooks a Guides se v této etapě obsahově nerozšiřovaly. Reference audit sloužil pouze jako benchmark rozsahu a typů použití, nikoli jako zdroj pro překlad nebo hromadné převzetí promptů.
