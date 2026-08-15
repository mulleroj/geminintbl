import type { Prompt } from '../../schemas';
import { projectProvenance } from '../provenance';

export const setupAccuracyPrompts: Prompt[] = [
  { ...projectProvenance, id: 'p-ochranne-zabrany', slug: 'ochranne-zabrany-pro-chat', title: 'Ochranné zábrany pro chat', description: 'Připne pravidla pro citace, nejistotu a práci s chybějícími údaji.', prompt: 'Dodržuj tato pravidla: 1) používej jen vybrané zdroje, 2) každé důležité tvrzení opatři odkazem na zdroj, 3) odliš fakt, interpretaci a návrh, 4) pokud odpověď ve zdrojích není, napiš to výslovně, 5) před finální odpovědí uveď krátkou kontrolu limitů.', category: 'setup-accuracy', tags: ['přesnost', 'citace', 'chat settings'], target: 'chat-settings', featured: true, audience: ['general', 'researcher'] },
];
