import type { CatalogCategory, GuideCategory, PromptCategory, SourceCategory } from '../schemas';

export const promptCategories: PromptCategory[] = [
  { id: 'deep-analysis', label: 'Hloubková analýza', eyebrow: 'Pochopit', description: 'Porovnávejte zdroje, hledejte rozpory a ověřujte závěry.', color: 'sage' },
  { id: 'setup-accuracy', label: 'Nastavení a přesnost', eyebrow: 'Nastavit', description: 'Dejte chatu jasná pravidla, limity a ověřovací stopu.', color: 'blue' },
  { id: 'study-exam-prep', label: 'Studium a příprava', eyebrow: 'Naučit se', description: 'Proměňte materiály v otázky, kartičky a plán učení.', color: 'amber' },
  { id: 'audio-overviews', label: 'Audio přehledy', eyebrow: 'Poslouchat', description: 'Navrhněte scénář, role hostů i rytmus audio přehledu.', color: 'rose' },
  { id: 'slides-video-infographics', label: 'Prezentace a vizuály', eyebrow: 'Vytvořit', description: 'Získejte srozumitelnou osnovu pro slidy, video nebo infografiku.', color: 'violet' },
  { id: 'writing-content', label: 'Psaní a tvorba obsahu', eyebrow: 'Napsat', description: 'Tvořte texty pevně ukotvené v dodaných zdrojích.', color: 'teal' },
  { id: 'strategy-decisions', label: 'Strategie a rozhodování', eyebrow: 'Rozhodnout', description: 'Oddělte fakta, varianty, rizika a další kroky.', color: 'orange' },
  { id: 'workflows', label: 'Workflow', eyebrow: 'Opakovat', description: 'Sestavte z více kroků spolehlivý pracovní postup.', color: 'slate' },
  { id: 'teaching', label: 'Pro učitele', eyebrow: 'Vyučovat', description: 'Připravte hodinu, materiály a hodnocení ukotvené ve zdrojích.', color: 'plum' },
];

export const sourceCategories: SourceCategory[] = [
  { id: 'education', label: 'Školství', description: 'Instituce, zprávy a podklady pro české vzdělávání.' },
  { id: 'legislation', label: 'Legislativa', description: 'Parlamentní a právní dokumenty s dohledatelným kontextem.' },
  { id: 'statistics', label: 'Statistiky a data', description: 'Oficiální statistiky, datové řady, otevřená data a metodiky.' },
  { id: 'economics', label: 'Ekonomika', description: 'Ekonomická data, zprávy a měnové souvislosti.' },
  { id: 'science', label: 'Věda a výzkum', description: 'Výzkumné instituce, repozitáře a odborné publikace.' },
  { id: 'history-archives', label: 'Historie a archivy', description: 'Archivní fondy, digitální knihovny a kulturní dědictví.' },
  { id: 'czech-language', label: 'Český jazyk a literatura', description: 'Slovníky, korpusy, katalogy a zdroje pro práci s češtinou.' },
  { id: 'eu', label: 'Evropská unie', description: 'Právo, data, výzkum a instituce Evropské unie.' },
  { id: 'international', label: 'Mezinárodní zdroje', description: 'Globální data, instituce a odborné referenční zdroje.' },
  { id: 'journalism-fact-check', label: 'Žurnalistika a ověřování', description: 'Redakční zdroje, fact-checking a dohledatelné veřejné databáze.' },
];

export const guideCategories: GuideCategory[] = [
  { id: 'zacinate', label: 'Začínáme', description: 'Základní orientace, notebook, zdroje a první ověřitelný výstup.' },
  { id: 'ucitele', label: 'Pro učitele', description: 'Příprava hodin, diferenciace a materiály pro práci ve třídě.' },
  { id: 'studio-vystupy', label: 'Studio a výstupy', description: 'Audio, video, mapy, kvízy, infografiky a další výstupy ze zdrojů.' },
  { id: 'vyzkum', label: 'Výzkum a analýza', description: 'Porovnávání, důkazní stopa a práce s více dokumenty.' },
  { id: 'bezpecnost-kvalita', label: 'Bezpečnost a kvalita', description: 'Ověřování, autorská práva, osobní údaje a archivace.' },
];

export const toolCategories: CatalogCategory[] = [
  { id: 'google-ecosystem', label: 'Google ekosystém', description: 'Služby Google pro zdroje, dokumenty, výzkum a export.' },
  { id: 'source-prep', label: 'Příprava zdrojů', description: 'Čištění, extrakce a příprava webových podkladů před importem.' },
  { id: 'research-citations', label: 'Výzkum a citace', description: 'Vyhledávání literatury, reference a práce s odbornými metadaty.' },
  { id: 'documents-pdf', label: 'Dokumenty a PDF', description: 'Převod, OCR a strukturování dokumentů pro další práci.' },
  { id: 'web-capture', label: 'Webový výstřižek', description: 'Uložení webu do stabilnější podoby pro čtení a archivaci.' },
  { id: 'organization', label: 'Organizace poznámek', description: 'Lokální poznámky a znalostní struktury kolem notebooku.' },
  { id: 'export-publishing', label: 'Export a publikování', description: 'Převod výsledků do formátů pro sdílení, archivaci nebo prezentaci.' },
  { id: 'visual-output', label: 'Vizuální výstup', description: 'Mapy, osnovy a další přehledné výstupy ze strukturovaného textu.' },
];

export const notebookCategories: CatalogCategory[] = [
  { id: 'health-wellbeing', label: 'Zdraví a wellbeing', description: 'Veřejné notebooky o zdraví, životním stylu a kvalitě života.' },
  { id: 'business-economics', label: 'Byznys a ekonomika', description: 'Firemní výsledky, trendy a ekonomické souvislosti.' },
  { id: 'science-environment', label: 'Věda a životní prostředí', description: 'Přírodovědné, klimatické a výzkumné podklady.' },
  { id: 'parenting', label: 'Rodičovství', description: 'Ověřitelné zdroje a rady pro rodiče v digitálním věku.' },
  { id: 'literature', label: 'Literatura', description: 'Klasická díla a literární zdroje pro čtení a interpretaci.' },
  { id: 'technology', label: 'Technologie', description: 'Technické návody, platformy a nástroje.' },
  { id: 'education', label: 'Vzdělávání', description: 'Notebooky využitelné ve výuce, kurzech a samostudiu.' },
  { id: 'media-journalism', label: 'Média a žurnalistika', description: 'Redakční materiály a práce s veřejnými mediálními zdroji.' },
  { id: 'gaming', label: 'Hry', description: 'Komunitní herní příručky a průběžně aktualizované podklady.' },
  { id: 'productivity', label: 'Produktivita', description: 'Pracovní postupy, orientace v nástroji a osobní organizace.' },
];
