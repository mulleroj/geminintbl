# Notebook Hub CZ

Česká, nezávislá knihovna promptů, důvěryhodných zdrojů, nástrojů, veřejných notebooků a praktických průvodců pro NotebookLM.

## Lokální spuštění

```bash
npm install
npm run dev
```

Ověření produkčního buildu:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## Struktura

- `src/data.ts` — centrální katalog a typed modely
- `src/main.ts` — lehký client-side router, šablony a interakce
- `src/search.ts` — normalizace české diakritiky a společné filtrování
- `src/storage.ts` — localStorage oblíbených položek
- `src/styles.css` — vlastní responzivní design systém
- `docs/reference-parity.md` — audit route a vědomých odchylek
- `docs/content-inventory.md` — počty obsahu a auditní snapshot

## Přidání obsahu

Nový prompt, zdroj, nástroj, notebook nebo průvodce patří do příslušného pole v `src/data.ts`. U externího záznamu zachovej `sourceUrl`, autora, `sourceLabel`, `retrievedAt`, licenci a podle potřeby `needsReview: true`. Neuváděj vymyšlené autory ani URL.

Průvodci jsou v této první iteraci datově vedené jako krátké originální články. Delší obsah lze později přesunout do Markdown/MDX loaderu bez změny UI kontraktu.

## Oblíbené a sdílení

Oblíbené se ukládají lokálně v prohlížeči bez účtu. Sdílení používá `navigator.share()` s fallbackem na kopírování odkazu.

## Netlify

Projekt je statický Vite build. Pro Netlify nastav `npm run build` jako build command a `dist` jako publish directory. SPA fallback je součástí `public/_redirects`.

Protože nebyla dodaná finální produkční doména, `public/sitemap.xml` používá relativní lokátory. Před ostrým nasazením je nahraď absolutní URL skutečného webu; runtime metadata si canonical URL dopočítávají z aktuálního originu.

## Licence a attribution

Web je vlastní komunitní projekt a není spojený se společností Google. Gemini a NotebookLM jsou ochranné známky společnosti Google LLC. Externí projekty a zdroje zůstávají označené svým autorem a odkazem; jejich použití je určeno jako katalogová metadata, nikoli převzetí redakčního obsahu.
