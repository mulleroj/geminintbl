import {
  guideBySlug,
  guideCategory,
  guideCategories,
  guides,
  sourceById,
  notebooks,
  notebookCategories,
  notebookCategory,
  promptBySlug,
  promptById,
  promptCategories,
  promptCategory,
  prompts,
  sourceCategories,
  sourceCategory,
  sources,
  tools,
  toolById,
  toolCategories,
  toolCategory,
  type FavoriteType,
  type Guide,
  type Prompt,
  type Source,
  type Tool,
  type PublicNotebook,
} from './data';
import { teacherWorkflows } from './data';
import type { TeacherWorkflow } from './schemas';
import { matchesSearch } from './search';
import { hasFavorite, readFavorites, readPromptViewMode, savePromptViewMode, toggleFavorite, type PromptViewMode } from './storage';
import './styles.css';

const app = document.querySelector<HTMLDivElement>('#app');
if (!app) throw new Error('Aplikace nenalezena');
const appRoot: HTMLDivElement = app;
const expandedPromptIds = new Set<string>();

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

function meta(title: string, description: string, type: 'WebSite' | 'Article' = 'WebSite', articleData?: { dateModified?: string; keywords?: string[] }): void {
  const resolvedTitle = title === 'Přehled' ? 'Notebook Hub CZ — prompty a zdroje pro Gemini Notebook' : `${title} — Notebook Hub CZ`;
  const socialImage = `${window.location.origin}/og/notebook-hub-cz.png`;
  const socialImageAlt = 'Notebook Hub CZ — české prompty, zdroje a postupy pro Gemini Notebook';
  document.title = resolvedTitle;
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
  set('meta[property="og:title"]', resolvedTitle);
  set('meta[property="og:description"]', description);
  set('meta[property="og:url"]', canonical);
  set('meta[property="og:type"]', type === 'Article' ? 'article' : 'website');
  set('meta[property="og:image"]', socialImage);
  set('meta[property="og:image:width"]', '1200');
  set('meta[property="og:image:height"]', '630');
  set('meta[property="og:image:alt"]', socialImageAlt);
  set('meta[name="twitter:card"]', 'summary_large_image');
  set('meta[name="twitter:title"]', resolvedTitle);
  set('meta[name="twitter:description"]', description);
  set('meta[name="twitter:image"]', socialImage);
  set('meta[name="twitter:image:alt"]', socialImageAlt);
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
  ld.textContent = JSON.stringify(type === 'Article' ? { '@context': 'https://schema.org', '@type': 'Article', headline: title, description, url: canonical, dateModified: articleData?.dateModified, keywords: articleData?.keywords?.join(', ') } : { '@context': 'https://schema.org', '@type': 'WebSite', name: 'Notebook Hub CZ', url: window.location.origin, potentialAction: { '@type': 'SearchAction', target: `${window.location.origin}/prompty?q={search_term_string}`, 'query-input': 'required name=search_term_string' } });
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
    ['/', 'Přehled', 'home'], ['/prompty', 'Prompty', 'prompty'], ['/zdroje', 'Zdroje', 'zdroje'], ['/nastroje', 'Nástroje', 'nastroje'], ['/notebooky', 'Notebooky', 'notebooky'], ['/pruvodci', 'Průvodci', 'pruvodci'], ['/oblibene', 'Oblíbené', 'oblibene'], ['/pro-ucitele', 'Pro učitele', 'pro-ucitele'],
  ] as const;
  return `<header class="site-header"><div class="header-inner"><a class="brand" href="/" aria-label="Notebook Hub CZ — domů"><span class="brand-mark">N</span><span><strong>Notebook Hub</strong><small>CZ / praktická knihovna</small></span></a><nav class="desktop-nav" aria-label="Hlavní navigace">${nav.map(([href, label, key]) => link(href, label, key === active ? 'is-active' : '')).join('')}</nav>${button(`${icon('menu')}<span class="visually-hidden">Otevřít menu</span>`, 'menu-open', 'menu-toggle', ' aria-controls="mobile-menu" aria-expanded="false"')}</div><div class="mobile-menu" id="mobile-menu" hidden><div class="mobile-menu-top"><span>Menu</span>${button(`${icon('close')}<span class="visually-hidden">Zavřít menu</span>`, 'menu-close', 'icon-button')}</div><nav aria-label="Mobilní navigace">${nav.map(([href, label, key]) => link(href, label, key === active ? 'is-active' : '')).join('')}</nav></div></header>`;
}

function siteFooter(): string {
  return `<footer class="site-footer"><div class="footer-grid"><div><a class="brand footer-brand" href="/"><span class="brand-mark">N</span><span><strong>Notebook Hub CZ</strong><small>Pro lidi, kteří chtějí vědět proč.</small></span></a><p class="muted">Česká knihovna promptů, zdrojů, nástrojů a průvodců pro práci s Gemini Notebook.</p></div><div><h2>Knihovna</h2><div class="footer-links">${link('/prompty', 'Prompty')}${link('/zdroje', 'Zdroje')}${link('/nastroje', 'Nástroje')}${link('/notebooky', 'Notebooky')}${link('/pruvodci', 'Průvodci')}${link('/oblibene', 'Oblíbené')}</div></div><div><h2>Projekt</h2><div class="footer-links">${link('/pridat', 'Přidat obsah')}${link('/nastroje/odstraneni-vodoznaku', 'Experimentální nástroj')}<a href="https://notebooklm.google/" target="_blank" rel="noopener noreferrer">Gemini Notebook ${icon('external')}</a></div></div></div><div class="footer-bottom"><span>© 2026 Notebook Hub CZ</span><span>Nezávislý komunitní projekt. Není spojen se společností Google. Gemini Notebook je produkt společnosti Google LLC.</span></div></footer>`;
}

function semanticMarkup(content: string, active: string): string {
  const listTitles: Record<string, string> = {
    prompty: 'Výsledky promptů',
    zdroje: 'Výsledky zdrojů',
    nastroje: 'Výsledky nástrojů',
    notebooky: 'Výsledky veřejných notebooků',
    pruvodci: 'Výsledky průvodců',
  };
  let markup = content;
  const listTitle = listTitles[active];
  if (listTitle) {
    markup = markup.replace('<section class="section wrap list-section">', `<section class="section wrap list-section"><h2 class="visually-hidden">${listTitle}</h2>`);
  }
  markup = markup.replaceAll('<h2>Knihovna</h2>', '<p class="footer-heading">Knihovna</p>')
    .replaceAll('<h2>Projekt</h2>', '<p class="footer-heading">Projekt</p>');
  if (active === 'pro-ucitele') {
    markup = markup.replaceAll('<h3>', '<h4>')
      .replace(/(<article class="card teacher-workflow-card"[^>]*>[\s\S]*?)<h2>/g, '$1<h3>')
      .replace(/(<article class="teacher-prompt-reference"[^>]*>[\s\S]*?)<h4>/g, '$1<h5>');
  }
  return markup;
}

function shell(content: string, active: string): string {
  return `${siteHeader(active)}<main id="main-content">${semanticMarkup(content, active)}</main>${semanticMarkup(siteFooter(), active)}<div id="toast" class="toast" role="status" aria-live="polite"></div>`;
}

function pageIntro(kicker: string, title: string, description: string, extras = ''): string {
  return `<section class="page-intro wrap"><div><p class="eyebrow">${esc(kicker)}</p><h1>${esc(title)}</h1><p class="lead">${esc(description)}</p></div>${extras}</section>`;
}

function stat(value: number, label: string, detail: string): string {
  return `<div class="stat"><strong>${value}</strong><span>${esc(label)}</span><small>${esc(detail)}</small></div>`;
}

function promptExpandButton(prompt: Prompt, expanded: boolean): string {
  const panelId = `prompt-preview-${prompt.id}`;
  const label = expanded ? 'Skrýt prompt ↑' : 'Zobrazit prompt ↓';
  return button(label, `expand-prompt:${prompt.id}`, 'button button-quiet prompt-expand', ` id="prompt-toggle-${prompt.id}" aria-expanded="${expanded}" aria-controls="${panelId}"`);
}

function promptPreview(prompt: Prompt, expanded: boolean): string {
  const panelId = `prompt-preview-${prompt.id}`;
  return `<div id="${panelId}" class="prompt-preview" role="region" aria-labelledby="prompt-toggle-${prompt.id}"${expanded ? '' : ' hidden'}><span class="prompt-preview-label">Prompt</span><pre>${esc(prompt.prompt)}</pre><div class="prompt-preview-actions">${copyButton(prompt.prompt, 'Kopírovat prompt')}${link(`/prompty/${prompt.category}/${prompt.slug}`, 'Detail →', 'text-link')}</div></div>`;
}

function compactPromptRow(prompt: Prompt): string {
  const category = promptCategory(prompt.category);
  const expanded = expandedPromptIds.has(prompt.id);
  return `<article class="card prompt-card compact-row"><div class="card-top">${badge(category.label, category.color)}<span class="spacer"></span>${favoriteButton('prompt', prompt.id)}</div><h3>${link(`/prompty/${prompt.category}/${prompt.slug}`, esc(prompt.title))}</h3><p>${esc(prompt.description)}</p><div class="card-meta"><span>${esc(prompt.target === 'chat-settings' ? 'Nastavení chatu' : prompt.target === 'chat' ? 'Chat' : prompt.target === 'audio' ? 'Audio' : prompt.target === 'slides' ? 'Slidy' : 'Vizuální výstup')}</span><span>${esc(prompt.tags.slice(0, 2).join(' · '))}</span></div><div class="card-actions">${copyButton(prompt.prompt)}${promptExpandButton(prompt, expanded)}${link(`/prompty/${prompt.category}/${prompt.slug}`, 'Detail →', 'text-link')}</div>${expanded ? promptPreview(prompt, true) : promptPreview(prompt, false)}</article>`;
}

function promptCard(prompt: Prompt, compact = false, enableExpansion = false, viewMode: PromptViewMode = 'cards'): string {
  if (enableExpansion && viewMode === 'compact') return compactPromptRow(prompt);
  const category = promptCategory(prompt.category);
  const expanded = enableExpansion && expandedPromptIds.has(prompt.id);
  const actions = enableExpansion
    ? (expanded ? promptExpandButton(prompt, true) : `${copyButton(prompt.prompt)}${promptExpandButton(prompt, false)}${link(`/prompty/${prompt.category}/${prompt.slug}`, 'Detail →', 'text-link')}`)
    : `${copyButton(prompt.prompt)}${link(`/prompty/${prompt.category}/${prompt.slug}`, 'Detail →', 'text-link')}`;
  return `<article class="card prompt-card${compact ? ' compact' : ''}"><div class="card-top"><span class="index-mark">${icon('spark')}</span>${badge(category.label, category.color)}<span class="spacer"></span>${favoriteButton('prompt', prompt.id)}</div><h3>${link(`/prompty/${prompt.category}/${prompt.slug}`, esc(prompt.title))}</h3><p>${esc(prompt.description)}</p><div class="card-meta"><span>${esc(prompt.target === 'chat-settings' ? 'Nastavení chatu' : prompt.target === 'chat' ? 'Chat' : prompt.target === 'audio' ? 'Audio' : prompt.target === 'slides' ? 'Slidy' : 'Vizuální výstup')}</span><span>${esc(prompt.tags.slice(0, 2).join(' · '))}</span></div><div class="card-actions">${actions}</div>${enableExpansion ? promptPreview(prompt, expanded) : ''}</article>`;
}

function sourceCard(source: Source): string {
  return `<article class="card source-card"><div class="card-top"><span class="source-icon">${esc(source.domain.slice(0, 1).toUpperCase())}</span>${badge(sourceCategory(source.category).label, 'light')}<span class="spacer"></span>${favoriteButton('source', source.id)}</div><h3><a href="${esc(source.url)}" target="_blank" rel="noopener noreferrer">${esc(source.title)} ${icon('external')}</a></h3><p>${esc(source.description)}</p><div class="card-meta"><span>${esc(sourceTypeLabels[source.sourceType])}</span><span>${esc(sourceSuitabilityLabels[source.notebookSuitability])}</span><span>${esc(sourceAccessLabels[source.access])}</span></div><p class="source-import-tip"><strong>Tip pro import:</strong> ${esc(source.importTip)}</p><div class="domain">${esc(source.domain)}</div><div class="card-actions">${copyButton(source.url, 'Kopírovat odkaz')}</div></article>`;
}

function toolCard(tool: Tool): string {
  const internal = !isExternal(tool.url);
  const category = toolCategory(tool.category);
  return `<article class="card tool-card"><div class="card-top"><span class="tool-icon">${icon('spark')}</span>${badge(category.label, 'light')}<span class="spacer"></span>${favoriteButton('tool', tool.id)}</div><h3>${internal ? link(tool.url, esc(tool.title)) : `<a href="${esc(tool.url)}" target="_blank" rel="noopener noreferrer">${esc(tool.title)} ${icon('external')}</a>`}</h3><p>${esc(tool.description)}</p><div class="card-meta"><span>${esc(tool.type)}</span>${badge(tool.pricing === 'open source' ? 'open source' : tool.pricing, 'soft')}<span>${esc(toolIntegrationLabels[tool.integrationLevel])}</span></div><div class="card-meta"><span>${esc(tool.author ?? 'Komunitní projekt')}</span><span>${esc(toolSourceLabels[tool.sourceType])}</span></div><p class="workflow-tip"><strong>Workflow:</strong> ${esc(tool.workflowTip)}</p><div class="tag-list">${tool.tags.map((tag) => `<span>#${esc(tag)}</span>`).join('')}</div></article>`;
}

function notebookCard(notebook: PublicNotebook): string {
  const category = notebookCategory(notebook.category);
  return `<article class="card notebook-card"><div class="card-top"><span class="notebook-shape">▤</span>${badge(category.label, 'light')}<span class="spacer"></span>${favoriteButton('notebook', notebook.id)}</div><h3><a href="${esc(notebook.url)}" target="_blank" rel="noopener noreferrer">${esc(notebook.title)} ${icon('external')}</a></h3><p>${esc(notebook.description)}</p><div class="card-meta"><span>${esc(notebook.publisher ?? notebook.author ?? 'Komunitní katalog')}</span><span>${esc(notebookSourceLabels[notebook.sourceType])}</span></div><div class="card-meta"><span>${esc(notebook.language.join(' · '))}</span><span>${esc(notebookAccessLabels[notebook.access])}</span></div><div class="tag-list">${notebook.topicTags.map((tag) => `<span>#${esc(tag)}</span>`).join('')}</div>${notebook.needsReview ? `<p class="review-note">${icon('spark')} Odkaz čeká na ověření</p>` : ''}</article>`;
}

function guideCard(guide: Guide): string {
  return `<article class="card guide-card"><div class="card-top"><span class="guide-number">${esc(guide.readingMinutes)} min</span>${badge(guideCategory(guide.category).label, 'light')}<span class="spacer"></span>${favoriteButton('guide', guide.id)}</div><h3>${link(`/pruvodci/${guide.slug}`, esc(guide.title))}</h3><p>${esc(guide.excerpt)}</p><div class="card-meta"><span>${esc(guideLevelLabels[guide.level])}</span><span>${esc(guide.audience.map((item) => guideAudienceLabels[item]).join(' · '))}</span></div><div class="card-meta"><span>Ověřeno ${esc(guide.lastVerified)}</span><span>${esc(guide.tags.slice(0, 3).join(' · '))}</span></div><div class="card-actions">${link(`/pruvodci/${guide.slug}`, 'Číst průvodce →', 'text-link')}</div></article>`;
}

const guideLevelLabels: Record<Guide['level'], string> = { beginner: 'Začátečník', intermediate: 'Pokročilý začátečník', advanced: 'Pokročilá práce' };
const guideAudienceLabels: Record<Guide['audience'][number], string> = { teacher: 'učitelé', student: 'studenti', researcher: 'výzkum', professional: 'profesionálové', general: 'pro všechny' };

function relatedGuideSection(guide: Guide): string {
  const promptsRelated = guide.relatedPromptIds.map(promptById).filter((prompt): prompt is Prompt => Boolean(prompt));
  const sourcesRelated = guide.relatedSourceIds.map(sourceById).filter((source): source is Source => Boolean(source));
  const toolsRelated = guide.relatedToolIds.map(toolById).filter((tool): tool is Tool => Boolean(tool));
  const workflowsRelated = guide.relatedWorkflowIds.map((id) => teacherWorkflows.find((workflow) => workflow.id === id)).filter((workflow): workflow is TeacherWorkflow => Boolean(workflow));
  const guidesRelated = (guide.relatedGuideIds ?? []).map((id) => guides.find((item) => item.id === id)).filter((item): item is Guide => Boolean(item));
  const list = (items: string, empty: string) => items || `<li class="muted">${empty}</li>`;
  return `<section class="guide-related" aria-labelledby="guide-related-title"><div class="section-heading compact-heading"><div><p class="eyebrow">Navazující práce</p><h2 id="guide-related-title">Související obsah</h2></div><p class="muted">Výběr je ručně propojený podle dalšího pracovního kroku.</p></div><div class="related-grid"><div><h3>Prompty</h3><ul>${list(promptsRelated.map((prompt) => `<li>${link(`/prompty/${prompt.category}/${prompt.slug}`, esc(prompt.title))}</li>`).join(''), 'Žádný přímý prompt.')}</ul></div><div><h3>Zdroje</h3><ul>${list(sourcesRelated.map((source) => `<li>${link(source.url, `${esc(source.title)} ${icon('external')}`)}</li>`).join(''), 'Žádný přímý zdroj.')}</ul></div><div><h3>Nástroje</h3><ul>${list(toolsRelated.map((tool) => `<li>${link(tool.url, `${esc(tool.title)} ${isExternal(tool.url) ? icon('external') : ''}`)}</li>`).join(''), 'Žádný přímý nástroj.')}</ul></div><div><h3>Workflow pro učitele</h3><ul>${list(workflowsRelated.map((workflow) => `<li>${link(`/pro-ucitele#workflow-${workflow.id}`, esc(workflow.title))}</li>`).join(''), 'Žádné přímé workflow.')}</ul></div><div><h3>Další průvodci</h3><ul>${list(guidesRelated.map((item) => `<li>${link(`/pruvodci/${item.slug}`, esc(item.title))}</li>`).join(''), 'Žádný další průvodce.')}</ul></div></div>${guide.officialReferences.length ? `<div class="guide-references"><h3>Oficiální zdroje a ověření</h3><ul>${guide.officialReferences.map((reference) => `<li>${link(reference.url, `${esc(reference.label)} ${icon('external')}`)}</li>`).join('')}</ul></div>` : ''}</section>`;
}

function guideToc(guide: Guide): string {
  const items = guide.content.map((section, index) => `<a href="#section-${index}">${esc(section.heading)}</a>`).join('');
  if (guide.content.length < 6) return `<nav class="toc" aria-label="Na stránce"><p class="eyebrow">Na stránce</p>${items}</nav>`;
  return `<details class="toc toc-collapsible" open><summary>Na stránce <span aria-hidden="true">⌄</span></summary><nav>${items}</nav></details>`;
}

const sourceTypeLabels: Record<Source['sourceType'], string> = {
  official: 'Oficiální', academic: 'Akademický', 'open-data': 'Otevřená data', library: 'Knihovna',
  archive: 'Archiv', reference: 'Referenční', journalism: 'Žurnalistika', 'fact-check': 'Fact-check',
};

const toolIntegrationLabels: Record<Tool['integrationLevel'], string> = { direct: 'Přímé', workflow: 'Workflow', adjacent: 'Doplňkové' };
const toolSourceLabels: Record<Tool['sourceType'], string> = { official: 'Oficiální', 'open-source': 'Open source', commercial: 'Komerční', community: 'Komunitní' };
const notebookSourceLabels: Record<PublicNotebook['sourceType'], string> = { official: 'Oficiální', education: 'Vzdělávací', research: 'Výzkumný', community: 'Komunitní' };
const notebookAccessLabels: Record<PublicNotebook['access'], string> = { public: 'Veřejný odkaz', 'google-account': 'Vyžaduje Google účet' };

const sourceSuitabilityLabels: Record<Source['notebookSuitability'], string> = {
  high: 'Vysoká vhodnost', medium: 'Střední vhodnost', limited: 'Omezená vhodnost',
};

const sourceAccessLabels: Record<Source['access'], string> = {
  free: 'Volně dostupné', freemium: 'Freemium', paid: 'Placené', institutional: 'Institucionální přístup',
};

const productTransition = 'Gemini Notebook (dříve NotebookLM)';

const teacherWorkflowLabels: Record<TeacherWorkflow['category'], string> = {
  lesson: 'Příprava hodiny', worksheet: 'Pracovní list', assessment: 'Hodnocení', spu: 'SPU / přístupnost',
  differentiation: 'Diferenciace', language: 'Cizí jazyk', vocational: 'Odborné vzdělávání', visual: 'Vizuální výstup', 'audio-video': 'Audio / video',
};

function teacherPromptReference(promptId: string): string {
  const prompt = promptById(promptId);
  if (!prompt) return `<p class="generator-feedback">Prompt ${esc(promptId)} nebyl nalezen.</p>`;
  return `<article class="teacher-prompt-reference"><div><span class="eyebrow">Existující prompt</span><h3>${link(`/prompty/${prompt.category}/${prompt.slug}`, esc(prompt.title))}</h3><p>${esc(prompt.description)}</p></div><div class="card-actions">${copyButton(prompt.prompt, 'Kopírovat prompt')}${link(`/prompty/${prompt.category}/${prompt.slug}`, 'Detail promptu →', 'text-link')}</div></article>`;
}

function teacherWorkflowCard(workflow: TeacherWorkflow, open = false): string {
  return `<article class="card teacher-workflow-card" id="workflow-${esc(workflow.id)}"><div class="card-top">${badge(teacherWorkflowLabels[workflow.category], 'light')}${workflow.difficulty ? badge(workflow.difficulty, 'soft') : ''}<span class="spacer"></span>${workflow.featured ? badge('Doporučené', 'light') : ''}</div><h2>${esc(workflow.title)}</h2><p class="workflow-lead">${esc(workflow.description)}</p><p class="teacher-goal"><strong>Cíl:</strong> ${esc(workflow.goal)}</p><details${open ? ' open' : ''}><summary>Jak to použít</summary><div class="teacher-recipe"><section><h3>Co si připravit</h3><ul>${workflow.whatYouNeed.map((item) => `<li>${esc(item)}</li>`).join('')}</ul></section><section><h3>1. Co nahrát do Gemini Notebook</h3><ul>${workflow.sourcesToUpload.map((item) => `<li>${esc(item)}</li>`).join('')}</ul></section><section><h3>2. Který prompt použít</h3><div class="teacher-prompt-list">${workflow.promptIds.map(teacherPromptReference).join('')}</div></section><section><h3>3. Jak postupovat</h3><ol>${workflow.steps.map((item) => `<li>${esc(item)}</li>`).join('')}</ol></section><section><h3>4. Co zkontrolovat</h3><ul>${workflow.checkBeforeUse.map((item) => `<li>${esc(item)}</li>`).join('')}</ul></section>${workflow.followUp?.length ? `<section><h3>5. Co udělat s výsledkem</h3><ul>${workflow.followUp.map((item) => `<li>${esc(item)}</li>`).join('')}</ul></section>` : ''}${workflow.generatorRoute ? `<div class="teacher-generator-link"><strong>Související generátor</strong>${link(workflow.generatorRoute, 'Otevřít interní generátor →', 'button button-secondary')}</div>` : ''}</div></details></article>`;
}

function teacherHub(): string {
  meta('Pro učitele', 'Praktické workflow pro učitele: od zdrojů přes existující prompty po kontrolovaný výstup v Gemini Notebook.');
  const quick = teacherWorkflows.filter((workflow) => workflow.featured).slice(0, 8);
  return shell(`${pageIntro('Praktická učitelská vrstva', 'Gemini Notebook pro učitele', 'Vyberte podle toho, co dnes potřebujete vytvořit. Každý postup říká, co připravit, co nahrát do Gemini Notebook, který existující prompt použít a co před použitím zkontrolovat.', `<span class="count-stamp"><strong>${teacherWorkflows.length}</strong><small>praktických workflow</small></span>`)}<section class="section wrap teacher-quick"><div class="section-heading"><div><p class="eyebrow">Rychlé volby</p><h2>Začněte konkrétním úkolem.</h2></div></div><div class="quick-links">${quick.map((workflow) => link(`/pro-ucitele#workflow-${workflow.id}`, workflow.title, 'chip')).join('')}</div></section><section class="section section-tint"><div class="wrap"><div class="section-heading"><div><p class="eyebrow">Recepty pro výuku</p><h2>Od zdroje k použitelnému výstupu.</h2></div><p class="muted">${teacherWorkflows.length} workflow bez kopírování textu promptů.</p></div><div class="teacher-workflow-grid">${teacherWorkflows.map((workflow, index) => teacherWorkflowCard(workflow, index === 0)).join('')}</div></div></section>`, 'pro-ucitele');
}

function legacyHome(): string {
  meta('Přehled', 'Česká knihovna promptů, zdrojů, nástrojů a návodů pro Gemini Notebook.');
  const featured = prompts.filter((prompt) => prompt.featured).slice(0, 6);
  return shell(`<section class="hero"><div class="wrap hero-grid"><div><p class="eyebrow">Notebook Hub CZ <span class="dot"></span> bez účtu</p><h1>Vytěžte z notebooku<br /><em>víc než souhrn.</em></h1><p class="hero-copy">Promyšlené prompty, ověřené zdroje a praktické postupy pro práci s Gemini Notebook — v češtině, s jasným původem a bez zbytečného šumu.</p><div class="hero-actions">${link('/prompty', 'Procházet prompty ↗', 'button button-primary')}${link('/zdroje', 'Důvěryhodné zdroje', 'button button-quiet')}</div><p class="hero-note"><span class="status-dot"></span> ${esc(productTransition)} · obsah roste s každým ověřeným příspěvkem.</p></div><div class="hero-aside"><div class="hero-note-card"><span class="eyebrow">Dnešní pracovní otázka</span><p>Co musí být v odpovědi doložené, aby jí šlo věřit?</p><div class="line-list"><span>01 / ověřit zdroje</span><span>02 / najít mezery</span><span>03 / teprve potom tvořit</span></div></div></div></div></section><section class="stats-section wrap"><div class="stats-grid">${stat(prompts.length, 'promptů', 'ke kopírování')}${stat(sources.length, 'zdrojů', 's tipem k importu')}${stat(tools.length, 'nástrojů', 'pro lepší workflow')}${stat(notebooks.length, 'notebooků', 'k prozkoumání')}${stat(guides.length, 'průvodců', 'česky a prakticky')}</div></section><section class="section wrap"><div class="section-heading"><div><p class="eyebrow">Začněte tady</p><h2>Prompty, které mají jasný účel.</h2></div>${link('/prompty', 'Všechny prompty →', 'text-link')}</div><div class="card-grid prompt-grid">${featured.map((prompt) => promptCard(prompt, true)).join('')}</div></section><section class="section section-tint"><div class="wrap"><div class="section-heading"><div><p class="eyebrow">Najděte svůj způsob</p><h2>Procházet podle potřeby</h2></div>${link('/prompty', 'Knihovna promptů →', 'text-link')}</div><div class="category-grid">${promptCategories.map((category) => `<a class="category-card category-${esc(category.color)}" href="/prompty/${category.id}"><span>${esc(category.eyebrow)}</span><strong>${esc(category.label)}</strong><small>${prompts.filter((prompt) => prompt.category === category.id).length} promptů</small><i>↗</i></a>`).join('')}</div></div></section><section class="section wrap"><div class="section-heading"><div><p class="eyebrow">Váš research začíná zde</p><h2>Zdroje, které stojí za otevřením.</h2></div>${link('/zdroje', 'Všechny zdroje →', 'text-link')}</div><div class="card-grid source-grid">${sources.filter((source) => source.featured).slice(0, 4).map(sourceCard).join('')}</div></section><section class="section section-tint"><div class="wrap split-sections"><div><div class="section-heading compact-heading"><div><p class="eyebrow">Rozšířit možnosti</p><h2>Nástroje</h2></div>${link('/nastroje', 'Všechny →', 'text-link')}</div><div class="mini-list">${tools.filter((tool) => tool.featured).slice(0, 3).map((tool) => `<a href="${esc(tool.url)}"${isExternal(tool.url) ? ' target="_blank" rel="noopener noreferrer"' : ''}><span>${icon('spark')}</span><span><strong>${esc(tool.title)}</strong><small>${esc(tool.type)} · ${esc(tool.pricing)}</small></span><b>↗</b></a>`).join('')}</div></div><div><div class="section-heading compact-heading"><div><p class="eyebrow">Prozkoumat strukturu</p><h2>Veřejné notebooky</h2></div>${link('/notebooky', 'Všechny →', 'text-link')}</div><div class="mini-list">${notebooks.slice(0, 3).map((notebook) => `<a href="${esc(notebook.url)}" target="_blank" rel="noopener noreferrer"><span>${icon('spark')}</span><span><strong>${esc(notebook.title)}</strong><small>${esc(notebook.category)}</small></span><b>↗</b></a>`).join('')}</div></div></div></section><section class="section wrap"><div class="section-heading"><div><p class="eyebrow">Číst a používat</p><h2>Průvodci pro český kontext.</h2></div>${link('/pruvodci', 'Všechny průvodce →', 'text-link')}</div><div class="card-grid guide-grid">${guides.slice(0, 3).map(guideCard).join('')}</div></section><section class="contribution wrap"><div><p class="eyebrow">Máte něco, co funguje?</p><h2>Dobrá knihovna roste<br />z dobrých příspěvků.</h2></div><div><p>Pošlete prompt, zdroj nebo nástroj. Každý návrh projde kontrolou původu a použitelnosti.</p>${link('/pridat', 'Přidat obsah →', 'button button-primary')}</div></section>`, 'home');
}

function teacherHomeSection(): string {
  const quick = teacherWorkflows.filter((workflow) => workflow.featured).slice(0, 4);
  return `<section class="section section-tint teacher-home-section"><div class="wrap"><div class="section-heading"><div><p class="eyebrow">Pro učitele</p><h2>Co dnes potřebujete připravit?</h2></div>${link('/pro-ucitele', 'Všechny postupy pro učitele →', 'text-link')}</div><div class="teacher-home-grid">${quick.map((workflow) => `<a class="teacher-home-card" href="/pro-ucitele#workflow-${workflow.id}"><span>${esc(teacherWorkflowLabels[workflow.category])}</span><strong>${esc(workflow.title)}</strong><small>${esc(workflow.description)}</small><b>→</b></a>`).join('')}</div></div></section>`;
}

function insertHomepageSectionAfter(page: string, sectionClass: string, section: string): string {
  const sectionStart = page.indexOf(`<section class="${sectionClass}`);
  if (sectionStart < 0) return page;
  const sectionEnd = page.indexOf('</section>', sectionStart);
  if (sectionEnd < 0) return page;
  const insertAt = sectionEnd + '</section>'.length;
  return `${page.slice(0, insertAt)}${section}${page.slice(insertAt)}`;
}

function home(): string {
  return insertHomepageSectionAfter(legacyHome(), 'stats-section wrap', teacherHomeSection());
}

function promptLibrary(categoryId = ''): string {
  const params = new URLSearchParams(window.location.search);
  const query = params.get('q') ?? '';
  const activeCategory = categoryId || params.get('kategorie') || '';
  const category = activeCategory ? promptCategory(activeCategory) : undefined;
  const viewMode = readPromptViewMode();
  const filtered = prompts.filter((prompt) => (!activeCategory || prompt.category === activeCategory) && matchesSearch([prompt.title, prompt.description, prompt.prompt, prompt.tags.join(' '), prompt.author], query));
  meta(category ? category.label : 'Prompty', `${filtered.length} promptů v české knihovně Notebook Hub CZ.`);
  const heading = category ? `${category.label}` : 'Prompty pro práci, studium i výzkum';
  const description = category ? category.description : 'Vyberte si výchozí bod, zkopírujte prompt a přizpůsobte jej svému notebooku.';
  const viewSwitch = `<div class="library-control-row"><span class="view-switch-label">Zobrazení</span><div class="view-switch" role="group" aria-label="Zobrazení katalogu">${button('Karty', 'view-mode:cards', `view-switch-button${viewMode === 'cards' ? ' is-active' : ''}`, ` aria-pressed="${viewMode === 'cards'}"`)}${button('Kompaktní', 'view-mode:compact', `view-switch-button${viewMode === 'compact' ? ' is-active' : ''}`, ` aria-pressed="${viewMode === 'compact'}"`)}</div></div>`;
  const renderedPrompts = filtered.map((prompt) => promptCard(prompt, false, true, viewMode)).join('');
  return shell(`${pageIntro('Knihovna promptů', heading, description, `<span class="count-stamp"><strong>${filtered.length}</strong><small>z ${prompts.length} promptů</small></span>`)}<section class="library-controls wrap">${searchBox('Hledat v promptech…', query, 'Hledat v promptech')}${viewSwitch}${categoryChips(activeCategory)}</section><section class="section wrap list-section"><div class="list-heading"><p>${filtered.length ? `Zobrazeno ${filtered.length} ${filtered.length === 1 ? 'položka' : 'položek'}` : 'Nic nenalezeno'}</p>${activeCategory ? link('/prompty', 'Zrušit filtr ×', 'text-link') : ''}</div>${filtered.length ? `<div class="card-grid prompt-grid prompt-results ${viewMode === 'compact' ? 'is-compact' : ''}">${renderedPrompts}</div>` : `<div class="empty-state"><span>${icon('search')}</span><h2>Zkuste jiná slova</h2><p>Hledání rozumí české diakritice. Zkuste například „učitel“, „zdroje“ nebo „zkouška“.</p>${link('/prompty', 'Zobrazit všechny prompty', 'button button-secondary')}</div>`}</section>`, 'prompty');
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
  const filtered = sources.filter((source) => (!active || source.category === active) && matchesSearch([
    source.title,
    source.description,
    source.domain,
    sourceCategory(source.category).label,
    source.importTip,
    source.sourceType,
    source.notebookSuitability,
    source.language.join(' '),
    source.region.join(' '),
    source.sourceLabel,
    source.category === 'legislation' ? 'zákony právo' : '',
    source.category === 'statistics' ? 'statistiky data' : '',
    source.category === 'science' ? 'věda výzkum' : '',
    source.category === 'history-archives' ? 'historie archiv' : '',
    source.category === 'czech-language' ? 'čeština český jazyk' : '',
    source.category === 'economics' ? 'ekonomika' : '',
    source.category === 'education' ? 'školství vzdělávání' : '',
    source.category === 'eu' ? 'EU evropská unie' : '',
    source.category === 'journalism-fact-check' ? 'žurnalistika ověřování' : '',
  ], query));
  meta('Důvěryhodné zdroje', `${filtered.length} zdrojů, které můžete přidat do Gemini Notebook.`);
  return shell(`${pageIntro('Knihovna zdrojů', 'Začněte u zdroje, kterému rozumíte.', 'Ověřené instituce, archivy a datové katalogy s krátkým tipem, jak je přidat do Gemini Notebook.', `<span class="count-stamp"><strong>${filtered.length}</strong><small>z ${sources.length} zdrojů</small></span>`)}<section class="library-controls wrap">${searchBox('Hledat ve zdrojích…', query, 'Hledat ve zdrojích')}<div class="chip-row" aria-label="Kategorie zdrojů">${link('/zdroje', 'Všechny', `chip${!active ? ' is-active' : ''}`)}${categories.map((category) => link(`/zdroje?kategorie=${encodeURIComponent(category.id)}`, `${esc(category.label)} <small>${sources.filter((source) => source.category === category.id).length}</small>`, `chip${active === category.id ? ' is-active' : ''}`)).join('')}</div></section><section class="section wrap list-section"><div class="list-heading"><p>${filtered.length} zdrojů</p>${active ? link('/zdroje', 'Zrušit filtr ×', 'text-link') : ''}</div><div class="source-category-note"><span>${icon('spark')}</span><p><strong>Tip pro import:</strong> kopírujte konkrétní URL zdroje, ne jen obecný dotaz. U citlivých nebo placených materiálů si nejprve ověřte přístupová práva.</p></div><div class="card-grid source-grid">${filtered.map(sourceCard).join('')}</div>${filtered.length ? `<div class="bulk-copy-row"><span>Kategorie ${active ? esc(sourceCategory(active).label) : 'všechny zdroje'}</span>${copyButton(filtered.map((source) => source.url).join('\n'), 'Kopírovat všechny odkazy')}</div>` : `<div class="empty-state"><h2>Nic nenalezeno</h2><p>Zkuste název instituce, doménu nebo kategorii.</p></div>`}</section>`, 'zdroje');
}

function catalogToolLibrary(): string {
  const params = new URLSearchParams(window.location.search);
  const query = params.get('q') ?? '';
  const active = params.get('kategorie') ?? '';
  const filtered = tools.filter((tool) => !tool.url.startsWith('/nastroje/generator-') && (!active || tool.category === active) && matchesSearch([tool.title, tool.description, tool.author, tool.type, tool.workflowTip, toolCategory(tool.category).label, tool.tags.join(' ')], query));
  meta('Nástroje', `${filtered.length} nástrojů pro import, organizaci a výzkum.`);
  return shell(`${pageIntro('Katalog nástrojů', 'Méně ruční práce. Více prostoru na myšlení.', 'Komunitní i oficiální nástroje pro import, organizaci, výzkum a export. Každý záznam má kategorii, úroveň napojení, cenu a datum ověření.', `<span class="count-stamp"><strong>${filtered.length}</strong><small>nástrojů v katalogu</small></span>`)}<section class="library-controls wrap">${searchBox('Hledat v nástrojích…', query, 'Hledat v nástrojích')}<div class="chip-row" aria-label="Kategorie nástrojů">${link('/nastroje', 'Všechny', `chip${!active ? ' is-active' : ''}`)}${toolCategories.map((category) => link(`/nastroje?kategorie=${encodeURIComponent(category.id)}`, `${esc(category.label)} <small>${tools.filter((tool) => tool.category === category.id).length}</small>`, `chip${active === category.id ? ' is-active' : ''}`)).join('')}</div></section><section class="section wrap list-section"><div class="notice"><strong>${icon('spark')} Bezpečné odkazy</strong><span>Externí odkazy se otevírají v nové kartě. Před instalací vždy zkontrolujte autora, oprávnění a zacházení se soubory.</span></div><div class="list-heading"><p>${filtered.length} nástrojů${active ? ` · ${esc(toolCategory(active).label)}` : ''}</p>${active ? link('/nastroje', 'Zrušit filtr ×', 'text-link') : ''}</div><div class="card-grid tool-grid">${filtered.map(toolCard).join('')}</div>${filtered.length ? '' : `<div class="empty-state"><h2>Nic nenalezeno</h2><p>Zkuste jiný název, kategorii nebo úroveň napojení.</p></div>`}</section>`, 'nastroje');
}

function semanticGeneratorMarkup(markup: string): string {
  return markup.replace(/<section class="section section-tint generator-library-section">[\s\S]*?<\/section>/, (section) => section
    .replace('<section class="section section-tint generator-library-section">', '<section class="section section-tint generator-library-section" aria-labelledby="generator-library-title">')
    .replace('<h2>Generátory Notebook Hub CZ</h2>', '<p class="section-heading-title" id="generator-library-title">Generátory Notebook Hub CZ</p>')
    .replaceAll('<h3>', '<strong class="card-title">')
    .replaceAll('</h3>', '</strong>'));
}

function toolLibrary(): string {
  const generatorTools = tools.filter((tool) => tool.url.startsWith('/nastroje/generator-'));
  const section = `<section class="section section-tint generator-library-section"><div class="wrap"><div class="section-heading"><div><p class="eyebrow">Notebook Hub CZ</p><h2>Generátory Notebook Hub CZ</h2></div><p class="muted">Tři interní formuláře pro prompt, ne hotový výstup.</p></div><div class="card-grid tool-grid">${generatorTools.map(toolCard).join('')}</div></div></section>`;
  return semanticGeneratorMarkup(catalogToolLibrary().replace('<main id="main-content">', `<main id="main-content">${section}`));
}

function notebookLibrary(): string {
  const params = new URLSearchParams(window.location.search);
  const query = params.get('q') ?? '';
  const active = params.get('kategorie') ?? '';
  const filtered = notebooks.filter((notebook) => (!active || notebook.category === active) && matchesSearch([notebook.title, notebook.description, notebookCategory(notebook.category).label, notebook.publisher, notebook.author, notebook.language.join(' '), notebook.region.join(' '), notebook.topicTags.join(' ')], query));
  meta('Veřejné notebooky', `${filtered.length} veřejných notebooků a ukázek struktury.`);
  return shell(`${pageIntro('Veřejné notebooky', 'Podívejte se, jak to poskládali ostatní.', 'Skutečně otevřitelné veřejné nebo sdílené notebooky s uvedeným tématem, původem, jazykem a datem ručního ověření.', `<span class="count-stamp"><strong>${filtered.length}</strong><small>notebooků v katalogu</small></span>`)}<section class="library-controls wrap">${searchBox('Hledat v noteboocích…', query, 'Hledat v noteboocích')}<div class="chip-row" aria-label="Kategorie notebooků">${link('/notebooky', 'Všechny', `chip${!active ? ' is-active' : ''}`)}${notebookCategories.map((category) => link(`/notebooky?kategorie=${encodeURIComponent(category.id)}`, `${esc(category.label)} <small>${notebooks.filter((notebook) => notebook.category === category.id).length}</small>`, `chip${active === category.id ? ' is-active' : ''}`)).join('')}</div></section><section class="section wrap list-section"><div class="notice"><strong>${icon('spark')} Přístup</strong><span>Veřejný odkaz může vyžadovat přihlášení ke Google účtu. Před použitím si ověřte aktuální obsah a oprávnění ke zdrojům.</span></div><div class="list-heading"><p>${filtered.length} notebooků${active ? ` · ${esc(notebookCategory(active).label)}` : ''}</p>${active ? link('/notebooky', 'Zrušit filtr ×', 'text-link') : ''}</div><div class="card-grid notebook-grid">${filtered.map(notebookCard).join('')}</div>${filtered.length ? '' : `<div class="empty-state"><h2>Nic nenalezeno</h2><p>Zkuste jiný název, jazyk, region nebo kategorii.</p></div>`}</section>`, 'notebooky');
}

function guideLibrary(): string {
  const params = new URLSearchParams(window.location.search);
  const query = params.get('q') ?? '';
  const active = params.get('kategorie') ?? '';
  const filtered = guides.filter((guide) => (!active || guide.category === active) && matchesSearch([guide.title, guide.excerpt, guideCategory(guide.category).label, guide.tags.join(' '), guide.level, guide.audience.map((item) => guideAudienceLabels[item]).join(' ')], query));
  meta('Průvodci', `${filtered.length} českých průvodců pro práci s Gemini Notebook.`);
  return shell(`${pageIntro('Knihovna průvodců', 'Praktické odpovědi pro skutečnou práci.', 'Krátké české návody bez velkých slibů — od prvního notebooku po ověřování a archivaci.', `<span class="count-stamp"><strong>${filtered.length}</strong><small>z ${guides.length} průvodců</small></span>`)}<section class="library-controls wrap">${searchBox('Hledat v průvodcích…', query, 'Hledat v průvodcích')}<div class="chip-row" aria-label="Kategorie průvodců">${link('/pruvodci', 'Všechny', `chip${!active ? ' is-active' : ''}`)}${guideCategories.map((category) => link(`/pruvodci?kategorie=${encodeURIComponent(category.id)}`, esc(category.label), `chip${active === category.id ? ' is-active' : ''}`)).join('')}</div></section><section class="section wrap list-section"><div class="card-grid guide-grid">${filtered.map(guideCard).join('')}</div></section>`, 'pruvodci');
}

function guideDetail(slug: string): string {
  const guide = guideBySlug(slug);
  if (!guide) return notFound();
  meta(guide.title, guide.excerpt, 'Article', { dateModified: guide.lastVerified, keywords: guide.tags });
  return shell(`<article class="article-wrap wrap">${breadcrumb([['Průvodci', '/pruvodci'], [guideCategory(guide.category).label, `/pruvodci?kategorie=${encodeURIComponent(guide.category)}`], [guide.title, '#']])}<header class="article-header"><div class="detail-kicker">${badge(guideCategory(guide.category).label, 'light')} ${badge(guideLevelLabels[guide.level], 'soft')} <span>${esc(guide.readingMinutes)} min čtení</span></div><h1>${esc(guide.title)}</h1><p class="lead">${esc(guide.excerpt)}</p><div class="article-meta"><span>Ověřeno ${esc(guide.lastVerified)}</span><span>Pro: ${esc(guide.audience.map((item) => guideAudienceLabels[item]).join(' · '))}</span><span>Autor: ${esc(guide.author ?? 'Notebook Hub CZ')}</span><span class="spacer"></span>${favoriteButton('guide', guide.id)}${button(`${icon('share')} Sdílet`, 'share', 'icon-button')}</div>${guide.availabilityNote ? `<aside class="guide-availability"><strong>${icon('spark')} Dostupnost a účet</strong><p>${esc(guide.availabilityNote)}</p></aside>` : ''}</header><div class="article-layout">${guideToc(guide)}<div class="prose">${guide.content.map((section, index) => `<section id="section-${index}"><h2>${esc(section.heading)}</h2>${section.paragraphs.map((paragraph) => `<p>${esc(paragraph)}</p>`).join('')}${section.bullets ? `<ul>${section.bullets.map((bullet) => `<li>${esc(bullet)}</li>`).join('')}</ul>` : ''}</section>`).join('')}<div class="article-callout"><strong>${icon('spark')} Kontrolní otázka</strong><p>Co v tomto postupu vyžaduje vaše vlastní ověření nebo znalost kontextu?</p></div></div></div>${relatedGuideSection(guide)}</article><section class="section section-tint"><div class="wrap"><div class="section-heading"><div><p class="eyebrow">Další čtení</p><h2>Pokračovat v knihovně</h2></div></div><div class="card-grid guide-grid">${(guide.relatedGuideIds ?? []).map((id) => guides.find((item) => item.id === id)).filter((item): item is Guide => Boolean(item)).slice(0, 3).map(guideCard).join('')}</div></div></section>`, 'pruvodci');
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

function generatorRoute(path: string): void {
  const metadata: Record<string, [string, string]> = {
    '/nastroje/generator-prezentace': ['Generátor promptu pro prezentaci', 'Interní generátor promptu pro prezentace z ověřené osnovy a zdrojů.'],
    '/nastroje/generator-infografiky': ['Generátor promptu pro infografiku', 'Interní generátor promptu pro infografiky s nastavením stylu, layoutu a kontroly typografie.'],
    '/nastroje/generator-audio-video': ['Generátor promptu pro audio a video', 'Interní generátor promptu pro audio, video a filmový overview.'],
  };
  const [title, description] = metadata[path] ?? ['Generátor promptu', 'Interní generátor promptu Notebook Hub CZ.'];
  meta(title, description);
  appRoot.innerHTML = shell(`<section class="section wrap generator-loading"><p class="eyebrow">Interní generátor</p><h1>Načítám formulář…</h1><p class="lead">Připravuji jen modul potřebný pro tuto route.</p></section>`, 'nastroje');
  const load = path === '/nastroje/generator-prezentace'
    ? import('./generators/presentation/view').then((module) => ({ render: module.renderPresentationGenerator, mount: module.mountPresentationGenerator }))
    : path === '/nastroje/generator-infografiky'
      ? import('./generators/infographic/view').then((module) => ({ render: module.renderInfographicGenerator, mount: module.mountInfographicGenerator }))
      : import('./generators/audio-video/view').then((module) => ({ render: module.renderAudioVideoGenerator, mount: module.mountAudioVideoGenerator }));
  void load.then(({ render: renderGenerator, mount }) => {
    if (window.location.pathname !== path) return;
    appRoot.innerHTML = shell(renderGenerator(), 'nastroje');
    bindPageEvents();
    mount(appRoot);
  }).catch(() => {
    if (window.location.pathname === path) appRoot.innerHTML = shell(`<section class="section wrap empty-state"><h1>Generátor se nepodařilo načíst.</h1><p>Zkuste route obnovit nebo se vraťte do katalogu nástrojů.</p>${link('/nastroje', 'Zpět do nástrojů', 'button button-primary')}</section>`, 'nastroje');
  });
}

function slideEditorRoute(): void {
  const path = '/nastroje/editor-prezentaci';
  meta('Editor prezentací', 'Nahrajte PDF prezentaci z NotebookLM, upravte text a exportujte editovatelný PowerPoint.');
  appRoot.innerHTML = shell(`<section class="section wrap generator-loading"><p class="eyebrow">Lokální nástroj</p><h1>Načítám editor prezentací…</h1><p class="lead">Připravuji PDF, OCR a exportní modul potřebný pro tuto route.</p></section>`, 'nastroje');
  void import('./slide-editor/view').then((module) => {
    if (window.location.pathname.replace(/\/$/, '') !== path) return;
    appRoot.innerHTML = shell(module.renderSlideEditor(), 'nastroje');
    bindPageEvents();
    module.mountSlideEditor(appRoot);
  }).catch(() => {
    if (window.location.pathname.replace(/\/$/, '') === path) appRoot.innerHTML = shell(`<section class="section wrap empty-state"><h1>Editor se nepodařilo načíst.</h1><p>Zkuste route obnovit nebo se vraťte do katalogu nástrojů.</p>${link('/nastroje', 'Zpět do nástrojů', 'button button-primary')}</section>`, 'nastroje');
  });
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
  else if (path === '/nastroje/editor-prezentaci') slideEditorRoute();
  else if (path === '/nastroje/generator-prezentace' || path === '/nastroje/generator-infografiky' || path === '/nastroje/generator-audio-video') generatorRoute(path);
  else if (path === '/nastroje/odstraneni-vodoznaku') appRoot.innerHTML = watermark();
  else if (path === '/pro-ucitele') appRoot.innerHTML = teacherHub();
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
  const hash = window.location.hash.slice(1);
  if (!hash) return;
  window.requestAnimationFrame(() => {
    const target = document.getElementById(decodeURIComponent(hash));
    target?.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
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
    if (action.startsWith('expand-prompt:')) {
      const id = action.slice('expand-prompt:'.length);
      const expanded = !expandedPromptIds.has(id);
      if (expanded) expandedPromptIds.add(id); else expandedPromptIds.delete(id);
      const panel = document.querySelector<HTMLElement>(`#prompt-preview-${CSS.escape(id)}`);
      const toggle = document.querySelector<HTMLButtonElement>(`#prompt-toggle-${CSS.escape(id)}`);
      if (panel && toggle) {
        panel.hidden = !expanded;
        toggle.setAttribute('aria-expanded', String(expanded));
        toggle.innerHTML = expanded ? 'Skrýt prompt ↑' : 'Zobrazit prompt ↓';
      }
      return;
    }
    if (action.startsWith('view-mode:')) {
      const mode = action.slice('view-mode:'.length) as PromptViewMode;
      if (mode === 'cards' || mode === 'compact') { savePromptViewMode(mode); render(); }
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
      const wasFocused = document.activeElement === input;
      const selectionEnd = input.selectionEnd ?? input.value.length;
      window.history.replaceState({}, '', `${url.pathname}${url.search}`);
      render();
      if (wasFocused) {
        const nextInput = document.querySelector<HTMLInputElement>('[data-search]');
        nextInput?.focus();
        const nextPosition = Math.min(selectionEnd, nextInput?.value.length ?? selectionEnd);
        nextInput?.setSelectionRange(nextPosition, nextPosition);
      }
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
