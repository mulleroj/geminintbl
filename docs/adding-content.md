# Přidávání obsahu

Notebook Hub CZ používá modulární katalog. Každý typ obsahu má vlastní datový modul a `src/data.ts` slouží pouze jako veřejný agregační bod pro UI.

## Postup

1. Vyberte správný modul:
   - prompty: `src/data/prompts/<kategorie>.ts`
   - zdroje: `src/data/sources/<téma>.ts`
   - nástroje: `src/data/tools/index.ts`
   - veřejné notebooky: `src/data/notebooks/index.ts`
   - průvodci: `src/data/guides/index.ts`
2. Použijte existující schéma z `src/schemas/` a zachovejte unikátní `id`. U promptů a průvodců musí být unikátní také `slug` v rámci jejich vlastního namespace.
3. Do `category` zapisujte stabilní ID z `src/data/categories.ts`, nikoli zobrazovaný český label.
4. Prompt musí mít také `target`, `complexity`, `audience` a projektovou nebo externí provenance. Pro originální obsah použijte `...projectProvenance`.
5. U externích tvrzení vyplňte `sourceUrl`, `sourceLabel`, `retrievedAt` a `license`, pokud jsou známé. Neověřený záznam označte `needsReview: true` a nepředstírejte jeho ověření.
6. U zdrojů, nástrojů a notebooků používejte platné URL. Interní odkazy začínají `/` pouze tam, kde to dovoluje schéma.
7. UI neupravujte jen kvůli novému záznamu; knihovny čtou agregované kolekce a registry automaticky.

## Kontrola před předáním

```text
npm run prompt:coverage
npm run content:audit
npm run prompt:quality
npm run typecheck
npm test
npm run build
```

Coverage audit nejprve zkontroluje job-to-be-done, overlap groups, category heatmapu, tag vocabulary a manuální QA vzorek. Content audit rozlišuje originální interní obsah, externí záznam s platnou `sourceUrl`, externí záznam bez povinné `sourceUrl` a `sourceUrl not applicable`; originální obsah tedy není falešně hlášen jako chyba. Při skutečné strukturální chybě zastaví proces s nenulovým návratovým kódem.

Pro větší import nejprve rozdělte data podle tématu do více souborů. Hromadný import ani automatické publikování bez kontroly původu není součástí tohoto katalogu.
