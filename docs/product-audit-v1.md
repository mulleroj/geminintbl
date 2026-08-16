# Notebook Hub CZ — M-PRODUCT-1 audit v1

Datum auditu: 2026-08-16  
Větev: `feat/notebook-hub-cz`  
Auditovaný HEAD: `5ac9280cf86d07cdedc5e0cc4b44aae0a2a7e1ca`  
Auditovaný branch deploy: `https://feat-notebook-hub-cz--geminintbl.netlify.app/`  
Produkční web: `https://geminintbl.netlify.app/`

## 1. Rozsah a safety gate

Audit pokryl veřejný produkt Notebook Hub CZ: informační architekturu, homepage, katalogy, detailové stránky, vyhledávání, filtry, karty a CTA, interní i externí odkazy, lokální oblíbené, komunitní formulář, experimentální route, interní generátory, teacher hub, průvodce, responzivitu, základní přístupnost, SEO, trust/copyright copy, výkon, console signály, prázdné stavy a 404.

Safety gate před auditem:

- pracovní strom byl čistý;
- aktivní větev byla `feat/notebook-hub-cz`;
- audit probíhal nad aktuálním branch deployem;
- nebyla měněna data, Supabase, RLS, účty ani produkční nastavení;
- nebyl proveden merge do `main` ani force-push.

## 2. Inventář a informační architektura

| Oblast | Stav | Evidence |
| --- | --- | --- |
| Prompty | PASS | 95 položek |
| Zdroje | PASS | 175 položek |
| Nástroje | PASS | 28 položek |
| Veřejné notebooky | PASS | 15 položek |
| Teacher workflows | PASS | 13 postupů |
| Interní generátory | PASS | 3 generátory |
| Průvodci | PASS | 32 průvodců |
| Homepage pořadí | PASS | hero → statistiky → teacher teaser → prompty → kategorie → zdroje → nástroje/notebooky → průvodci → příspěvky |

Hlavní navigace pokrývá Přehled, Prompty, Zdroje, Nástroje, Notebooky, Průvodci, Oblíbené a Pro učitele. Route matrix ověřila 15 hlavních tras v šesti požadovaných rozměrech; všechny měly H1, `<main id="main-content">` a žádné zjištěné horizontální přetečení.

## 3. Uživatelské cesty A–J

| Cesta | Výsledek | Poznámka |
| --- | --- | --- |
| A — nový návštěvník | PASS | Homepage rychle vysvětluje účel, ukazuje počty a nabízí jasné vstupy do katalogů. |
| B — učitel | P1 | Teacher teaser vede na `/pro-ucitele#workflow-…`, ale SPA navigace po kliknutí zůstane nahoře stránky. Detail viz P1-1. |
| C — teacher vs. prompt vs. guide | PASS | Teacher workflow odkazuje na existující prompty a průvodce zachovávají roli postupu, nikoli hotového výsledku. |
| D — SPU/ADHD | PASS | `SPU` vrací 3 prompty a 1 barrier-first průvodce; copy nepředepisuje diagnózu ani pevný učební styl. |
| E — zdroj | PASS | Vyhledávání `MŠMT`, import tipy, původ a externí odkazy jsou viditelné. |
| F — prezentace | PASS | Formulář, výstup promptu, copy, reset a transparentní rozlišení prompt vs. hotová prezentace. |
| G — audio/video | PASS | Formulář generuje prompt a explicitně říká, že nevyrábí hotové médium. |
| H — výzkumník | PASS | Prompty, zdroje, průvodci, citace a cross-linky tvoří navazující workflow. |
| I — oblíbené | PASS | UI uložilo a zobrazilo prompt, zdroj, nástroj, notebook i průvodce; stav je bez účtu a lokální v prohlížeči. |
| J — příspěvek | PASS s poznámkou | Formulář validuje a po odeslání jen lokálně potvrdí návrh; stránka otevřeně uvádí, že backend zatím není připojen. |

## 4. Katalogy, vyhledávání a interakce

- Vyhledávání na `/prompty`, `/zdroje` a `/pruvodci` zachovává diakritiku, zapisuje `q` do URL a vrací relevantní výsledky.
- Ověřená hledání: `citace` v promptech = 10 položek, `MŠMT` ve zdrojích = 6 položek, `citace` v průvodcích = 5 položek, `SPU` v promptech = 3 položky.
- Neexistující dotaz zobrazil český empty state s návrhy a odkazem zpět na celý katalog.
- Ověřeno 190 unikátních interních odkazů z hlavních katalogů; nebyly nalezeny podezřelé neznámé interní route.
- Ověřené externí odkazy mají `target="_blank"` a bezpečné `rel`.
- Detail promptu poskytuje copy promptu a toast `Zkopírováno ✓`; detail průvodce má TOC, externí reference a related obsah.

## 5. Responsive a accessibility sanity

Hlavní trasy byly projety v rozměrech 390×844, 480×900, 768×1024, 1280×800, 1440×900 a 1920×1080. V automatizovaném DOM/reflow průchodu nebylo nalezeno horizontální přetečení, chybějící H1 ani chybějící hlavní landmark.

Ověřeno:

- skip link míří na `#main-content`;
- viditelné ovládací prvky měly přístupný název;
- menu má stavové ARIA atributy;
- live/status regiony existují pro toast, generátory, experimentální nástroj a formulář;
- karty a formuláře zůstávají použitelné i na úzké šířce.

Poznámka P2: katalogové karty používají H3 přímo pod H1 bez mezilehlého H2; `/nastroje` má blok generátorů s H2 před hlavním H1. Není to blokující funkční závada, ale je to kandidát dalšího accessibility passu.

## 6. SEO, trust, copyright a výkon

| Oblast | Stav | Evidence |
| --- | --- | --- |
| `lang`, viewport, title, description | PASS | `lang="cs"`, dynamické title/description pro route |
| canonical a JSON-LD | PASS s poznámkou | Runtime metadata používají aktuální origin; detail průvodce má Article metadata a datum ověření. |
| sitemap/robots | P1 | `<loc>` i `Sitemap:` byly relativní, ačkoli produkční doména je známá. |
| sociální metadata | P2 | Chybí OG image a samostatné `twitter:title`/`twitter:description`. |
| trust/copyright | PASS | Původ, licence, citace, ověření a práce s citlivými daty jsou v copy přítomné. |
| vodoznak | PASS s poznámkou | Route je označena `EXPERIMENTAL` a výslovně nepředstírá zpracování/upload. |
| výkon | PASS | Build po code splitu: main 253.95 kB / gzip 66.93 kB, guide chunk 290.21 kB / gzip 92.06 kB, CSS 39.58 kB / gzip 8.36 kB. |
| source-link gate | PASS | 175 zdrojů zkontrolováno; 0 broken, 0 timeout, 175 manual review. |

## 7. Findings a rozhodnutí

### P0 — 0

Nebyla nalezena P0 závada.

### P1 — 2

#### P1-1 — hash odkazy z homepage neprovedou scroll na workflow

Reprodukce na branch deployu v 390 px:

1. Otevřít homepage.
2. Kliknout na kartu `Příprava 45min hodiny` v teacher teaseru.
3. URL se změní na `/pro-ucitele#workflow-wf-lesson-45`.
4. `scrollY` zůstane `0`, zatímco cílový workflow měl `targetTop ≈ 1204 px`.

Dopad: hlavní učitelská CTA slibuje konkrétní workflow, ale uživatele nechá na začátku dlouhé stránky. Oprava: po SPA renderu respektovat hash a přesunout fokus/scroll na existující cílový element; bez změny struktury obsahu.

#### P1-2 — sitemap a robots používají relativní URL

`public/sitemap.xml` obsahoval 45 relativních `<loc>` a `public/robots.txt` relativní `Sitemap: /sitemap.xml`. Nyní je známá produkční doména `https://geminintbl.netlify.app/`, takže relativní zápis není vhodný pro ostré SEO nasazení. Oprava: přepsat sitemap URL a Sitemap directive na absolutní produkční URL.

### P2 — 3

- sjednotit heading hierarchy katalogů;
- doplnit OG image a Twitter title/description;
- zvážit trvalejší server-rendered/static metadata pro sdílené detailové route.

P2 změny nebyly v tomto milestone provedeny.

### P3 / poznámky — 2

- komunitní submit je lokální potvrzení bez backendu; stav je transparentně popsán;
- odstranění vodoznaku je pouze experimentální placeholder; stav je transparentně popsán a nic se nenahrává.

## 8. Scope control

Audit ani plánovaná oprava nemění katalogové počty, textovou knihovnu, generátory jako celek, framework, Supabase/RLS, API, auth, build architekturu, CSS/assets, branding ani route inventory. Opravy jsou omezené na hash navigaci a SEO URL infrastrukturu.

## 9. Scorecard

| Doména | Výsledek |
| --- | --- |
| IA a homepage | PASS |
| Cesty A–J | PASS s P1-1 před opravou |
| Katalogy, search, filter, empty states | PASS |
| Detailové stránky a cross-linky | PASS |
| Oblíbené/local state | PASS |
| Teacher hub, SPU/ADHD, průvodci | PASS |
| Responsive 390–1920 | PASS |
| Accessibility sanity | PASS s P2 poznámkou |
| SEO | PASS po P1-2; před opravou P1 |
| Trust/copyright/experimentální stavy | PASS s poznámkami |
| Console smoke | PASS — bez warning/error signálů |
| Build/regression gates | PASS — typecheck, lint, 19 testů, build a source-link gate |

## 10. Readiness

Před opravou: **NO-GO**, kvůli P1-1 a P1-2.  
Po implementaci, gates, deployi branch preview a opakované browser kontrole: **GO očekáváno**, pokud obě P1 zůstanou bez reprodukce a všechny testy zůstanou zelené.

Další milestone po tomto auditu: P2 accessibility/SEO polish, zejména heading hierarchy a sociální metadata. Není součástí tohoto bezpečnostně omezeného auditního fixu.
