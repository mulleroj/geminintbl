# M-CONTENT-1D2 — manuální QA průvodců

## Obsahová kontrola

Kontrola proběhla nad šesti featured průvodci a nad rizikovými/požadovanými tématy. U každého záznamu byla ověřena první orientace, konkrétní pracovní příklad, použitelnost v dalším kroku, hranice produktového tvrzení a návaznost na zdroje nebo další průvodce.

| Průvodce | Výběr | Hloubka | Výsledek obsahové kontroly |
| --- | --- | --- | --- |
| `g-co-je-gemini-notebook` | featured, onboarding | standard | PASS — vysvětluje co/ kdy použít a odděluje Notebook od Hubu |
| `g-prvni-notebook` | onboarding | standard | PASS — postup od otázky ke zdrojům, příklad a kontrolní body |
| `g-priprava-hodiny` | featured, učitel | advanced | PASS — časový běh, důkaz učení, záchranná varianta |
| `g-pracovni-list` | učitel | standard | PASS — test listu jako žák i hodnotitel, revize po použití |
| `g-test-a-kviz` | učitel, test | advanced | PASS — scope, blueprint, mix, klíč, scoring, nejednoznačnost a pilot |
| `g-spu` | SPU/ADHD | advanced | PASS — barrier-first, bez diagnóz a bez pevných učebních stylů |
| `g-diferenciace` | featured, učitel | advanced | PASS — zachovává cíl a mění bariéru, ne nálepku žáka |
| `g-audio-overview` | featured, Studio | advanced | PASS — nativní Audio Overview versus Hub prompt/scénář a textový fallback |
| `g-video-overview` | Studio, video | advanced | PASS — scénář/titulky/obraz, dostupnost a kontrola před publikací |
| `g-cinematic-short` | Studio, Cinematic/Short | advanced | PASS — tvůrčí vrstva oddělená od důkazní, nativní versus promptové použití |
| `g-porovnat-zdroje` | featured, výzkum | advanced | PASS — srovnávací matice, rozsah sady, datum a nesrovnatelné řádky |
| `g-rozpory-a-interpretace` | výzkum | advanced | PASS — pozorování, hypotéza, důkaz, reprodukce a otevřená otázka |
| `g-citace-a-overeni` | citace | advanced | PASS — kalibrovaná jistota, auditní stopa a přesah tvrzení |
| `g-overovat-odpovedi` | featured, bezpečnost | advanced | PASS — vzorek podle rizika, vynechané podmínky, schvalovatel |
| `g-copyright` | bezpečnost | advanced | PASS — licence, rozsah kopie, účel, příjemce a veřejný audit |
| `g-osobni-udaje` | bezpečnost | advanced | PASS — minimalizace, modelový versus skutečný případ, export a role |

Výsledek: 16/16 PASS, bez zjištěného obecného filleru. Celkový automatický audit potvrzuje příklad a checklist u 32/32 průvodců, varování nebo typickou chybu u 29/32 a TOC u 32/32.

## Vizuální QA evidence

Lokální preview bylo ověřeno na listingu a deseti detailech v rozměrech 390×844, 480×900, 768×1024, 1280×800 a 1440×900. Výsledek: PASS — detailní stránky bez page overflow, mobilní related grid v jednom sloupci, desktopní grid ve více sloupcích, šířka prose přibližně 65–70ch, všechny TOC kotvy existují a po kliknutí začíná první sekce na 82 px pod mobilním headerem. Filtrační chips na listingu mají očekávaný vlastní horizontální scroll, nikoli overflow stránky. Focus ring byl ověřen přes klávesový Tab na odkazu „Přeskočit na obsah“.

Screenshot spot-check: mobilní listing 390×844 a desktopní detail testu 1440×900. Veřejný branch deploy bude po pushi zopakován stejnou sadou kontrol.
