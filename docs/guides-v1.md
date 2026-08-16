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

Úrovně: 8 začátečnických, 13 středně pokročilých, 11 pokročilých. Publikum: učitelé 31, studenti 23, výzkum 9, profesionálové 14, obecné použití 15; průvodci mohou mít více publik současně. Featured V1: 6, rozloženo mezi začátek, učitele, Studio, výzkum a bezpečnost.

## Propojení a UX

Detail průvodce zobrazuje kategorii, úroveň, publikum, datum ověření, případnou dostupnost účtu/jazyka/věku, obsah s TOC, oficiální reference a blok souvisejících promptů, zdrojů, nástrojů a učitelských workflow. Knihovna vyhledává v názvu, anotaci, kategorii, tagu, úrovni a publiku. Homepage zachovává pořadí hero → statistiky → učitelský teaser → prompty → kategorie → zdroje → nástroje/notebooky → průvodci → příspěvek.

Všechny guide URL jsou zapsané v `public/sitemap.xml`. Detail používá Article meta, canonical URL, `dateModified` a keywords v JSON-LD. Externí reference se otevírají bezpečně v nové kartě.

## Kontrolní gate

`npm.cmd run guides:check` kontroluje:

- rozsah 25–35 a přesně 32 průvodců;
- pět registrovaných kategorií, 6 featured průvodců a rozložení úrovní/publik;
- povinná metadata, oficiální reference a `lastVerified`;
- dangling vazby na prompt/source/tool/workflow ID;
- duplicity ID, slugů, normalizovaných titulů a job-to-be-done;
- délku obsahu, která brání mikrotextům pod 200 slov;
- zero `needsReview` a pokrytí oficiálními referencemi.

`npm.cmd run content:audit` navíc zachovává původní parity gate pro prompty, zdroje, nástroje a notebooky; přidává povinná guide metadata. `npm.cmd run typecheck` ověřuje, že vazby a renderer odpovídají schématu.

## V1 limity

- Produktová dostupnost a limity se mohou měnit podle plánu, země, věku, zařízení a účtu; průvodce proto používá caveats místo absolutních slibů.
- V1 je statický obsah bez CMS, analytiky a automatické revalidace externích Help stránek.
- Ruční vizuální QA musí ověřit reprezentativní desktop a mobilní detail a skutečné kliknutí na vazby; automatické testy samy nepotvrdí typografii ani účetní dostupnost.
- Neprovádí se žádná změna Supabase, RLS, API, autentizace ani produkčních dat.
