# Reference parity — Notebook Hub CZ

Audit reference: `https://gemini-notebook-hub.online/`, checked 15. 8. 2026.

Reference uses 11 primary route/page patterns, category and detail variants, plus a client-side watermark utility. The Czech version keeps the information architecture and interaction model while using original copy, data and visual identity.

| Reference route | Typ stránky | Funkce | CZ route | Stav |
| --- | --- | --- | --- | --- |
| `/` | Přehled | Hero, data-driven stats, featured prompts, categories, sources, tools, notebooks, guides, contribution CTA | `/` | VERIFIED |
| `/prompts` | Knihovna promptů | Search, category navigation, prompt cards, copy/import/favorite/share | `/prompty` | VERIFIED |
| `/prompts/:category` | Kategorie promptů | Category header, subgroups, filtered prompt list | `/prompty/:category` | VERIFIED |
| `/prompts/:category/:slug` | Detail promptu | Breadcrumb, prompt text, copy, favorite, share, related prompts, how-to | `/prompty/:category/:slug` | VERIFIED |
| `/sources` | Knihovna zdrojů | Search, categories, trusted source cards, copy link, favorite | `/zdroje` | VERIFIED |
| `/tools` | Knihovna nástrojů | Tool cards, type/pricing labels, external links, favorite | `/nastroje` | VERIFIED |
| `/notebooks` | Veřejné notebooky | Search, category labels, publisher, external open, favorite | `/notebooky` | VERIFIED |
| `/guides` | Knihovna průvodců | Search, category filters, reading time, updated date, guide cards | `/pruvodci` | VERIFIED |
| `/guides/:slug` | Detail průvodce | Article, metadata, share, favorite, related reading, TOC | `/pruvodci/:slug` | VERIFIED |
| `/favorites` | Uložený obsah | localStorage, empty state, grouped saved content | `/oblibene` | VERIFIED |
| `/submit` | Contribution form | Type switcher, conditional fields, review notice | `/pridat` | VERIFIED |
| `/watermark-remover` | Client utility | Local-only warning, format selection, experimental state | `/nastroje/odstraneni-vodoznaku` | INTENTIONALLY DIFFERENT |
| `/robots.txt`, `/sitemap.xml` | SEO infrastructure | Crawl directives and public route listing | `/robots.txt`, `/sitemap.xml` | VERIFIED |
| `/prompts/:category` anchor groups | Nested category groups | In-page category links and counts | Same route with section anchors | VERIFIED |
| External community links | Attribution/provenance | Author/source credit and original URL | Metadata fields and review flags | INTENTIONALLY DIFFERENT |

## Intentional differences

- The brand is **Notebook Hub CZ**, not a copy of the reference brand.
- The first iteration uses a compact, original Czech catalogue rather than reproducing the reference site's full third-party corpus. Imported/uncertain records are explicitly marked with `needsReview` and are not silently republished.
- The watermark route is an experimental, non-processing UI. It does not claim to remove files until a safe, local implementation and format-specific verification exist.
- The contribution flow is a local demo adapter with a clear hand-off state; it does not pretend that a backend submission was accepted.
- The static sitemap contains all public paths but keeps relative `<loc>` values until a real production domain is configured; this avoids inventing a deploy URL.
