# Knihovna promptů

Notebook Hub CZ staví na původních českých promptech pro práci s vlastními zdroji v NotebookLM. Referenční web slouží pouze k porovnání typů použití a šíře katalogu; jeho prompty se nepřekládají ani nepřebírají.

## Stav po M-CONTENT-1A2

- 95 promptů v 9 kategoriích.
- 6 featured promptů s vyváženým mixem analýzy, přesnosti, studia, učitelů, psaní a rozhodování.
- 6 odlišných promptů s tagem `diferenciace`.
- 144 tagů v kontrolovaném, jemně tematickém slovníku; synonymní varianty byly sjednoceny.
- 95 promptů má projektovou provenance Notebook Hub CZ; žádný prompt není externě převzatý.
- Prompt Library v1 je obsahově stabilní; další změny musí být odůvodněné mezerou nebo opravou.

## Kvalitativní standard

Každý prompt řeší konkrétní pracovní úkol, má jasný výstup, je použitelný bez rozsáhlého přepisování a pracuje s přiloženými zdroji. Kde je to relevantní, vyžaduje citaci, označení rozporu, nejistoty nebo chybějící opory. Audit kontroluje titul, popis, prompt body, target, complexity, audience, tagy, duplicity, placeholdery a provenance.

Tři úrovně délky jsou `quick`, `standard` a `advanced`:

- `quick`: rychlý praktický zásah,
- `standard`: běžný strukturovaný výstup,
- `advanced`: náročná analýza, hodnocení nebo workflow.

## Taxonomie a pokrytí

| Kategorie | Počet | Hlavní pracovní úkoly |
| --- | ---: | --- |
| Hloubková analýza | 10 | syntéza, srovnání, rozpory, důkazy, metodologie, mezery |
| Nastavení a přesnost | 8 | hranice zdrojů, citace, jistota, kontrola odpovědi |
| Studium a příprava | 10 | aktivní vybavování, zkoušení, chyby, plán, kartičky |
| Audio přehledy | 6 | podklady, diskuse, opakování, kontrola audio výstupu |
| Prezentace, video a infografiky | 7 | slidy, storyboard, vizualizace, mluvní poznámky |
| Psaní a tvorba obsahu | 8 | článek, briefing, FAQ, vysvětlení, newsletter |
| Strategie a rozhodování | 8 | varianty, rizika, scénáře, předpoklady, doporučení |
| Workflow | 9 | triáž, velký balík, onboarding, schůzka, předání |
| Pro učitele | 29 | hodiny, pracovní listy, hodnocení, diferenciace, jazyky, odborná výuka |

Studenti nejsou samostatná top-level kategorie. Jsou vedeni v `audience` a podle potřeby v `educationLevel`, aby nevznikaly duplicitní studentské a učitelské varianty.

## Differentiation coverage

Učitelská vrstva nyní pokrývá:

- tři úrovně obtížnosti při stejném cíli,
- různou míru nápovědy a scaffoldingu,
- rychlejší žáky a rozšiřující úkol,
- různé formy stejného výstupu,
- heterogenní třídu s více vstupními cestami,
- diferenciaci celé hodiny.

Prompty pro SPU a podpůrná opatření popisují kratší instrukce, menší kroky a vizuální oporu. Nediagnostikují žáka, nepředstírají posouzení PPP a nepoužívají pevné učební typy.

## Controlled tags

Tagy jsou české, konkrétní a obvykle 2–5 na prompt. Slovník zachovává užitečné jemné rozdíly, ale sjednocuje zjevné varianty:

- `učitelé` → `učitel`,
- `klíč` → `řešení`,
- `vizuál` → `vizualizace`,
- audience-only tag `student` se nepoužívá místo metadata `audience`.

Vzácný tag není automaticky chyba: například `metodologie`, `premortem` nebo `CEFR` označují specifický pracovní záměr. Kompletní seznam a četnosti jsou v `docs/prompt-quality-audit.md`.

## Provenance

Originální obsah používá `...projectProvenance`:

```text
author: Notebook Hub CZ
sourceLabel: Originální obsah projektu
license: CC BY-NC 4.0 — obsah projektu
needsReview: false
```

`sourceUrl` je u originálního interního obsahu legitimně nepoužitelný. U externího záznamu je naopak vyžadován; neověřený záznam zůstává označený `needsReview: true`.

## Featured mix

Homepage používá přesně 6 featured promptů:

1. Srovnej zdroje bez zkratek — analýza.
2. Ochranné zábrany pro chat — přesnost.
3. Kartičky s odkazy na strany — studium.
4. Vytvoř 45min hodinu ze zdrojů — učitel.
5. Executive summary ze zdrojů — psaní.
6. Doporučení s oporou ve zdrojích — rozhodování.

## Pravidla pro budoucí změny

Nový prompt patří do tematického souboru v `src/data/prompts/`. Přidává se jen při prokázané coverage mezeře. Před přidáním se musí porovnat job-to-be-done, výstup, audience, complexity a overlap group. Pokud stačí editace nebo stabilní sloučení, nový záznam nevzniká.

Před publikací spusť:

```text
npm run prompt:coverage
npm run prompt:quality
npm run content:audit
npm run typecheck
npm test
npm run build
```

V1 nesmí být masově přepisována jen kvůli počtu nebo kosmetickým synonymům.
