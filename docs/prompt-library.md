# Knihovna promptů

Notebook Hub CZ staví na původních českých promptech pro práci s vlastními zdroji v NotebookLM. Referenční web slouží pouze k porovnání typů použití a šíře katalogu; jeho prompty se nepřekládají ani nepřebírají.

## Výsledek etapy M-CONTENT-1A

- Celkem: 91 promptů.
- 9 kategorií včetně nové kategorie `teaching` / Pro učitele.
- 6 featured promptů pro homepage.
- 91 promptů má původ `Notebook Hub CZ`, žádný nový záznam není označený jako externě převzatý.
- U promptů je `needsReview: false` zděděné z projektové provenance.

## Coverage matrix

| Kategorie | Před etapou | Zjištěná mezera | Po etapě |
| --- | ---: | --- | ---: |
| Hloubková analýza | 2 | důkazy, mezery, příčiny, metodologie | 10 |
| Nastavení a přesnost | 1 | audit citací, nejistota, rozpory, hranice zdrojů | 8 |
| Studium a příprava | 2 | zkoušení, chyby, pojmy, testy, řízené čtení | 10 |
| Audio přehledy | 1 | podklady, diskuse, opakování, analýza výstupu | 6 |
| Prezentace a vizuály | 2 | storyboard, hierarchie, data, mluvní poznámky | 7 |
| Psaní a tvorba obsahu | 1 | briefing, FAQ, newsletter, veřejné vysvětlení | 8 |
| Strategie a rozhodování | 1 | rizika, scénáře, premortem, předpoklady | 8 |
| Workflow | 2 | triáž, velký balík, onboarding, předání | 9 |
| Pro učitele | 0 | nová cílová vrstva | 25 |

Studenti nejsou samostatná top-level kategorie. Jsou vedeni v `audience` a podle potřeby v `educationLevel`, aby katalog nepřerostl v duplicitní taxonomii.

## Kvalitativní standard

Každý prompt musí řešit konkrétní pracovní úkol, být použitelný bez rozsáhlého přepisování a pracovat pouze s přiloženými zdroji. U důležitých tvrzení vyžaduje citaci nebo zdrojovou stopu a při chybějící opoře musí přiznat omezení.

Preferovaná stavba složitějších promptů:

1. Role a kontext.
2. Úkol a rozsah.
3. Postup nebo kritéria.
4. Formát výstupu.
5. Kontrola tvrzení a citací.
6. Omezení a postup při chybějících informacích.

Tři úrovně délky jsou `quick`, `standard` a `advanced`. Quality lint upozorňuje na prompt kratší než 30 slov; běžné nové prompty jsou přibližně mezi 50 a 180 slovy podle úkolu.

## Provenance

Originální obsah používá `...projectProvenance`, které nastavuje:

```text
author: Notebook Hub CZ
sourceLabel: Originální obsah projektu
license: CC BY-NC 4.0 — obsah projektu
needsReview: false
```

Externí text se do katalogu nekopíruje. Pokud někdy vznikne adaptace z externího zdroje, musí mít dohledatelný `sourceUrl`, `sourceLabel`, licenci a `needsReview: true` do doby ruční kontroly.

## Názvy, popisy a tagy

- Titulky jsou krátké a slovesné: například `Najdi otevřené otázky` nebo `Vytvoř 45min hodinu ze zdrojů`.
- Popis odpovídá na otázku, kdy prompt použít; není to reklamní slogan.
- Tagy jsou české, konkrétní a obvykle 2–5 na prompt.
- Kontrolovaný slovník používá například `analýza`, `citace`, `ověřování`, `studium`, `zkouška`, `učitel`, `pracovní list`, `diferenciace`, `psaní`, `prezentace`, `rozhodování` a `workflow`.

## Učitelská vrstva

Kategorie `teaching` pokrývá plánování 45min a 90min hodin, aktivizaci, warm-up, exit ticket, pracovní listy se žákovskou a učitelskou verzí, testy, rubriky, diferenciaci, podporu s kratšími instrukcemi a vizuální strukturou, jazyky a odborné vzdělávání.

Prompty pro SPU a podpůrná opatření popisují praktické úpravy zadání. Nediagnostikují žáka, nepředstírají posouzení PPP a nepoužívají pevné učební typy.

## Příklad kvalitního promptu

`Vytvoř test z přiložených zdrojů pro daný ročník. Zařaď otázky na základní porozumění, vysvětlení vztahu a jednu úlohu na použití. Nejprve ukaž verzi pro žáka, potom oddělený klíč pro učitele s očekávanou odpovědí, body a zdrojem. Zkontroluj, že každou odpověď lze najít nebo odvodit ze zdrojů.`

## Budoucí přidávání

Nový prompt patří do tematického souboru v `src/data/prompts/`, nikoli přímo do `src/data.ts`. Musí mít unikátní `id`, `slug`, titul, popis, prompt, kategorii, tagy, `target`, `complexity`, `audience` a projektovou nebo externí provenance. Před publikací spusť:

```text
npm run prompt:quality
npm run content:audit
npm run typecheck
npm test
npm run build
```

Počet není důvod přidávat generický nebo téměř duplicitní text. Pokud nový prompt neřeší jiný job to be done, nevzniká.
