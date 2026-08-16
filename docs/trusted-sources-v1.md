# Trusted Sources v1

Trusted Sources v1 je katalog 175 zdrojů pro český Notebook Hub CZ. Nejde o kopii referenčního webu: každý záznam má vlastní identitu, popis, URL, původní instituci a tip pro import do Gemini Notebook.

```text
Version: 1.0
Total sources: 175
Czech/CZ-relevant: 118 (67 %)
International region labels: 61 (EU 29, GLOBAL 32; 4 records also carry CZ)
Unique non-CZ sources: 57
Categories: 10
Featured: 10
Verified date: 2026-08-15
```

## Co je ověřeno

- 175 zdrojů v rozsahu 150–200, bez duplicit ID a bez duplicit normalizovaných URL.
- 10 centrálně registrovaných kategorií; 119 zdrojů má regionální vazbu na ČR (68 %).
- Každý záznam má `sourceType`, `notebookSuitability`, `verifiedAt`, `language`, `region`, `sourceLabel` a neprázdný `importTip`.
- 10 featured zdrojů je řízeno explicitním allowlistem, nikoli náhodným příznakem v datech.
- Prompt Library zůstává beze změny na přesně 95 promptech; Tools 8, Notebooks 6 a Guides 5.

## Kategorie

| Kategorie | Počet |
| --- | ---: |
| Školství | 22 |
| Legislativa | 15 |
| Statistiky a data | 22 |
| Ekonomika | 15 |
| Věda a výzkum | 25 |
| Historie a archivy | 16 |
| Český jazyk a literatura | 13 |
| Evropská unie | 17 |
| Mezinárodní zdroje | 21 |
| Žurnalistika a ověřování | 9 |

## Jak katalog používat

`notebookSuitability` popisuje vhodnost konkrétní stránky, dokumentu nebo datasetu pro import, ne pravdivost každého tvrzení. `importTip` říká, jak zachovat období, autora, metodiku, licenci nebo jiný kontext. U rozcestníků a katalogů je vhodné otevřít konkrétní záznam a importovat jej spolu s metadaty.

Příklady primárních českých vstupů: [Česká školní inspekce](https://www.csicr.cz/cz/), [e-Sbírka](https://e-sbirka.gov.cz/), [ČSÚ – otevřená data](https://csu.gov.cz/otevrena_data) a [Národní katalog otevřených dat](https://data.gov.cz/). Pro sociálně-ekonomická témata jsou v katalogu mimo jiné [statistiky MPSV](https://mpsv.gov.cz/statistiky-1), pro historické prameny [Kramerius Národního archivu](https://kramerius.nacr.cz/about/) a pro evropská odborná témata [EFSA](https://www.efsa.europa.eu/en).

## Kontrola odkazů

`npm run sources:quality` ověřuje statický datový kontrakt. `npm run sources:check` provádí živý HEAD/GET audit s následováním přesměrování a zapisuje `docs/source-link-check.md`.

Výsledek živé kontroly je klasifikován jako `VALID`, `REDIRECT`, `BOT_BLOCKED`, `BROKEN`, `TIMEOUT` nebo `MANUAL_REVIEW`. `BROKEN` a `TIMEOUT` blokují vydání; `BOT_BLOCKED` a `MANUAL_REVIEW` zůstávají transparentně uvedené, protože omezený přístup sám o sobě nedokazuje neexistenci zdroje. Katalog také není zárukou aktuálnosti právního výkladu, odborného závěru ani licence pro další použití.

Detailní inventář a metriky jsou v [auditním reportu](source-quality-audit.md), živé výsledky v [reportu kontroly odkazů](source-link-check.md).
