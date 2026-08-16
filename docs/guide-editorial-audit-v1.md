# Guide editorial audit v1

Audit date: 2026-08-16
Scope: all 32 existing guide detail routes in `mulleroj/geminintbl`.
Inventory gate: no guide, prompt, source, tool, public notebook, teacher workflow or generator record was added.

## Executive finding

The previous renderer concatenated `content`, `depth.sections` and seven `depth-extra*.ts` layers into one visible stream. The result was a median of 15 visible H2 blocks and repeated patterns such as mini-test → practical example → checklist → hand-off. The content itself was valuable; the problem was the default reading path.

The bounded editorial plan keeps the base content and the selected depth path visible, converts small repeated blocks to `subsections`, and moves the remaining depth/extra sections to schema-backed `advancedSections`. The default TOC therefore exposes only the visible main path. Four standard guides have an explicit depth-heading allowlist; short guides keep one small extra block visible so they do not become underpowered.

## Before / after metrics

| Metric | Before audit | After UX layer | Measurement rule |
| --- | ---: | ---: | --- |
| Visible words min | 533 | 476 | Guide main sections only; callout excluded |
| Visible words max | 1181 | 831 | Guide main sections only; closed detail excluded |
| Visible words average | 999 | 670 | 32 guide detail routes |
| Visible words median | 1114 | 710 | 32 guide detail routes |
| Visible main sections min/max | 8 / 17 | 5 / 7 | Top-level visible sections |
| Average visible sections | 14.1 | 6.6 | Same as TOC entries |
| Average TOC entries | 14.1 | 6.6 | Only `#section-*` anchors |
| Guides with advanced details | 0 as a separate layer | 31 / 32 | `<details class="guide-advanced">`, default closed |
| Study setup blocks | 0 | 13 / 32 | Relevant guides only, average 96 words |
| Study collection copy | 0 | 346 words | `/pruvodci#studium` |

Visible length targets are editorial ranges, not hard catalog gates: Quick 450–650, Standard 550–800, Advanced 700–950, with 1000–1100 reserved for exceptional high-risk or high-complexity guides. `readingMinutes` is recalculated from visible guide content at 200 words/minute; advanced details are not counted.

## Performance snapshot

| Asset | Previous RC baseline | After layer build | Note |
| --- | ---: | ---: | --- |
| Guide chunk | ~290 kB / ~92 kB gzip | 306.18 kB / 97.01 kB gzip | Includes `studySetup` and advanced content data |
| Entry JS | not separately recorded in the supplied baseline | 259.87 kB / 68.67 kB gzip | Existing entry bundle plus collection renderer |
| Shared CSS | not separately recorded in the supplied baseline | 45.22 kB / 9.18 kB gzip | Study and advanced-layer styles included |
| Study-specific source | — | 14.0 kB TypeScript | Tree-shared into existing entry/guide chunks; no new request/chunk |

The guide chunk increase is the measured cost of preserving the closed advanced text and 13 structured study setups. The layer does not add a new runtime dependency or a new network request.

## Guide-by-guide audit

Legend: `high / medium / low` describes overlap risk, not quality. “Advanced candidate” means that the guide benefits from a closed deep-dive layer; it does not create a new guide.

| Guide | Current words | Sections | Repeated ideas | Workflow overlap | Related-guide overlap | Study relevance | Recommended visible length | Advanced candidate | Action |
| --- | ---: | ---: | --- | --- | --- | --- | --- | --- | --- |
| Co je Gemini Notebook a kdy ho použít | 991 | 11 | role nástroje, mini-test, checklist, předání | high | medium | high | Standard 550–800 | no | REWRITE + COMPRESS |
| První notebook bez chaosu | 916 | 11 | účel, role zdrojů, druhý průchod, předání | high | medium | high | Standard 550–800 | no | REWRITE + COMPRESS |
| Jak vybírat kvalitní zdroje | 852 | 11 | filtr, příklad, test, checklist | low | high | high | Standard 550–800 | no | COMPRESS |
| Jak přidávat zdroje bez slepých uliček | 659 | 9 | mini-test, praktický příklad, checklist | low | medium | medium | Quick 450–650 | no | KEEP + COMPRESS SECTIONS |
| Co dělat, když zdroj nejde načíst | 852 | 11 | diagnostika, fallback, checklist, protokol | low | medium | medium | Standard 550–800 | no | COMPRESS |
| Citace a ověření odpovědi | 1102 | 14 | tvrzení, audit, jistota, předání | high | high | high | Advanced 700–950 | yes | COMPRESS + MOVE TO ADVANCED |
| Příprava hodiny s Gemini Notebook | 1089 | 13 | cíl, workflow, checklist, reflexe | high | high | high | Advanced 700–950 | yes | COMPRESS + MOVE TO ADVANCED |
| Pracovní list ze zdrojů | 804 | 12 | otázky, příklad, test žák/hodnotitel | high | high | high | Standard 550–800 | no | COMPRESS |
| Test a kvíz ze zdrojů | 1124 | 16 | blueprint, klíč, pilot, předání | high | high | high | Advanced 700–950 | yes | COMPRESS + MOVE TO ADVANCED |
| Úprava materiálu pro různé potřeby žáka | 1149 | 15 | bariéra, kontrola, schválení, předání | high | high | medium | Advanced 700–950 | yes | COMPRESS + MOVE TO ADVANCED |
| Diferenciace ve třídě s Gemini Notebook | 1095 | 15 | společný cíl, varianty, kontrola, reflexe | high | high | medium | Advanced 700–950 | yes | COMPRESS + MOVE TO ADVANCED |
| Gemini Notebook v cizím jazyce | 799 | 13 | jazyk, glosář, kontrola, fallback | high | medium | high | Standard 550–800 | no | COMPRESS + STUDY SETUP |
| Odborné předměty: od terminologie k praxi | 817 | 13 | norma, příklad, workflow, předání | high | medium | medium | Standard 550–800 | no | COMPRESS |
| Audio Overview: kdy ho použít | 1145 | 15 | režim, steering, poslech, archivace | high | high | high | Advanced 700–950 | yes | COMPRESS + MOVE TO ADVANCED |
| Video Overview: formát, jazyk a steering | 1079 | 15 | formát, styl, storyboard, revize | high | high | high | Advanced 700–950 | yes | COMPRESS + MOVE TO ADVANCED |
| Cinematic a Short: kdy je nepoužívat naslepo | 1075 | 17 | zkratka, důkazní hranice, publikum, odmítnutí | high | high | high | Advanced 700–950 | yes | COMPRESS + MOVE TO ADVANCED |
| Infografika: od zdrojů k vizuálnímu zadání | 1065 | 16 | data, styl, proofread, předání | high | high | high | Advanced 700–950 | yes | COMPRESS + MOVE TO ADVANCED |
| Slide deck: podklady, formát a kontrola | 1073 | 16 | osnova, publikum, audit, export | high | high | high | Advanced 700–950 | yes | COMPRESS + MOVE TO ADVANCED |
| Mind Maps: mapa tématu místo hotového závěru | 525 | 8 | orientace, zdroj, cvičení, checklist | high | medium | high | Quick 450–650 | no | KEEP + COMPRESS SECTIONS |
| Flashcards a Quizzes: studijní pomůcka | 784 | 12 | obtížnost, procvičení, chyba, návrat ke zdroji | high | high | high | Standard 550–800 | no | COMPRESS + STUDY SETUP |
| Reports a data tables: strukturovaný výstup | 1075 | 17 | tabulka, audit, export, kritická buňka | high | high | medium | Advanced 700–950 | yes | COMPRESS + MOVE TO ADVANCED |
| Jak porovnat více zdrojů | 1073 | 16 | matice, rozpor, váhy, předání | high | high | medium | Advanced 700–950 | yes | COMPRESS + MOVE TO ADVANCED |
| Jak hledat rozpory a oddělit interpretace | 1074 | 17 | rozpor, příčina, jistota, reprodukce | high | high | medium | Advanced 700–950 | yes | COMPRESS + MOVE TO ADVANCED |
| Evidence map: přehled tvrzení a důkazů | 1083 | 17 | řádek mapy, priorita, archiv, předání | low | high | medium | Advanced 700–950 | yes | COMPRESS + MOVE TO ADVANCED |
| Jak analyzovat dlouhý dokument | 818 | 13 | vrstvy, kapitola, brief, návrat k originálu | low | medium | medium | Standard 550–800 | no | COMPRESS |
| Více dokumentů a research brief | 1076 | 17 | rozsah, rozhodnutí, pilot, předání | high | high | medium | Advanced 700–950 | yes | COMPRESS + MOVE TO ADVANCED |
| Jak ověřovat odpovědi v Gemini Notebook | 1085 | 17 | pět kroků, vzorek, schválení, publikace | high | high | high | Advanced 700–950 | yes | COMPRESS + MOVE TO ADVANCED |
| Citace nejsou automaticky pravda | 1062 | 17 | silný závěr, korekce, jistota, předání | high | high | high | Advanced 700–950 | yes | COMPRESS + MOVE TO ADVANCED |
| Copyright a nahrávání materiálu | 1099 | 17 | licence, rozsah, veřejné sdílení, export | high | high | low | Advanced 700–950 | yes | COMPRESS + MOVE TO ADVANCED |
| Osobní údaje a školní práce | 1084 | 17 | minimalizace, účet, incident, předání | high | high | low | Advanced 700–950 | yes | COMPRESS + MOVE TO ADVANCED |
| Co do Gemini Notebook nenahrávat | 539 | 10 | čtyři otázky, fallback, checklist | high | medium | low | Quick 450–650 | no | KEEP + COMPRESS SECTIONS |
| Exporty a archivace | 831 | 14 | verze, export, README, předání | low | high | medium | Standard 550–800 | no | COMPRESS |

## Editorial decisions

1. Guides remain the primary unit of orientation and method. Teacher workflows remain role-specific classroom execution; prompts remain copyable instructions; generators remain external or integrated execution surfaces.
2. The default path uses six main sections in most guides. The five standard guides with a longer depth layer use an explicit heading allowlist; the unselected depth sections are not deleted, only moved to the advanced layer.
3. `subsections` preserve examples, mini-tests and checklists without making every small block a TOC/H2 destination. A single “Další praktické rozhodnutí” group is used only where a short guide would otherwise fall below its editorial range.
4. `studySetup` is attached only where a reader can turn the guide into an active study step. It contains best-for, recommended settings, study method, prompt tip, common mistake, pro tip, `verifiedAt` and an official reference.
5. No URL, slug, canonical, sitemap, OG/Twitter metadata, Article JSON-LD or catalog count changes are part of this audit.

## Audit limits and follow-up

The before values are from the current rendered detail routes before this milestone; the after values are fresh local-browser route measurements. The after pass confirms DOM structure and text ranges, but final approval still requires the full viewport matrix, keyboard/focus pass, preview deployment and performance comparison listed in `docs/study-power-layer-v1.md`.
