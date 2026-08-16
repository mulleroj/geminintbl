# Generator suite v1

Notebook Hub CZ obsahuje tři interní generátory promptů. Nejde o iframe ani o přesměrování na starý web. Každý modul je lazy-loaded pouze na své route a používá společný header, footer, typografii, formulářové prvky, focus states a výstupní panel Hubu.

| Generátor | Původní samostatná verze | Interní route | Stav |
| --- | --- | --- | --- |
| Prezentace | https://ntb-presentation-prompt.netlify.app/ · https://github.com/mulleroj/prompt-presentation | `/nastroje/generator-prezentace` | PRESERVED / ADAPTED |
| Infografika | https://generator-promptu.netlify.app/ · https://github.com/mulleroj/generatorpromptu | `/nastroje/generator-infografiky` | PRESERVED / ADAPTED |
| Audio / video | https://promptgenerator-audio-video.netlify.app/ · https://github.com/mulleroj/generatorpromptu-video-audio | `/nastroje/generator-audio-video` | PRESERVED / ADAPTED |

## Výstupní model

Generátor vytváří prompt. Nevytváří sám prezentaci, infografiku, audio ani video. Uživatel má nejdříve v Gemini Notebook ověřit zdroje a osnovu, potom použít interní formulář a nakonec prompt vložit do odpovídajícího AI workflow.

## Architektura

```text
src/generators/
  presentation/  config.ts  presets.ts  prompt-builder.ts  view.ts
  infographic/   presets.ts prompt-builder.ts              view.ts
  audio-video/   config.ts  prompt-builder.ts               view.ts
```

Velké presety infografiky jsou v samostatném modulu. Vite je načítá v lazy chunku, takže homepage nenačítá všechny generator-specific volby.

## Funkční rozsah

- Prezentace: formát, délka, jazyk včetně vlastního jazyka, téma, cíl, publikum, úroveň, počet slidů, pravidla slidů, mluvní poznámky, citlivost na zdroje, vizuální preset, atmosféra, konzistence, tematický balíček, terminologie a presety.
- Infografika: téma, publikum, struktura, další informace, poměr stran, tři úrovně detailu, 39 stylů, 27 layoutů, 17 barevných režimů, typografie, pravopis, generate/copy/reset.
- Audio / video: režim video/audio/filmový overview, téma, délka, jazyk, publikum, hloubka, vyprávění, tón, tempo, mluvčí, osobnosti, struktura dialogu, role lock, vizuální/art styl, poměr stran, obsahová omezení, generate/copy/reset.

Staré samostatné repozitáře nebyly upraveny. Interní katalogové záznamy zachovávají původní web v `sourceUrl` jako provenance.
