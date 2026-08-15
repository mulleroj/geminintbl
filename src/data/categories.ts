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
];

export const sourceCategories: SourceCategory[] = [
  { id: 'statistics', label: 'Statistiky', description: 'Oficiální statistiky, datové řady a metodiky.' },
  { id: 'open-data', label: 'Otevřená data', description: 'Katalogy datasetů a veřejná data pro vlastní analýzu.' },
  { id: 'education', label: 'Školství', description: 'Instituce, zprávy a podklady pro české vzdělávání.' },
  { id: 'legislation', label: 'Legislativa', description: 'Parlamentní a právní dokumenty s dohledatelným kontextem.' },
  { id: 'economics', label: 'Ekonomika', description: 'Ekonomická data, zprávy a měnové souvislosti.' },
  { id: 'science', label: 'Věda', description: 'Výzkumné instituce, archivy a odborné publikace.' },
  { id: 'czech-language', label: 'Český jazyk', description: 'Katalogy, autority a zdroje pro práci s češtinou.' },
  { id: 'research', label: 'Výzkum', description: 'Vyhledávače odborné literatury a výzkumné workflow.' },
];

export const guideCategories: GuideCategory[] = [
  { id: 'novinky', label: 'Novinky', description: 'Krátké zprávy o změnách, které stojí za pozornost.' },
  { id: 'pruvodce', label: 'Průvodce', description: 'Praktické návody pro práci s notebookem.' },
  { id: 'recenze', label: 'Recenze', description: 'Střízlivé hodnocení nástrojů a pracovních postupů.' },
  { id: 'jak-na-to', label: 'Jak na to', description: 'Krokové postupy pro konkrétní situace.' },
  { id: 'srovnani', label: 'Srovnání', description: 'Férové porovnání přístupů, variant a omezení.' },
  { id: 'faq', label: 'FAQ', description: 'Odpovědi na opakující se otázky.' },
];
