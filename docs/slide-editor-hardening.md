# Editor prezentací — M1.1 hardening evidence

Datum ověření: 2026-08-16. Rozsah je pouze integrační a regresní hardening; nepřidává nový produktový workflow.

## Git a dependency stav

- Integrační větev je založená z `origin/main` a obsahuje pouze editorový cherry-pick (`895d809`); původní kontaminovaná větev `feat/notebook-slide-editor` zůstává nedotčená.
- Strom obsahuje `pptxgenjs@4.0.1 → image-size@2.0.2`, `pdfjs-dist@6.2.108` a `tesseract.js@7.0.0`.
- `npm audit --omit=dev` hlásí dvě HIGH DoS advisories pro ICNS a JXL/HEIF parser `image-size`; pro `image-size` není dostupná opravená verze. Auditní návrh `pptxgenjs@1.1.5` je nepřijatelný downgrade s jinou historickou API/dependency sadou.
- PptxGenJS browser map označuje `image-size` jako `false` a v `dist/assets` není nalezený literal ani parser signature `image-size`; produkční browser flow proto tento Node parser nedosahuje. Advisory zůstává release blockerem pro čistý audit dependency tree.

## Regresní fixture

`tests/fixtures/slide-editor-regression.pdf` je osmislidový 16:9 PDF deck generovaný deterministickým skriptem. Pokrývá jednoduchý titulek, více bloků, českou diakritiku, angličtinu, čísla/procenta/datum/štítky, plné tmavé pozadí, gradient a komplexní barevnou ilustraci s rastrovou texturou.

Browser smoke test na čistém uploadu dokončil všech 8 slidů bez runtime console chyby. OCR zachoval použitelné textové bloky a bounding boxy, ale u dekorativního gradientu nevytvořil blok a u některých syntetických řádků přidal mezery nebo zaměnil znaky. To je očekávaná OCR nejistota, nikoli důvod tvrdit pixel-perfect fidelity.

## Provedený hardening

- Maskování používá deset vzorků z obvodu oblasti a medián RGB místo průměru čtyř bodů; tím se omezuje vliv jediného rušivého pixelu.
- Technické chyby PDF/OCR se mapují na bezpečné české hlášky bez stack trace.
- Zastaralý upload nemůže po změně souboru přepsat novější stav (`processToken`); progress je omezený na 0–100 a má `aria-label`.
- PDF.js loading task se uklízí i při chybě a OCR worker se vždy ukončí.
- Upload dropzone má viditelný focus stav; file input má explicitní accessible label.

## Výslovně neuzavřené body

- Manuální otevření výsledného PPTX v desktopovém PowerPointu nebylo v tomto prostředí provedeno; zůstává checklistová kontrola slide count/order, 16:9 ratio, background image, editable text objects, fontu, pozic, zarovnání, bold/italic a barev.
- Reálný OCR benchmark 10/25/50 slidů nebyl kvůli minutovým nákladům Tesseractu spuštěn. `npm run slide-editor:perf` měří skutečný PptxGenJS export pro 10/25/50 slidů, nikoli plný OCR.
- Offline OCR po prvním načtení a CDN-down chování vyžadují samostatný network-throttling test; modelové assety jsou načítané z CDN Tesseractu při prvním použití.

## M1.2 release-candidate evidence

Datum ověření: 2026-08-16. M1.2 nepřidává produktový workflow; uzavírá pouze release-gate hardening a auditní důkazy.

- `sources:check` byl spuštěn ve dvou čistých detached worktree. Feature HEAD i `origin/main` měly stejný výsledek 175 kontrol, 121 VALID, 38 REDIRECT, 11 BOT_BLOCKED, 0 BROKEN, 1 TIMEOUT (`s-infoabsolvent`) a 4 MANUAL_REVIEW. Jde o síťovou baseline poruchu, ne regresi editoru.
- Browser bundle po lazy-load změně rozděluje route/editor chunks, PDF.js + Tesseract do `pdf` chunku (450.15 KiB) a PptxGenJS do `export` chunku (374.27 KiB). Původní přibližně 842 KiB editorový chunk se tím nenačítá celý při otevření stránky.
- `image-size@2.0.2` zůstává v dependency tree přes PptxGenJS a `npm audit --omit=dev` zůstává FAIL se dvěma HIGH advisories. Browser mapping PptxGenJS je `image-size: false`; v produkčních JS není literal `image-size`, Node parser není v browser runtime path a uživatelské PDF ani obrázky touto implementací neprocházejí.
- Skutečný browserový PDF → render → OCR → model smoke test dokončil 10 slidů za přibližně 83 s, 25 slidů za přibližně 85 s a 50 slidů za přibližně 193 s. Po každém běhu byl projekt dostupný, UI reagovalo na kontrolu stavu, nezůstal canvas ani console error.
- QA artefakt `artifacts/qa/notebook-slide-editor-regression.pptx` má automaticky ověřených 8 slidů, 16:9, textové objekty, diakritiku, angličtinu, čísla, bold a italic. Ruční desktopový PowerPoint v prostředí dostupný není.
- Při selhání uložení do IndexedDB zůstává editorová session použitelná a zobrazí nenásilnou zprávu o nemožnosti automatického lokálního uložení. Při OCR chybě po předchozím projektu se zachová předchozí projekt v aktuální relaci. Live simulace vypnuté CDN/IndexedDB nebyla v tomto browser backendu dostupná, proto není vydávána za provedený network/failure test.

## Offline chování

- První použití bez internetu: lokální PDF se načte, ale OCR worker, core a jazyková data se pokusí načíst z jsDelivr; při nedostupnosti se zobrazí česká chyba s možností opakování.
- Opakované použití po předchozím načtení assetů: záleží na tom, zda byly assety skutečně uloženy v browser cache/IndexedDB; není to garantovaný offline režim ani PWA cache. Tento stav nebyl v prostředí live-ověřen.
