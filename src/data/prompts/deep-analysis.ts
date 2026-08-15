import type { Prompt } from '../../schemas';
import { projectProvenance } from '../provenance';

export const deepAnalysisPrompts: Prompt[] = [
  { ...projectProvenance, id: 'p-srovnej-zdroje', slug: 'srovnej-zdroje', title: 'Srovnej zdroje bez zkratek', description: 'Vytáhne shody, rozpory a místa, kde si zdroje odporují.', prompt: 'Pracuj pouze s přiloženými zdroji. Nejprve u každého uveď hlavní tvrzení a jeho oporu. Poté vytvoř tabulku: shoda, rozpor, doplňující detail a chybějící informace. U každého závěru uveď zdroj a jasně označ nejistotu.', category: 'deep-analysis', tags: ['srovnání', 'ověřování', 'výzkum'], target: 'chat', featured: true, audience: ['researcher', 'student'] },
  { ...projectProvenance, id: 'p-argumentacni-audit', slug: 'argumentacni-audit', title: 'Argumentační audit', description: 'Otestuje hlavní závěr proti důkazům a alternativním vysvětlením.', prompt: 'Najdi nejsilnější argument v dodaných materiálech. Rekonstruuj jej v pěti krocích, pojmenuj skryté předpoklady a navrhni tři námitky. U každé námitky napiš, jaký konkrétní důkaz by ji potvrdil nebo oslabil. Nevymýšlej fakta mimo zdroje.', category: 'deep-analysis', tags: ['kritické myšlení', 'argumentace'], target: 'chat', featured: true, audience: ['researcher', 'general'] },
];
