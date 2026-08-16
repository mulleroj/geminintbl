# Guides V1 — Notebook Hub CZ

## Stav a rozsah

V1 obsahuje 32 českých praktických průvodců v pěti kategoriích. Obsah je interní projektový materiál s provázáním na stávající katalog promptů, zdrojů, nástrojů a učitelských workflow. Průvodce není produktová dokumentace Google; proměnlivé funkce jsou odkázané na oficiální Help a označené datem ověření.

Ověření produktových tvrzení: 2026-08-16. Všechny průvodce mají `lastVerified: '2026-08-16'`, minimálně jeden oficiální odkaz a `needsReview: false` pouze jako stav interního obsahu, nikoli jako garanci budoucí dostupnosti funkce.

## Inventář

| Kategorie | Počet | Zaměření |
| --- | ---: | --- |
| Začínáme | 6 | orientace, první notebook, zdroje, import, citace |
| Pro učitele | 7 | hodina, list, test, SPU, diferenciace, jazyky, odborné předměty |
| Studio a výstupy | 8 | audio, video, Cinematic/Short, infografika, slidy, mapy, kvízy, reporty/tabulky |
| Výzkum a analýza | 5 | srovnání, rozpory, evidence map, dlouhý dokument, research brief |
| Bezpečnost a kvalita | 6 | ověřování, halucinace, copyright, osobní údaje, nahrávání, archivace |
| **Celkem** | **32** | — |

Úrovně: 8 začátečnických, 13 středně pokročilých, 11 pokročilých. Publikum po auditu: učitelé 16, studenti 21, výzkum 9, profesionálové 13, obecné použití 15; průvodci mohou mít více publik současně. Oproti výchozímu stavu 31 učitelských průvodců bylo 15 příliš širokých přiřazení odstraněno a 16 přímých učitelských průvodců ponecháno. Featured V1: 6, rozloženo mezi začátek, učitele, Studio, výzkum a bezpečnost.

## M-CONTENT-1D2 — hloubka a kurátorské vazby

Počet průvodců zůstává přesně 32; nový obsah prohlubuje všech 32 existujících záznamů a nepřidává další guide. `level` zůstává obtížnostní metadata, zatímco `depthClass` řídí očekávanou délku a strukturu čtení:

| Hloubková třída | Počet | Cíl | Naměřeno po auditu |
| --- | ---: | ---: | ---: |
| quick | 3 | 500–800 slov | průměr 585 |
| standard | 10 | 800–1200 slov | průměr 871 |
| advanced | 19 | 1100–1600 slov | průměr 1132 |

Výchozí obsah měl min/max/průměr/medián 246/408/316,6/310,5 slov. Po prohloubení má 533/1181/999/1114 slov; žádný průvodce není pod 450 slov ani mimo svou cílovou hloubkovou třídu. Všech 32 průvodců obsahuje konkrétní příklad, checklist a TOC; 29 obsahuje varování nebo typickou chybu. Standardní a pokročilé texty používají rozbalovací TOC a dlouhé řádky jsou omezené na přibližně 70ch.

Každý průvodce má ručně zadané `relatedGuideIds`. Kurátorský audit eviduje 271 vazeb do katalogů a 96 vazeb mezi průvodci, celkem 367 vazeb; rozsah na průvodce je 9–14, průměr 11,5, bez dangling nebo overlinked záznamu. Vazby se zobrazují ve sloupci „Další průvodci“ a na mobilu se skládají do jednoho sloupce.

## Propojení a UX

Detail průvodce zobrazuje kategorii, úroveň, publikum, datum ověření, případnou dostupnost účtu/jazyka/věku, obsah s TOC, oficiální reference a blok souvisejících promptů, zdrojů, nástrojů a učitelských workflow. Knihovna vyhledává v názvu, anotaci, kategorii, tagu, úrovni a publiku. Homepage zachovává pořadí hero → statistiky → učitelský teaser → prompty → kategorie → zdroje → nástroje/notebooky → průvodci → příspěvek.

Všechny guide URL jsou zapsané v `public/sitemap.xml`. Detail používá Article meta, canonical URL, `dateModified` a keywords v JSON-LD. Externí reference se otevírají bezpečně v nové kartě.

## Kontrolní gate

`npm.cmd run guides:check` kontroluje:

- rozsah 25–35 a přesně 32 průvodců;
- pět registrovaných kategorií, 6 featured průvodců a rozložení úrovní/publik;
- rozlišení `level` a `depthClass`, cílovou délku, minimální délku 450 slov, příklad, checklist, varování a TOC;
- povinná metadata, oficiální reference a `lastVerified`;
- dangling vazby na prompt/source/tool/workflow/guide ID a limit kurátorských vazeb;
- duplicity ID, slugů, normalizovaných titulů a job-to-be-done;
- délku obsahu podle hloubkové třídy a zákaz generických filler frází;
- zero `needsReview` a pokrytí oficiálními referencemi.

`npm.cmd run content:audit` navíc zachovává původní parity gate pro prompty, zdroje, nástroje a notebooky; přidává povinná guide metadata. `npm.cmd run typecheck` ověřuje, že vazby a renderer odpovídají schématu.

## V1 limity

- Produktová dostupnost a limity se mohou měnit podle plánu, země, věku, zařízení a účtu; průvodce proto používá caveats místo absolutních slibů.
- V1 je statický obsah bez CMS, analytiky a automatické revalidace externích Help stránek.
- Ruční vizuální QA musí ověřit reprezentativní desktop a mobilní detail a skutečné kliknutí na vazby; automatické testy samy nepotvrdí typografii ani účetní dostupnost.
- Neprovádí se žádná změna Supabase, RLS, API, autentizace ani produkčních dat.
