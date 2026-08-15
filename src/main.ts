import {
  guideBySlug,
  guideCategory,
  guideCategories,
  guides,
  notebooks,
  promptBySlug,
  promptCategories,
  promptCategory,
  prompts,
  sourceCategories,
  sourceCategory,
  sources,
  tools,
  type FavoriteType,
  type Guide,
  type Prompt,
  type Source,
  type Tool,
  type PublicNotebook,
} from './data';
import { matchesSearch } from './search';
import { hasFavorite, readFavorites, toggleFavorite } from './storage';
import './styles.css';

const app = document.querySelector<HTMLDivElement>('#app');
if (!app) throw new Error('Aplikace nenalezena');
const appRoot: HTMLDivElement = app;

const esc = (value: string | number | undefined): string => String(value ?? '')
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

const internalHref = (href: string): string => href;
const isExternal = (href: string): boolean => /^https?:\/\//.test(href);
const icon = (name: 'arrow' | 'search' | 'bookmark' | 'copy' | 'menu' | 'close' | 'share' | 'external' | 'check' | 'spark') => ({
  arrow: '↗', search: '⌕', bookmark: '▱', copy: '▣', menu: '☰', close: '×', share: '⌯', external: '↗', check: '✓', spark: '✦',
}[name]);

function link(href: string, label: string, className = '', extra = ''): string {
  const external = isExternal(href);
  return `<a class="${className}" href="${esc(href)}"${external ? ' target="_blank" rel="noopener noreferrer"' : ''}${extra}>${label}</a>`;
}

function button(label: string, action: string, className = '', extra = ''): string {
  return `<button class="${className}" type="button" data-action="${esc(action)}"${extra}>${label}</button>`;
}

function meta(title: string, description: string, type: 'WebSite' | 'Article' = 'WebSite'): void {
  document.title = `${title} — Notebook Hub CZ`;
  const canonical = `${window.location.origin}${window.location.pathname}`;
  const set = (selector: string, content: string, attribute = 'content') => {
    let element = document.head.querySelector<HTMLMetaElement>(selector);
    if (!element) {
      element = document.createElement('meta');
      if (selector.startsWith('meta[property=')) element.setAttribute('property', selector.slice(15, -2));
      else element.setAttribute('name', selector.slice(11, -2));
      document.head.append(element);
    }
    element.setAttribute(attribute, content);
  };
  set('meta[name="description"]', description);
  set('meta[property="og:title"]', title);
  set('meta[property="og:description"]', description);
  set('meta[property="og:url"]', canonical);
  set('meta[property="og:type"]', type === 'Article' ? 'article' : 'website');
  set('meta[name="twitter:card"]', 'summary');
  let canonicalLink = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.rel = 'canonical';
    document.head.append(canonicalLink);
  }
  canonicalLink.href = canonical;
  let ld = document.head.querySelector<HTMLScriptElement>('#route-structured-data');
  if (!ld) {
    ld = document.createElement('script');
    ld.id = 'route-structured-data';
    ld.type = 'application/ld+json';
    document.head.append(ld);
  }
  ld.textContent = JSON.stringify(type === 'Article' ? { '@context': 'https://schema.org', '@type': 'Article', headline: title, description, url: canonical } : { '@context': 'https://schema.org', '@type': 'WebSite', name: 'Notebook Hub CZ', url: window.location.origin, potentialAction: { '@type': 'SearchAction', target: `${window.location.origin}/prompty?q={search_term_string}`, 'query-input': 'required name=search_term_string' } });
}

function favoriteButton(type: FavoriteType, id: string): string {
  const saved = hasFavorite(type, id);
  return button(`${icon(saved ? 'check' : 'bookmark')} <span>${saved ? 'Uloženo' : 'Oblíbit'}</span>`, `favorite:${type}:${id}`, `icon-button favorite-button${saved ? ' is-saved' : ''}`, ` aria-label="${saved ? 'Odebrat z oblíbených' : 'Uložit do oblíbených'}" aria-pressed="${saved}"`);
}

function copyButton(text: string, label = 'Kopírovat'): string {
  return button(`${icon('copy')} <span>${label}</span>`, `copy:${encodeURIComponent(text)}`, 'button button-secondary copy-button');
}

function badge(label: string, tone = ''): string {
  return `<span class="badge ${tone ? `badge-${tone}` : ''}">${esc(label)}</span>`;
}

function breadcrumb(items: Array<[string, string]>): string {
  return `<nav class="breadcrumbs" aria-label="Drobečková navigace">${items.map(([label, href], index) => `${index ? '<span aria-hidden="true">/</span>' : ''}${index === items.length - 1 ? `<span aria-current="page">${esc(label)}</span>` : link(href, esc(label))}`).join('')}</nav>`;
}

function searchBox(placeholder: string, value: string, label: string): string {
  return `<label class="search-box"><span class="visually-hidden">${esc(label)}</span><span aria-hidden="true">${icon('search')}</span><input data-search type="search" value="${esc(value)}" placeholder="${esc(placeholder)}" autocomplete="off" /></label>`;
}

function categoryChips(active = ''): string {
  return `<div class="chip-row" aria-label="Kategorie promptů">${link('/prompty', 'Všechny', `chip${!active ? ' is-active' : ''}`)}${promptCategories.map((category) => link(`/prompty/${category.id}`, `${esc(category.label)} <small>${prompts.filter((prompt) => prompt.category === category.id).length}</small>`, `chip${active === category.id ? ' is-active' : ''}`)).join('')}</div>`;
}

function siteHeader(active: string): string {
  const nav = [
    ['/', 'Přehled', 'home'], ['/prompty', 'Prompty', 'prompty'], ['/zdroje', 'Zdroje', 'zdroje'], ['/nastroje', 'Nástroje', 'nastroje'], ['/notebooky', 'Notebooky', 'notebooky'], ['/pruvodci', 'Průvodci', 'pruvodci'], ['/oblibene', 'Oblíbené', 'oblibene'], ['/pridat', 'Přidat zdroj', 'pridat'],
  ] as const;
  return `<header class="site-header"><div class="header-inner"><a class="brand" href="/" aria-label="Notebook Hub CZ — domů"><span class="brand-mark">N</span><span><strong>Notebook Hub</strong><small>CZ / praktická knihovna</small></span></a><nav class="desktop-nav" aria-label="Hlavní navigace">${nav.map(([href, label, key]) => link(href, label, key === active ? 'is-active' : '')).join('')}</nav>${button(`${icon('menu')}<span class="visually-hidden">Otevřít menu</span>`, 'menu-open', 'menu-toggle', ' aria-controls="mobile-menu" aria-expanded="false"')}</div><div class="mobile-menu" id="mobile-menu" hidden><div class="mobile-menu-top"><span>Menu</span>${button(`${icon('close')}<span class="visually-hidden">Zavřít menu</span>`, 'menu-close', 'icon-button')}</div><nav aria-label="Mobilní navigace">${nav.map(([href, label, key]) => link(href, label, key === active ? 'is-active' : '')).join('')}</nav></div></header>`;
}

function siteFooter(): string {
  return `<footer class="site-footer"><div class="footer-grid"><div><a class="brand footer-brand" href="/"><span class="brand-mark">N</span><span><strong>Notebook Hub CZ</strong><small>Pro lidi, kteří chtějí vědět proč.</small></span></a><p class="muted">Česká knihovna promptů, zdrojů, nástrojů a průvodců pro práci s NotebookLM.</p></div><div><h2>Knihovna</h2><div class="footer-links">${link('/prompty', 'Prompty')}${link('/zdroje', 'Zdroje')}${link('/nastroje', 'Nástroje')}${link('/notebooky', 'Notebooky')}${link('/pruvodci', 'Průvodci')}${link('/oblibene', 'Oblíbené')}</div></div><div><h2>Projekt</h2><div class="footer-links">${link('/pridat', 'Přidat obsah')}${link('/nastroje/odstraneni-vodoznaku', 'Experimentální nástroj')}<a href="https://notebooklm.google/" target="_blank" rel="noopener noreferrer">NotebookLM ${icon('external')}</a></div></div></div><div class="footer-bottom"><span>© 2026 Notebook Hub CZ</span><span>Nezávislý komunitní projekt. Není spojen se společností Google. Gemini a NotebookLM jsou ochranné známky společnosti Google LLC.</span></div></footer>`;
}

function shell(content: string, active: string): string {
  return `${siteHeader(active)}<main id="main-content">${content}</main>${siteFooter()}<div id="toast" class="toast" role="status" aria-live="polite"></div>`;
}

function pageIntro(kicker: string, title: string, description: string, extras = ''): string {
  return `<section class="page-intro wrap"><div><p class="eyebrow">${esc(kicker)}</p><h1>${esc(title)}</h1><p class="lead">${esc(description)}</p></div>${extras}</section>`;
}

function stat(value: number, label: string, detail: string): string {
  return `<div class="stat"><strong>${value}</strong><span>${esc(label)}</span><small>${esc(detail)}</small></div>`;
}

function promptCard(prompt: Prompt, compact = false): string {
  const category = promptCategory(prompt.category);
  return `<article class="card prompt-card${compact ? ' compact' : ''}"><div class="card-top"><span class="index-mark">${icon('spark')}</span>${badge(category.label, category.color)}<span class="spacer"></span>${favoriteButton('prompt', prompt.id)}</div><h3>${link(`/prompty/${prompt.category}/${prompt.slug}`, esc(prompt.title))}</h3><p>${esc(prompt.description)}</p><div class="card-meta"><span>${esc(prompt.target === 'chat-settings' ? 'Nastavení chatu' : prompt.target === 'chat' ? 'Chat' : prompt.target === 'audio' ? 'Audio' : prompt.target === 'slides' ? 'Slidy' : 'Vizuální výstup')}</span><span>${esc(prompt.tags.slice(0, 2).join(' · '))}</span></div><div class="card-actions">${copyButton(prompt.prompt)}${link(`/prompty/${prompt.category}/${prompt.slug}`, 'Detail →', 'text-link')}</div></article>`;
}

function sourceCard(source: Source): string {
  return `<article class="card source-card"><div class="card-top"><span class="source-icon">${esc(source.domain.slice(0, 1).toUpperCase())}</span>${badge(sourceCategory(source.category).label, 'light')}<span class="spacer"></span>${favoriteButton('source', source.id)}</div><h3><a href="${esc(source.url)}" target="_blank" rel="noopener noreferrer">${esc(source.title)} ${icon('external')}</a></h3><p>${esc(source.description)}</p><div class="domain">${esc(source.domain)}</div><div class="card-actions">${copyButton(source.url, 'Kopírovat odkaz')}</div></article>`;
}

function toolCard(tool: Tool): string {
  const internal = !isExternal(tool.url);
  return `<article class="card tool-card"><div class="card-top"><span class="tool-icon">${icon('spark')}</span>${badge(tool.type, 'light')}<span class="spacer"></span>${favoriteButton('tool', tool.id)}</div><h3>${internal ? link(tool.url, esc(tool.title)) : `<a href="${esc(tool.url)}" target="_blank" rel="noopener noreferrer">${esc(tool.title)} ${icon('external')}</a>`}</h3><p>${esc(tool.description)}</p><div class="card-meta"><span>${esc(tool.author ?? 'Komunitní projekt')}</span>${badge(tool.pricing === 'open source' ? 'open source' : tool.pricing, 'soft')}</div><div class="tag-list">${tool.tags.map((tag) => `<span>#${esc(tag)}</span>`).join('')}</div></article>`;
}

function notebookCard(notebook: PublicNotebook): string {
  return `<article class="card notebook-card"><div class="card-top"><span class="notebook-shape">▤</span>${badge(notebook.category, 'light')}<span class="spacer"></span>${favoriteButton('notebook', notebook.id)}</div><h3><a href="${esc(notebook.url)}" target="_blank" rel="noopener noreferrer">${esc(notebook.title)} ${icon('external')}</a></h3><p>${esc(notebook.description)}</p><div class="card-meta"><span>${esc(notebook.publisher ?? notebook.author ?? 'Komunitní katalog')}</span></div>${notebook.needsReview ? `<p class="review-note">${icon('spark')} Odkaz čeká na ověření</p>` : ''}</article>`;
}

function guideCard(guide: Guide): string {
  return `<article class="card guide-card"><div class="card-top"><span class="guide-number">${esc(guide.readingMinutes)} min</span>${badge(guideCategory(guide.category).label, 'light')}<span class="spacer"></span>${favoriteButton('guide', guide.id)}</div><h3>${link(`/pruvodci/${guide.slug}`, esc(guide.title))}</h3><p>${esc(guide.excerpt)}</p><div class="card-meta"><span>Aktualizováno ${esc(guide.updatedAt)}</span><span>${esc(guide.tags.join(' · '))}</span></div><div class="card-actions">${link(`/pruvodci/${guide.slug}`, 'Číst průvodce →', 'text-link')}</div></article>`;
}

function home(): string {
  meta('Přehled', 'Česká knihovna promptů, zdrojů, nástrojů a návodů pro NotebookLM.');
  const featured = prompts.filter((prompt) => prompt.featured).slice(0, 6);
  return shell(`<section class="hero"><div class="wrap hero-grid"><div><p class="eyebrow">Notebook Hub CZ <span class="dot"></span> bez účtu</p><h1>Vytěžte z notebooku<br /><em>víc než souhrn.</em></h1><p class="hero-copy">Promyšlené prompty, ověřené zdroje a praktické postupy pro práci s NotebookLM — v češtině, s jasným původem a bez zbytečného šumu.</p><div class="hero-actions">${link('/prompty', 'Procházet prompty ↗', 'button button-primary')}${link('/zdroje', 'Důvěryhodné zdroje', 'button button-quiet')}</div><p class="hero-note"><span class="status-dot"></span> Obsah roste s každým ověřeným příspěvkem.</p></div><div class="hero-aside"><div class="hero-note-card"><span class="eyebrow">Dnešní pracovní otázka</span><p>Co musí být v odpovědi doložené, aby jí šlo věřit?</p><div class="line-list"><span>01 / ověřit zdroje</span><span>02 / najít mezery</span><span>03 / teprve potom tvořit</span></div></div></div></div></section><section class="stats-section wrap"><div class="stats-grid">${stat(prompts.length, 'promptů', 'ke kopírování')}${stat(sources.length, 'zdrojů', 's tipem k importu')}${stat(tools.length, 'nástrojů', 'pro lepší workflow')}${stat(notebooks.length, 'notebooků', 'k prozkoumání')}${stat(guides.length, 'průvodců', 'česky a prakticky')}</div></section><section class="section wrap"><div class="section-heading"><div><p class="eyebrow">Začněte tady</p><h2>Prompty, které mají jasný účel.</h2></div>${link('/prompty', 'Všechny prompty →', 'text-link')}</div><div class="card-grid prompt-grid">${featured.map((prompt) => promptCard(prompt, true)).join('')}</div></section><section class="section section-tint"><div class="wrap"><div class="section-heading"><div><p class="eyebrow">Najděte svůj způsob</p><h2>Procházet podle potřeby</h2></div>${link('/prompty', 'Knihovna promptů →', 'text-link')}</div><div class="category-grid">${promptCategories.map((category) => `<a class="category-card category-${esc(category.color)}" href="/prompty/${category.id}"><span>${esc(category.eyebrow)}</span><strong>${esc(category.label)}</strong><small>${prompts.filter((prompt) => prompt.category === category.id).length} promptů</small><i>↗</i></a>`).join('')}</div></div></section><section class="section wrap"><div class="section-heading"><div><p class="eyebrow">Váš research začíná zde</p><h2>Zdroje, které stojí za otevřením.</h2></div>${link('/zdroje', 'Všechny zdroje →', 'text-link')}</div><div class="card-grid source-grid">${sources.filter((source) => source.featured).slice(0, 4).map(sourceCard).join('')}</div></section><section class="section section-tint"><div class="wrap split-sections"><div><div class="section-heading compact-heading"><div><p class="eyebrow">Rozšířit možnosti</p><h2>Nástroje</h2></div>${link('/nastroje', 'Všechny →', 'text-link')}</div><div class="mini-list">${tools.filter((tool) => tool.featured).slice(0, 3).map((tool) => `<a href="${esc(tool.url)}"${isExternal(tool.url) ? ' target="_blank" rel="noopener noreferrer"' : ''}><span>${icon('spark')}</span><span><strong>${esc(tool.title)}</strong><small>${esc(tool.type)} · ${esc(tool.pricing)}</small></span><b>↗</b></a>`).join('')}</div></div><div><div class="section-heading compact-heading"><div><p class="eyebrow">Prozkoumat strukturu</p><h2>Veřejné notebooky</h2></div>${link('/notebooky', 'Všechny →', 'text-link')}</div><div class="mini-list">${notebooks.slice(0, 3).map((notebook) => `<a href="${esc(notebook.url)}" target="_blank" rel="noopener noreferrer"><span>${icon('spark')}</span><span><strong>${esc(notebook.title)}</strong><small>${esc(notebook.category)}</small></span><b>↗</b></a>`).join('')}</div></div></div></section><section class="section wrap"><div class="section-heading"><div><p class="eyebrow">Číst a používat</p><h2>Průvodci pro český kontext.</h2></div>${link('/pruvodci', 'Všechny průvodce →', 'text-link')}</div><div class="card-grid guide-grid">${guides.slice(0, 3).map(guideCard).join('')}</div></section><section class="contribution wrap"><div><p class="eyebrow">Máte něco, co funguje?</p><h2>Dobrá knihovna roste<br />z dobrých příspěvků.</h2></div><div><p>Pošlete prompt, zdroj nebo nástroj. Každý návrh projde kontrolou původu a použitelnosti.</p>${link('/pridat', 'Přidat obsah →', 'button button-primary')}</div></section>`, 'home');
}

function promptLibrary(categoryId = ''): string {
  const params = new URLSearchParams(window.location.search);
  const query = params.get('q') ?? '';
  const activeCategory = categoryId || params.get('kategorie') || '';
  const category = activeCategory ? promptCategory(activeCategory) : undefined;
  const filtered = prompts.filter((prompt) => (!activeCategory || prompt.category === activeCategory) && matchesSearch([prompt.title, prompt.description, prompt.prompt, prompt.tags.join(' '), prompt.author], query));
  meta(category ? category.label : 'Prompty', `${filtered.length} promptů v české knihovně Notebook Hub CZ.`);
  const heading = category ? `${category.label}` : 'Prompty pro práci, studium i výzkum';
  const description = category ? category.description : 'Vyberte si výchozí bod, zkopírujte prompt a přizpůsobte jej svému notebooku.';
  return shell(`${pageIntro('Knihovna promptů', heading, description, `<span class="count-stamp"><strong>${filtered.length}</strong><small>z ${prompts.length} promptů</small></span>`)}<section class="library-controls wrap">${searchBox('Hledat v promptech…', query, 'Hledat v promptech')}${categoryChips(activeCategory)}</section><section class="section wrap list-section"><div class="list-heading"><p>${filtered.length ? `Zobrazeno ${filtered.length} ${filtered.length === 1 ? 'položka' : 'položek'}` : 'Nic nenalezeno'}</p>${activeCategory ? link('/prompty', 'Zrušit filtr ×', 'text-link') : ''}</div>${filtered.length ? `<div class="card-grid prompt-grid">${filtered.map((prompt) => promptCard(prompt)).join('')}</div>` : `<div class="empty-state"><span>${icon('search')}</span><h2>Zkuste jiná slova</h2><p>Hledání rozumí české diakritice. Zkuste například „učitel“, „zdroje“ nebo „zkouška“.</p>${link('/prompty', 'Zobrazit všechny prompty', 'button button-secondary')}</div>`}</section>`, 'prompty');
}

function promptDetail(categoryId: string, slug: string): string {
  const prompt = promptBySlug(slug);
  if (!prompt) return notFound();
  const category = promptCategory(categoryId || prompt.category);
  const related = prompts.filter((item) => item.category === prompt.category && item.id !== prompt.id).slice(0, 3);
  meta(prompt.title, prompt.description);
  return shell(`<section class="detail-wrap wrap">${breadcrumb([['Prompty', '/prompty'], [category.label, `/prompty/${category.id}`], [prompt.title, '#']])}<div class="detail-header"><div><div class="detail-kicker">${badge(category.label, category.color)} ${badge(prompt.target === 'chat-settings' ? 'Nastavení chatu' : 'Pro ' + prompt.target, 'light')}</div><h1>${esc(prompt.title)}</h1><p class="lead">${esc(prompt.description)}</p></div><div class="detail-actions">${favoriteButton('prompt', prompt.id)}${button(`${icon('share')} <span>Sdílet</span>`, 'share', 'icon-button')}${link('/prompty', 'Zpět do knihovny', 'text-link')}</div></div><div class="provenance-row"><span>Autor: <strong>${esc(prompt.author ?? 'neuveden')}</strong></span>${prompt.sourceUrl ? `<a href="${esc(prompt.sourceUrl)}" target="_blank" rel="noopener noreferrer">${esc(prompt.sourceLabel ?? 'Původní zdroj')} ${icon('external')}</a>` : `<span>${esc(prompt.sourceLabel ?? 'Originální obsah projektu')}</span>`}</div><div class="prompt-detail-grid"><div><div class="prompt-box"><div class="prompt-box-top"><span>Prompt ke kopírování</span>${copyButton(prompt.prompt, 'Kopírovat prompt')}</div><pre>${esc(prompt.prompt)}</pre></div><div class="how-to"><p class="eyebrow">Jak prompt použít</p><h2>Od otázky k lepší odpovědi</h2><ol><li>Otevřete notebook a zkontrolujte, že obsahuje zdroje, kterých se prompt týká.</li><li>Vložte prompt do chatu a nahraďte případné hranaté závorky vlastním kontextem.</li><li>Výsledek projděte přes citace a vraťte se k originálnímu dokumentu u důležitých tvrzení.</li></ol></div></div><aside class="detail-aside"><div class="aside-card"><span class="eyebrow">Patří do</span><a href="/prompty/${esc(category.id)}"><strong>${esc(category.label)}</strong><span>${prompts.filter((item) => item.category === category.id).length} promptů v této kategorii ↗</span></a></div><div class="aside-card"><span class="eyebrow">Štítky</span><div class="tag-list">${prompt.tags.map((tag) => `<span>#${esc(tag)}</span>`).join('')}</div></div>${prompt.needsReview ? `<div class="review-card"><strong>${icon('spark')} Čeká na ověření</strong><p>Tento návrh není určený k automatickému publikování. Před použitím zkontrolujte původ a licenci.</p></div>` : ''}</aside></div></section><section class="section section-tint"><div class="wrap"><div class="section-heading"><div><p class="eyebrow">Pokračovat</p><h2>Související prompty</h2></div></div><div class="card-grid prompt-grid">${related.map((item) => promptCard(item, true)).join('')}</div></div></section>`, 'prompty');
}

function sourceLibrary(): string {
  const params = new URLSearchParams(window.location.search);
  const query = params.get('q') ?? '';
  const active = params.get('kategorie') ?? '';
  const categories = sourceCategories;
  const filtered = sources.filter((source) => (!active || source.category === active) && matchesSearch([source.title, source.description, source.domain, sourceCategory(source.category).label], query));
  meta('Důvěryhodné zdroje', `${filtered.length} zdrojů, které můžete přidat do notebooku.`);
  return shell(`${pageIntro('Knihovna zdrojů', 'Začněte u zdroje, kterému rozumíte.', 'Ověřené instituce, archivy a datové katalogy s krátkým tipem, jak je přidat do NotebookLM.', `<span class="count-stamp"><strong>${filtered.length}</strong><small>z ${sources.length} zdrojů</small></span>`)}<section class="library-controls wrap">${searchBox('Hledat ve zdrojích…', query, 'Hledat ve zdrojích')}<div class="chip-row" aria-label="Kategorie zdrojů">${link('/zdroje', 'Všechny', `chip${!active ? ' is-active' : ''}`)}${categories.map((category) => link(`/zdroje?kategorie=${encodeURIComponent(category.id)}`, `${esc(category.label)} <small>${sources.filter((source) => source.category === category.id).length}</small>`, `chip${active === category.id ? ' is-active' : ''}`)).join('')}</div></section><section class="section wrap list-section"><div class="list-heading"><p>${filtered.length} zdrojů</p>${active ? link('/zdroje', 'Zrušit filtr ×', 'text-link') : ''}</div><div class="source-category-note"><span>${icon('spark')}</span><p><strong>Tip pro import:</strong> kopírujte konkrétní URL zdroje, ne jen obecný dotaz. U citlivých nebo placených materiálů si nejprve ověřte přístupová práva.</p></div><div class="card-grid source-grid">${filtered.map(sourceCard).join('')}</div>${filtered.length ? `<div class="bulk-copy-row"><span>Kategorie ${active ? esc(sourceCategory(active).label) : 'všechny zdroje'}</span>${copyButton(filtered.map((source) => source.url).join('\n'), 'Kopírovat všechny odkazy')}</div>` : `<div class="empty-state"><h2>Nic nenalezeno</h2><p>Zkuste název instituce, doménu nebo kategorii.</p></div>`}</section>`, 'zdroje');
}

function toolLibrary(): string {
  const params = new URLSearchParams(window.location.search);
  const query = params.get('q') ?? '';
  const filtered = tools.filter((tool) => matchesSearch([tool.title, tool.description, tool.author, tool.type, tool.tags.join(' ')], query));
  meta('Nástroje', `${filtered.length} nástrojů pro import, organizaci a výzkum.`);
  return shell(`${pageIntro('Katalog nástrojů', 'Méně ruční práce. Více prostoru na myšlení.', 'Komunitní i oficiální nástroje pro import, organizaci, výzkum a export. Každý odkaz vede na původní projekt.', `<span class="count-stamp"><strong>${filtered.length}</strong><small>nástrojů v katalogu</small></span>`)}<section class="library-controls wrap">${searchBox('Hledat v nástrojích…', query, 'Hledat v nástrojích')}</section><section class="section wrap list-section"><div class="notice"><strong>${icon('spark')} Bezpečné odkazy</strong><span>Externí odkazy se otevírají v nové kartě. Před instalací vždy zkontrolujte autora a oprávnění.</span></div><div class="card-grid tool-grid">${filtered.map(toolCard).join('')}</div></section>`, 'nastroje');
}

function notebookLibrary(): string {
  const params = new URLSearchParams(window.location.search);
  const query = params.get('q') ?? '';
  const filtered = notebooks.filter((notebook) => matchesSearch([notebook.title, notebook.description, notebook.category, notebook.publisher, notebook.author], query));
  meta('Veřejné notebooky', `${filtered.length} veřejných notebooků a ukázek struktury.`);
  return shell(`${pageIntro('Veřejné notebooky', 'Podívejte se, jak to poskládali ostatní.', 'Ukázky struktur, zdrojů a pracovních postupů. Odkazy, které ještě čekají na ověření, jsou tak označené.', `<span class="count-stamp"><strong>${filtered.length}</strong><small>notebooků v katalogu</small></span>`)}<section class="library-controls wrap">${searchBox('Hledat v noteboocích…', query, 'Hledat v noteboocích')}</section><section class="section wrap list-section"><div class="card-grid notebook-grid">${filtered.map(notebookCard).join('')}</div></section>`, 'notebooky');
}

function guideLibrary(): string {
  const params = new URLSearchParams(window.location.search);
  const query = params.get('q') ?? '';
  const active = params.get('kategorie') ?? '';
  const filtered = guides.filter((guide) => (!active || guide.category === active) && matchesSearch([guide.title, guide.excerpt, guideCategory(guide.category).label, guide.tags.join(' ')], query));
  meta('Průvodci', `${filtered.length} českých průvodců pro práci s NotebookLM.`);
  return shell(`${pageIntro('Knihovna průvodců', 'Praktické odpovědi pro skutečnou práci.', 'Krátké české návody bez velkých slibů — od prvního notebooku po ověřování a archivaci.', `<span class="count-stamp"><strong>${filtered.length}</strong><small>z ${guides.length} průvodců</small></span>`)}<section class="library-controls wrap">${searchBox('Hledat v průvodcích…', query, 'Hledat v průvodcích')}<div class="chip-row" aria-label="Kategorie průvodců">${link('/pruvodci', 'Všechny', `chip${!active ? ' is-active' : ''}`)}${guideCategories.map((category) => link(`/pruvodci?kategorie=${encodeURIComponent(category.id)}`, esc(category.label), `chip${active === category.id ? ' is-active' : ''}`)).join('')}</div></section><section class="section wrap list-section"><div class="card-grid guide-grid">${filtered.map(guideCard).join('')}</div></section>`, 'pruvodci');
}

function guideDetail(slug: string): string {
  const guide = guideBySlug(slug);
  if (!guide) return notFound();
  meta(guide.title, guide.excerpt, 'Article');
  return shell(`<article class="article-wrap wrap">${breadcrumb([['Průvodci', '/pruvodci'], [guideCategory(guide.category).label, `/pruvodci?kategorie=${encodeURIComponent(guide.category)}`], [guide.title, '#']])}<header class="article-header"><div class="detail-kicker">${badge(guideCategory(guide.category).label, 'light')} <span>${esc(guide.readingMinutes)} min čtení</span></div><h1>${esc(guide.title)}</h1><p class="lead">${esc(guide.excerpt)}</p><div class="article-meta"><span>Aktualizováno ${esc(guide.updatedAt)}</span><span>Autor: ${esc(guide.author ?? 'Notebook Hub CZ')}</span><span class="spacer"></span>${favoriteButton('guide', guide.id)}${button(`${icon('share')} Sdílet`, 'share', 'icon-button')}</div></header><div class="article-layout"><aside class="toc"><p class="eyebrow">Na stránce</p>${guide.content.map((section, index) => `<a href="#section-${index}">${esc(section.heading)}</a>`).join('')}</aside><div class="prose">${guide.content.map((section, index) => `<section id="section-${index}"><h2>${esc(section.heading)}</h2>${section.paragraphs.map((paragraph) => `<p>${esc(paragraph)}</p>`).join('')}${section.bullets ? `<ul>${section.bullets.map((bullet) => `<li>${esc(bullet)}</li>`).join('')}</ul>` : ''}</section>`).join('')}<div class="article-callout"><strong>${icon('spark')} Kontrolní otázka</strong><p>Co v tomto postupu vyžaduje vaše vlastní ověření nebo znalost kontextu?</p></div></div></div></article><section class="section section-tint"><div class="wrap"><div class="section-heading"><div><p class="eyebrow">Další čtení</p><h2>Pokračovat v knihovně</h2></div></div><div class="card-grid guide-grid">${guides.filter((item) => item.id !== guide.id).slice(0, 3).map(guideCard).join('')}</div></div></section>`, 'pruvodci');
}

function favorites(): string {
  const saved = readFavorites();
  const savedPrompts = prompts.filter((item) => saved.some((favorite) => favorite.type === 'prompt' && favorite.id === item.id));
  const savedSources = sources.filter((item) => saved.some((favorite) => favorite.type === 'source' && favorite.id === item.id));
  const savedTools = tools.filter((item) => saved.some((favorite) => favorite.type === 'tool' && favorite.id === item.id));
  const savedNotebooks = notebooks.filter((item) => saved.some((favorite) => favorite.type === 'notebook' && favorite.id === item.id));
  const savedGuides = guides.filter((item) => saved.some((favorite) => favorite.type === 'guide' && favorite.id === item.id));
  meta('Oblíbené', 'Obsah uložený lokálně v tomto prohlížeči.');
  const sections = [[savedPrompts, 'Prompty', '/prompty', promptCard], [savedSources, 'Zdroje', '/zdroje', sourceCard], [savedTools, 'Nástroje', '/nastroje', toolCard], [savedNotebooks, 'Notebooky', '/notebooky', notebookCard], [savedGuides, 'Průvodci', '/pruvodci', guideCard]] as const;
  const rendered = sections.filter(([items]) => items.length).map(([items, label, href, renderer]) => `<section class="favorite-group"><div class="section-heading compact-heading"><h2>${label} <small>${items.length}</small></h2>${link(href, 'Procházet →', 'text-link')}</div><div class="card-grid ${label === 'Prompty' ? 'prompt-grid' : label === 'Zdroje' ? 'source-grid' : label === 'Nástroje' ? 'tool-grid' : label === 'Notebooky' ? 'notebook-grid' : 'guide-grid'}">${items.map((item) => renderer(item as never)).join('')}</div></section>`).join('');
  return shell(`${pageIntro('Uloženo v prohlížeči', 'Vaše oblíbené položky.', 'Bez účtu a bez nahrávání. Uložení zůstává v tomto prohlížeči i po obnovení stránky.', `<span class="count-stamp"><strong>${saved.length}</strong><small>uložených položek</small></span>`)}<section class="section wrap favorites-section">${rendered || `<div class="empty-state"><span class="empty-bookmark">${icon('bookmark')}</span><h2>Zatím tu nic není.</h2><p>Uložte si prompt, zdroj, nástroj, notebook nebo průvodce a najdete je tady na jednom místě.</p>${link('/prompty', 'Procházet prompty', 'button button-primary')}</div>`}</section>`, 'oblibene');
}

function submitPage(): string {
  meta('Přidat obsah', 'Navrhněte prompt, zdroj, nástroj nebo notebook pro českou komunitu.');
  return shell(`${pageIntro('Příspěvky komunity', 'Máte něco, co stojí za sdílení?', 'Pošlete návrh. Zobrazíme jen obsah s dohledatelným původem a jasným využitím.', '<span class="form-badge">Kontrola původu<br /><strong>před publikací</strong></span>')}<section class="section wrap submit-layout"><form class="submit-form" id="submit-form" novalidate><div class="form-row type-picker" role="group" aria-label="Typ obsahu"><label><input type="radio" name="contentType" value="prompt" checked /><span>Prompt</span></label><label><input type="radio" name="contentType" value="source" /><span>Zdroj</span></label><label><input type="radio" name="contentType" value="tool" /><span>Nástroj</span></label><label><input type="radio" name="contentType" value="notebook" /><span>Notebook</span></label><label><input type="radio" name="contentType" value="other" /><span>Jiný návrh</span></label></div><div class="form-grid"><label><span>Název <b>*</b></span><input name="title" required placeholder="Např. Prompt pro kontrolu citací" /></label><label data-field="category"><span>Kategorie <b>*</b></span><select name="category"><option value="deep-analysis">Hloubková analýza</option><option value="study-exam-prep">Studium a příprava</option><option value="setup-accuracy">Nastavení a přesnost</option><option value="writing-content">Psaní a tvorba obsahu</option><option value="strategy-decisions">Strategie a rozhodování</option></select></label><label class="full" data-field="description"><span>Krátký popis <b>*</b></span><textarea name="description" rows="3" required placeholder="K čemu návrh slouží?"></textarea></label><label class="full" data-field="prompt"><span>Celý prompt <b>*</b></span><textarea name="prompt" rows="8" required placeholder="Vložte text promptu…"></textarea></label><label class="full" data-field="url"><span>Původní URL <b>*</b></span><input name="url" type="url" placeholder="https://…" /></label><label><span>Autor <small>(volitelné)</small></span><input name="author" placeholder="Jméno nebo přezdívka" /></label><label><span>Kontakt <small>(volitelné, nezveřejníme)</small></span><input name="contact" type="email" placeholder="vas@email.cz" /></label></div><div class="form-consent"><input id="review-consent" type="checkbox" required /><label for="review-consent">Rozumím, že návrh nejprve projde ruční kontrolou původu a licence. <b>*</b></label></div><button class="button button-primary" type="submit">Odeslat k posouzení ↗</button><div class="form-message" id="form-message" role="status" aria-live="polite"></div></form><aside class="submit-aside"><div class="aside-card"><span class="eyebrow">Co ověřujeme</span><ul><li>Je dohledatelný původ?</li><li>Je jasné, komu obsah pomůže?</li><li>Je možné jej sdílet?</li><li>Neobsahuje citlivá data?</li></ul></div><p class="muted">Nemáme zatím backend. Toto rozhraní končí lokálním potvrzením a je připravené na připojení Netlify Forms nebo jiného schváleného adaptéru.</p></aside></section>`, 'pridat');
}

function watermark(): string {
  meta('Experimentální odstranění vodoznaku', 'Bezpečně popsaný experimentální nástroj pro vlastní exporty.');
  return shell(`${pageIntro('Experimentální nástroj', 'Odstranění vodoznaku', 'Tato stránka zatím nic nezpracovává. Nechceme předstírat bezpečné odstranění souboru bez ověřené lokální implementace.', badge('EXPERIMENTAL', 'warning'))}<section class="section wrap watermark-page"><div class="watermark-warning"><span>!</span><div><strong>Aktivní zpracování zatím není k dispozici.</strong><p>Soubor se nikam nenahrává, protože zde žádné zpracování neprobíhá. Používejte podobné nástroje jen na soubory, které smíte upravovat.</p></div></div><div class="watermark-panel"><div class="format-tabs" role="tablist"><button class="is-active" type="button" role="tab">Video</button><button type="button" role="tab">PDF</button><button type="button" role="tab">Slidy</button></div><label class="dropzone"><input id="watermark-file" type="file" accept="video/*,.pdf,.pptx" /><span class="drop-icon">↑</span><strong>Vyberte vlastní export</strong><small>MP4, WEBM, MOV, MKV, PDF nebo PPTX</small></label><p class="experimental-note">Až bude implementace dokončena, musí být explicitně ověřeno: čistě client-side zpracování, zachování metadat, omezení formátů, absence zásahu do skrytých provenance markerů a výstupní kvalita. Viditelné logo není totéž co SynthID nebo jiný neviditelný marker.</p><div id="watermark-status" class="form-message" role="status" aria-live="polite"></div></div><div class="how-it-works"><h2>Co bude potřeba doplnit</h2><ol><li>Formátově specifický parser nebo WebAssembly pipeline.</li><li>Testy, že soubor neopouští zařízení a že se nemění neoznačená data.</li><li>Jasné rozlišení mezi viditelným brandingem a provenance metadaty.</li></ol></div></section>`, 'nastroje');
}

function notFound(): string {
  meta('Stránka nenalezena', 'Požadovaná stránka v Notebook Hub CZ neexistuje.');
  return shell(`<section class="not-found wrap"><p class="eyebrow">404 / nic tady není</p><h1>Tahle stránka se ztratila mezi zdroji.</h1><p class="lead">Zkontrolujte adresu nebo se vraťte do knihovny.</p>${link('/', 'Zpět na přehled', 'button button-primary')}</section>`, '');
}

function render(): void {
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  const segments = path.split('/').filter(Boolean);
  if (path === '/') appRoot.innerHTML = home();
  else if (segments[0] === 'prompty' && segments.length === 1) appRoot.innerHTML = promptLibrary();
  else if (segments[0] === 'prompty' && segments.length === 2) appRoot.innerHTML = promptCategories.some((category) => category.id === segments[1]) ? promptLibrary(segments[1]) : notFound();
  else if (segments[0] === 'prompty' && segments.length === 3) appRoot.innerHTML = promptDetail(segments[1], segments[2]);
  else if (path === '/zdroje') appRoot.innerHTML = sourceLibrary();
  else if (path === '/nastroje') appRoot.innerHTML = toolLibrary();
  else if (path === '/nastroje/odstraneni-vodoznaku') appRoot.innerHTML = watermark();
  else if (path === '/notebooky') appRoot.innerHTML = notebookLibrary();
  else if (path === '/pruvodci') appRoot.innerHTML = guideLibrary();
  else if (segments[0] === 'pruvodci' && segments.length === 2) appRoot.innerHTML = guideDetail(segments[1]);
  else if (path === '/oblibene') appRoot.innerHTML = favorites();
  else if (path === '/pridat') appRoot.innerHTML = submitPage();
  else appRoot.innerHTML = notFound();
  window.scrollTo({ top: 0, behavior: 'instant' });
  bindPageEvents();
}

let searchTimer: number | undefined;
function navigate(href: string): void {
  history.pushState({}, '', href);
  render();
}

function toast(message: string): void {
  const element = document.querySelector<HTMLDivElement>('#toast');
  if (!element) return;
  element.textContent = message;
  element.classList.add('is-visible');
  window.setTimeout(() => element.classList.remove('is-visible'), 2200);
}

async function copyText(value: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(value);
  } catch {
    const area = document.createElement('textarea');
    area.value = value;
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.append(area);
    area.select();
    document.execCommand('copy');
    area.remove();
  }
  toast('Zkopírováno ✓');
}

async function sharePage(): Promise<void> {
  const data = { title: document.title, text: 'Notebook Hub CZ', url: window.location.href };
  if ('share' in navigator) {
    try { await navigator.share(data); return; } catch { /* user cancelled */ }
  }
  await copyText(window.location.href);
}

function bindPageEvents(): void {
  document.querySelectorAll<HTMLAnchorElement>('a[href^="/"]').forEach((anchor) => anchor.addEventListener('click', (event) => {
    if (anchor.target === '_blank' || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    navigate(anchor.getAttribute('href') ?? '/');
  }));
  document.querySelectorAll<HTMLButtonElement>('[data-action]').forEach((element) => element.addEventListener('click', async () => {
    const action = element.dataset.action ?? '';
    if (action === 'menu-open' || action === 'menu-close') {
      const menu = document.querySelector<HTMLElement>('#mobile-menu');
      const toggle = document.querySelector<HTMLButtonElement>('.menu-toggle');
      if (menu && toggle) { menu.hidden = action === 'menu-close'; toggle.setAttribute('aria-expanded', String(!menu.hidden)); }
      return;
    }
    if (action.startsWith('favorite:')) {
      const [, type, id] = action.split(':') as ['', FavoriteType, string];
      toggleFavorite(type, id);
      render();
      toast(hasFavorite(type, id) ? 'Uloženo do oblíbených' : 'Odebráno z oblíbených');
      return;
    }
    if (action.startsWith('copy:')) { await copyText(decodeURIComponent(action.slice(5))); return; }
    if (action === 'share') { await sharePage(); }
  }));
  document.querySelectorAll<HTMLInputElement>('[data-search]').forEach((input) => input.addEventListener('input', () => {
    window.clearTimeout(searchTimer);
    searchTimer = window.setTimeout(() => {
      const url = new URL(window.location.href);
      const query = input.value.trim();
      if (query) url.searchParams.set('q', query); else url.searchParams.delete('q');
      navigate(`${url.pathname}${url.search}`);
    }, 220);
  }));
  document.querySelectorAll<HTMLInputElement>('input[name="contentType"]').forEach((radio) => radio.addEventListener('change', () => {
    const promptFields = document.querySelectorAll<HTMLElement>('[data-field="prompt"], [data-field="category"]');
    const description = document.querySelector<HTMLElement>('[data-field="description"]');
    const url = document.querySelector<HTMLElement>('[data-field="url"]');
    const isPrompt = radio.value === 'prompt' && radio.checked;
    promptFields.forEach((field) => field.hidden = !isPrompt);
    if (description) description.hidden = false;
    if (url) url.hidden = isPrompt;
  }));
  const form = document.querySelector<HTMLFormElement>('#submit-form');
  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = document.querySelector<HTMLDivElement>('#form-message');
    if (!form.checkValidity()) { form.reportValidity(); return; }
    const type = form.querySelector<HTMLInputElement>('input[name="contentType"]:checked')?.value ?? 'other';
    const urlField = form.querySelector<HTMLInputElement>('input[name="url"]');
    if (urlField?.value) {
      try { new URL(urlField.value); } catch { urlField.setCustomValidity('Zadejte platnou URL.'); urlField.reportValidity(); urlField.setCustomValidity(''); return; }
    }
    if (message) { message.className = 'form-message is-success'; message.textContent = `Návrh typu „${type}“ je připravený k ruční kontrole. Backend zatím není připojen.`; }
  });
  const watermarkInput = document.querySelector<HTMLInputElement>('#watermark-file');
  watermarkInput?.addEventListener('change', () => {
    const file = watermarkInput.files?.[0];
    const status = document.querySelector<HTMLDivElement>('#watermark-status');
    if (file && status) { status.className = 'form-message is-warning'; status.textContent = `Vybrán soubor „${file.name}“. Zpracování je zatím experimentální a nebylo spuštěno.`; }
  });
}

window.addEventListener('popstate', render);
render();
