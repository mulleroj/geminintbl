# Study Power Layer v1

Audit and implementation date: 2026-08-16
Route: `/pruvodci#studium`
Status: implemented on `fix/guide-editorial-study-layer`; merge and production release intentionally blocked pending approval.

## Product boundary

The Hub adds a recommendation layer around the native Gemini Notebook workflow. It does not claim to recreate Google UI, does not add catalog records, and does not replace teacher judgment or source verification. Native product facts below are checked against official Google Help pages and carry `verifiedAt: 2026-08-16` in the guide study setup where used.

The current source of truth is Google Help, not an older Hub paragraph. Availability may vary by country, language, age, account edition, administrator policy, device and current rollout.

## Study journey

The collection block uses this six-step loop:

1. Orient: use a Mind Map or a short source-grounded answer to see terms and relationships.
2. Understand: ask Chat for an explanation that can be repeated, with citations.
3. Practice: use Flashcards or Quizzes to retrieve information from memory.
4. Explain: use teach-back to explain the idea without looking at the answer.
5. Find gaps: ask a Socratic question or a gap-check prompt and return to the source.
6. Repeat and verify: retry weak items, open citations, and finish with a self-check.

The Hub recommendation is: sources → mind map → chat → flashcards → quiz → audio/video → final check. Audio and video are alternate review surfaces, not proof and not a replacement for reading.

## Native module audit

| Module | Verified product facts | Hub study recommendation | Official reference |
| --- | --- | --- | --- |
| Mind Map | Mind Maps visually summarize source relationships; branches can be expanded/collapsed, a node can lead to a Chat question, and the map can be downloaded or shared. The current mobile app limitation is called out by Google. | Map first, then ask about one node and verify the answer in the source. | [Generate a Mind Map](https://support.google.com/notebooklm/answer/16212283?hl=en) |
| Flashcards | Generation supports difficulty, amount and a custom prompt. During review, cards can be marked `Got it` or `Missed it`; missed cards can be reviewed or retaken. Edit access is required to generate/delete. | Use short retrieval rounds; after a miss, read the explanation and return to the source. | [Generate flashcards or quizzes](https://support.google.com/gemininotebook/answer/16958963?hl=en-GB) |
| Quizzes | Quiz generation has controls such as difficulty, amount, custom prompt and hints. Generated material is practice, not automatically valid assessment. | Separate practice from grading; a teacher checks the key, ambiguity and fairness. | [Generate flashcards or quizzes](https://support.google.com/gemininotebook/answer/16958963?hl=en-GB) |
| Chat | Chat answers are grounded in selected notebook sources and include citations. Source checkboxes, chat style such as Learning Guide, and response length are current controls described by Google; mobile functionality can differ. | Select only relevant sources and ask for citations, a counter-question and an explicit “not found” when support is missing. | [Use chat in Gemini Notebook](https://support.google.com/notebooklm/answer/16179559?hl=en) |
| Audio Overview | Current formats include Deep Dive, Brief, Critique and Debate. The creator can set language, length and a custom prompt; the longer option is currently English-only, and Interactive mode is English-only. Audio may be inaccurate. | Listen after reading, pause for a self-summary, then check one citation or claim in the source. | [Generate Audio Overviews](https://support.google.com/notebooklm/answer/16212820?hl=en-GB) |
| Video Overview | Current formats include Cinematic, Explainer and Short. Google documents format, language, visual style and custom instructions; Cinematic and Short are currently English-only and 18+, while Czech is in the supported language list for the product. Visual glitches and inaccuracies are possible. | Use Explainer when exact explanation matters; treat Cinematic/Short as orientation and inspect image/text agreement. | [Generate Video Overviews](https://support.google.com/gemininotebook/answer/16454555?hl=en) |
| Infographic | Current controls include output language, detail level, orientation and visual style; Google marks the feature as beta and lists age/edit-access constraints. AI output can be inaccurate. | Use a small set of verified claims, numbers, units and dates; add a text fallback and check scale. | [Generate an infographic](https://support.google.com/notebooklm/answer/16758265?hl=es-419) |
| Slide Deck | Current formats are Detailed Deck and Presenter Slides. Controls include output language, length and custom prompt. Google notes that sources are not taken into account during revisions, so a revision is not a fresh source audit. | Outline first, rehearse aloud, and recheck claims after every exported or revised deck. | [Generate a Slide Deck](https://support.google.com/notebooklm/answer/16757456?hl=en) |
| Output language | Google documents output-language controls and lists more than 80 supported languages for Gemini Notebook; feature-level availability can differ. | Set the output language explicitly and compare a key term with the source language. | [Learn about Gemini Notebook](https://support.google.com/gemininotebook/answer/16164461?hl=en) |
| Source selection | Chat and artifacts are source-grounded only within the selected notebook context; selecting fewer relevant sources narrows the evidence path. | Use a small, intentional source set for each question and record what was excluded. | [Use chat in Gemini Notebook](https://support.google.com/notebooklm/answer/16179559?hl=en) |
| Custom prompt reuse | Audio, Video, Infographic and Slide Deck surfaces expose custom prompt/instruction controls or a way to view the prompt; the Hub recommendation is to keep a prompt version with the exported study artifact. | Reuse a prompt only after checking its format, language and source assumptions for the new notebook. | [Generate Audio Overviews](https://support.google.com/notebooklm/answer/16212820?hl=en-GB), [Generate Video Overviews](https://support.google.com/gemininotebook/answer/16454555?hl=en) |
| Account and access | Google says a signed-in Google account is needed, administrators may control access, and work/school availability depends on the account edition and policy. Age and country restrictions also apply. | Always offer a text fallback and never make a class or study plan depend on one optional artifact. | [Learn about Gemini Notebook](https://support.google.com/gemininotebook/answer/16164461?hl=en) |

## Chat study prompts

These are Hub recommendations, not new prompt catalog records:

| Mode | Prompt pattern |
| --- | --- |
| Explain | „Vysvětli pojem ve třech krocích, přidej citace a na konci polož jednu otázku na přenos.“ |
| Socratic | „Veď mě otázkami od zdroje k závěru. Odpověď neprozrazuj, dokud nezkusím vlastní vysvětlení.“ |
| Teach-back | „Požádej mě, abych téma vysvětlil vlastními slovy, a označ jednu mezeru, kterou mám doplnit ze zdroje.“ |
| Compare | „Porovnej dvě vysvětlení podle definice, důkazu, podmínky a místa, kde se rozcházejí.“ |
| Gap check | „Najdi tvrzení, které neumím doložit citací, a polož mi k němu jednu přesnou kontrolní otázku.“ |
| Examiner | „Polož mi pět otázek od pojmu k aplikaci. Po každé odpovědi uveď, co je správně a co mám ověřit.“ |

## Time-boxed recipes

| Situace | Recept |
| --- | --- |
| Rychlá revize, 15 min | Mind Map → tři Chat otázky → pět kartiček → jedna věta bez nápovědy. |
| Hluboké porozumění, 45 min | Vybrané zdroje → vysvětlení → porovnání → teach-back → kontrola citací. |
| Před testem | Kvíz → označit Missed it → návrat ke zdroji → nový pokus pouze ze slabých míst. |
| Cizí jazyk | Originál → glosář → otázky v cílovém jazyce → vlastní parafráze → odborná revize. |

## Common mistakes card

The collection exposes one compact warning card: passive listening, too many sources, flashcards without returning to the source, trust in fluent output, and no own explanation. The cure is always an active step: retrieve, explain, cite, compare or retry.

## Implementation map

- `GuideStudySetup` is optional and attached to 13 existing guide IDs.
- `advancedSections` is optional and rendered in a closed native `<details>` block with the summary `Podrobněji: ...`.
- The guide TOC uses only visible top-level sections and remains sticky on desktop and collapsible on mobile.
- `/pruvodci#studium` is a collection block, not a new guide or catalog record.
- Existing slugs, canonical URLs, sitemap entries, OG/Twitter metadata and Article JSON-LD are unchanged.

## QA checklist for approval

The approval pass must verify `/pruvodci`, `/pruvodci#studium` and at least ten detail routes at 1440×900, 1280×800, 768×1024, 480×900 and 390×844. Check first viewport hierarchy, six/seven-item TOC, closed advanced details, setup block, anchors, related content, no horizontal overflow, keyboard/focus/labels/heading order, mobile TOC behavior and skip-link behavior.

The release candidate also needs typecheck, lint, tests, build, content/audit gates, source/tool/notebook/prompt checks, `git diff --check`, guide chunk comparison and a branch-only Netlify preview. No production deployment, merge, tag or release is authorized by this milestone.
