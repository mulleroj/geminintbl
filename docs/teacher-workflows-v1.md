# Teacher workflows v1

## Rozsah

Sekce `/pro-ucitele` obsahuje 13 praktických receptů. Katalog promptů zůstává uzamčený na 95 položkách; workflow data obsahují pouze `promptIds` a text existujícího promptu se načítá z centrální knihovny.

| Kategorie | Počet | Workflow |
| --- | ---: | --- |
| Příprava hodiny | 2 | 45min hodina; 90min blok |
| Pracovní list | 1 | Pracovní list ze zdrojů |
| Hodnocení | 3 | Test; rychlý kvíz / exit ticket; ústní zkoušení |
| SPU / přístupnost | 1 | Úprava materiálu pro SPU |
| Diferenciace | 1 | Heterogenní třída |
| Cizí jazyk | 1 | Hodina cizího jazyka |
| Odborné vzdělávání | 1 | Odborné vzdělávání |
| Vizuální výstup | 2 | Prezentace; infografika |
| Audio / video | 1 | Audio / video overview |

## Použití

Každý workflow má stejnou receptovou strukturu:

1. co si učitel připraví,
2. co nahraje do Gemini Notebook,
3. odkazy na existující prompty s kopírováním a detailem,
4. konkrétní postup,
5. kontrolu před použitím,
6. související interní generátor, pokud je relevantní.

Workflow nepřepisuje prompt body. Tím se při opravě centrálního promptu automaticky aktualizuje i učitelská vrstva.

## SPU a diferenciace

SPU workflow neprovádí diagnózu a nepředepisuje jednu univerzální úpravu. Pracuje s existujícím materiálem, kratšími instrukcemi, menšími kroky, klíčovými slovy, prostorem a menším vizuálním šumem. Konečná úprava musí odpovídat konkrétním doporučením a potřebám žáka.

Diferenciace zachovává společný cíl a mění přístupovou cestu, míru podpory, počet kroků nebo náročnost důkazu. Varianty nejsou označené diagnózou ani pevnou představou o schopnostech žáků.

## Datový kontrakt

Zdroj: `src/data/teacher-workflows.ts`
Schéma: `src/schemas/teacher.ts`
Render: `src/main.ts` (`teacherHub`, `teacherWorkflowCard`)
