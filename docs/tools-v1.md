# Tools V1

Stav k 2026-08-16. Katalog obsahuje 25 nástrojů, každý s `verifiedAt`, původem, cenovým štítkem, úrovní napojení a praktickým `workflowTip`.

## Taxonomie

| Kategorie | Počet |
| --- | ---: |
| Google ekosystém | 6 |
| Příprava zdrojů | 3 |
| Výzkum a citace | 5 |
| Dokumenty a PDF | 5 |
| Webový výstřižek | 2 |
| Organizace poznámek | 2 |
| Export a publikování | 1 |
| Vizuální výstup | 1 |

`type` je konkrétní role nástroje (např. PDF workflow, bibliografická metadata nebo vizuální výstup). `integrationLevel` používá tři hodnoty:

- `direct` — nástroj je přímou součástí běžného toku kolem notebooku;
- `workflow` — pomáhá s přípravou, kontrolou nebo exportem;
- `adjacent` — je užitečný doplněk, ale není nutný pro základní práci.

## Přehled metadat

- Pricing: 8 free, 5 freemium, 0 paid, 12 open source.
- Integration: 4 direct, 10 workflow, 11 adjacent.
- Source type: 7 official, 12 open-source, 6 commercial, 0 community.
- Workflow tip delší než 80 znaků: 25/25.
- Featured: 7.

Open-source repozitáře byly při zařazení otevřeny a zkontrolovány. Uváděné licence jsou: Markmap MIT, Pandoc GPL-2.0, Mozilla Readability Apache-2.0, MarkDownload Apache-2.0, SingleFile AGPL-3.0, Apache Tika Apache-2.0, OCRmyPDF MPL-2.0, GROBID Apache-2.0, Docling MIT a Trafilatura Apache-2.0. U Zotero a SurfSense katalog odkazuje přímo na repozitář a jeho LICENSE soubor, bez domýšlení názvu licence z neúplného náhledu.

## Ověření a omezení

Odkazy byly ověřeny otevřením oficiálních webů nebo veřejných repozitářů 2026-08-16. Automatická kontrola je dostupná přes `npm run tools:check` a vrací pouze statusy `VALID`, `REDIRECT`, `BOT_BLOCKED`, `AUTH_REQUIRED`, `BROKEN`, `TIMEOUT` a `MANUAL_REVIEW`.

Poslední běh 2026-08-16: `VALID=19`, `REDIRECT=3`, `AUTH_REQUIRED=3`, `BROKEN=0`, `TIMEOUT=0`, `MANUAL_REVIEW=0`. Přesměrování se týká hlavně aktuální domény nástroje; autentizace je očekávaná u účtových Google služeb.

Cena `free` znamená dostupný bezplatný vstup podle oficiální stránky, nikoli garanci bez limitů, účtu nebo změny obchodních podmínek. U komerčních služeb je proto zachována opatrná formulace ve workflow tipech.
