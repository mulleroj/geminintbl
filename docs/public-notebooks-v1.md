# Public Notebooks V1

Stav k 2026-08-16. Katalog obsahuje 15 skutečně otevřitelných veřejných nebo sdílených notebooků. Každý záznam má `verifiedAt`, kategorii, jazyk, region, topic tags, `sourceType`, přístupový režim a `needsReview: false`.

## Inventář

| Kategorie | Počet | Příklady |
| --- | ---: | --- |
| Zdraví a wellbeing | 3 | dlouhověkost, životní pohoda, rodičovské wellbeing téma |
| Byznys a ekonomika | 1 | výsledky hospodaření |
| Věda a životní prostředí | 2 | Yellowstone, klimatické debaty |
| Rodičovství | 1 | digitální věk |
| Literatura | 1 | William Shakespeare |
| Technologie | 2 | Made by Google, AWS re:Invent |
| Vzdělávání | 2 | Codebreaker Chronicles, DDD Quickly |
| Média a žurnalistika | 1 | španělské nástroje pro novináře |
| Hry | 1 | Destiny 2: Edge of Fate |
| Produktivita | 1 | Kortex Workspace Guide |

Source type: 8 official, 2 education, 0 research, 5 community. Featured: 5. Všechny záznamy používají `access: google-account`; notebook může být veřejný, ale aktuální Google přístup vyžaduje přihlášený účet. Katalog proto nepředstírá anonymní přístup.

## Pravidlo zařazení

Za notebook se počítá pouze přímý odkaz na skutečný veřejný nebo sdílený Gemini Notebook, který byl ručně otevřen a zobrazil název i zdroje či artefakty. Článek, video, screenshot nebo obecná domovská stránka se za notebook nepovažují.

Oficiální featured notebooky vycházejí z Google přehledu featured notebooků. Institucionální záznamy mají odkaz na školní nebo evropský podklad. Komunitní záznamy jsou označeny jako community a mají v `sourceLabel` uvedeno datum ručního ověření.

## Vyřazené odkazy

Historický záznam `n-otevrena-data` byl odstraněn z katalogu, protože jeho odkaz vedl pouze na domovskou stránku a nebylo možné ověřit konkrétní veřejný notebook. Dva další kandidáty skončily v ověřovacím účtu na žádosti o přístup a jeden na domovské stránce; nebyly publikovány. Neexistuje žádný publikovaný záznam s `needsReview: true`.

## Ověření

Všechny aktuální odkazy byly otevřeny v přihlášeném prohlížeči 2026-08-16. Automatickou revalidaci spouští `npm run notebooks:check`; statusy jsou `VALID`, `REDIRECT`, `BOT_BLOCKED`, `AUTH_REQUIRED`, `BROKEN`, `TIMEOUT` a `MANUAL_REVIEW`. Ruční kontrola zůstává nutná, protože veřejnost a obsah sdíleného notebooku může vlastník později změnit.

Poslední běh 2026-08-16: `REDIRECT=15`, `VALID=0`, `BROKEN=0`, `TIMEOUT=0`, `MANUAL_REVIEW=0`. Všechny odkazy používají starší notebookovou doménu jako vstup a přesměrují se na aktuální doménu; ruční kontrola v přihlášeném účtu na cílové stránce zobrazila notebook a jeho zdroje.
