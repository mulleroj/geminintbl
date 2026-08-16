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
