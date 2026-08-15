# Vizuální audit

Audit proběhl nad lokálním preview po modulárním refaktoru. Netlify preview nebylo vytvořeno, protože workspace není propojený s konkrétním Netlify site a bezpečnostní kontrola odmítla vytvoření nového externího site/uploadu bez výslovného cíle.

## Výsledek

- P0: žádný.
- P1: opraveno mobilní menu, jehož `hidden` stav přebíjelo responzivní `display: block`; po opravě je po čistém načtení zavřené a po aktivaci se otevře.
- P2: relativní `<loc>` hodnoty v `public/sitemap.xml` zůstávají do chvíle, kdy bude známá skutečná doména; detailní renderovací funkce v `src/main.ts` jsou kandidát na budoucí rozdělení, ale nejsou blokující pro tuto etapu.

## Ověřené rozměry

- `1440×900`, `1280×800`, `768×1024`, `390×844`
- bez horizontálního overflow
- přímé načtení hlavních knihoven, detailu promptu, detailu průvodce a experimentální stránky
- vyhledávání `učitel` v promptech vrací jeden výsledek
- kopírování promptu zobrazí potvrzení `Zkopírováno ✓`
- mobilní navigace má funkční otevření i zavření
- konzole po QA: bez warningů a errorů

## Netlify stav

NETLIFY PREVIEW BLOCKED
Reason: Workspace není propojený s Netlify projektem; vytvoření nového site a upload artefaktu do týmu STSUL vyžaduje explicitně schválený externí cíl.
Required next action: Propojit workspace s existujícím Netlify site nebo výslovně schválit konkrétní site/tým a spustit neprodukční `netlify deploy --dir=dist`.
