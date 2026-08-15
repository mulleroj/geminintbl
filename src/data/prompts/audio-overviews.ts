import type { Prompt } from '../../schemas';
import { projectProvenance } from '../provenance';

export const audioOverviewPrompts: Prompt[] = [
  { ...projectProvenance, id: 'p-audio-pro-ucitele', slug: 'audio-prehled-pro-ucitele', title: 'Audio přehled pro učitele', description: 'Navrhne krátký dialogický přehled s důrazem na použitelné závěry.', prompt: 'Navrhni scénář desetiminutového audio přehledu pro učitele. Dva hosté vysvětlí hlavní myšlenky zdrojů, upozorní na rozdíly a zakončí třemi otázkami do výuky. Používej jazyk srozumitelný bez vizuální opory a u každého faktu zachovej odkaz na zdroj.', category: 'audio-overviews', tags: ['audio', 'učitelé', 'výuka'], target: 'audio', featured: true, audience: ['teacher'], educationLevel: ['primary', 'secondary'] },
];
