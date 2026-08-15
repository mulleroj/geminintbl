# Vizuální audit

Audit proběhl nad lokálním Vite preview po úpravě homepage hero a katalogu promptů. Stávající layout, branding, barvy, typografie, detailní stránky a datové počty zůstaly zachované.

## Výsledek

- P0: žádný.
- P1: opraveno dědění třísloupcové mřížky v režimu `Kompaktní`; katalog je nyní skutečný jednosloupcový hustý seznam a na mobilu se řádky skládají pod sebe.
- P2: detailní renderovací funkce v `src/main.ts` zůstávají kandidátem na budoucí rozdělení, ale nejsou blokující pro tuto etapu.

## Homepage a katalog

- Hero při `1440×900`: `402 px`; stats začínají na `504 px` viewportu.
- Hero při `1280×800`: `388 px`; stats začínají na `489 px`, takže landing page není fullscreen blok.
- Zachovány headline, popis, obě CTA, pravá otázková karta, kruhy i status řádek.
- `/prompty`: 12 karet, inline expanze celého promptu, `aria-expanded`, `aria-controls`, selectable `<pre>`, kopírování a detailní odkaz.
- `Karty` / `Kompaktní`: stav se ukládá do localStorage pod `notebook-hub-cz-prompt-view`; filtry a vyhledávání používají stejná data a URL.
- Vyhledávání `učitel`: `/prompty?q=učitel`, 1 výsledek; změna dotazu používá `replaceState`, takže nevytváří historii pro každý znak.
- Kategoriový filtr `study-exam-prep`: 2 výsledky.
- Počty obsahu: Prompts 12, Sources 10, Tools 8, Notebooks 6, Guides 5.
- Stabilní veřejný NotebookLM import URL nebyl nalezen v oficiálně dokumentovaných postupech; falešná importní akce proto nebyla přidána.

## Ověřené rozměry

- `1440×900`, `1280×800`, `1024×768`, `768×1024`, `480×900`, `390×844`.
- Bez horizontálního overflow na homepage i katalogu promptů.
- Mobilní menu: po načtení zavřené, otevření i zavření funkční.
- Přímé načtení knihoven, detailu promptu, detailu průvodce a české experimentální stránky `/nastroje/odstraneni-vodoznaku`.
- Detail promptu zůstal bez katalogové expanze a bez přepínače zobrazení.

## Netlify stav

Nasazení se doplní po lokálních gate testech a ověření stejného existujícího Netlify projektu.
