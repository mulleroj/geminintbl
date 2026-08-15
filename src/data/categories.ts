import type { GuideCategory, PromptCategory, SourceCategory } from '../schemas';

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
  { id: 'novinky', label: 'Novinky', description: 'Krátké zprávy o změnách, které stojí za pozornost.' },
  { id: 'pruvodce', label: 'Průvodce', description: 'Praktické návody pro práci s notebookem.' },
  { id: 'recenze', label: 'Recenze', description: 'Střízlivé hodnocení nástrojů a pracovních postupů.' },
  { id: 'jak-na-to', label: 'Jak na to', description: 'Krokové postupy pro konkrétní situace.' },
  { id: 'srovnani', label: 'Srovnání', description: 'Férové porovnání přístupů, variant a omezení.' },
  { id: 'faq', label: 'FAQ', description: 'Odpovědi na opakující se otázky.' },
];
