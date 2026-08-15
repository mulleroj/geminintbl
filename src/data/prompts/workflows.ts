import type { Prompt } from '../../schemas';
import { projectProvenance } from '../provenance';

export const workflowPrompts: Prompt[] = [
  { ...projectProvenance, id: 'p-vyzkumny-workflow', slug: 'vyzkumny-workflow', title: 'Výzkumný workflow od zdroje k výstupu', description: 'Rozdělí opakovatelnou práci na triáž, syntézu, kontrolu a výstup.', prompt: 'Navrhni opakovatelný workflow pro práci s těmito zdroji: 1) inventura a kvalita, 2) otázky a mezery, 3) syntéza s citacemi, 4) red-team kontrola, 5) výstup pro cílové publikum. U každého kroku definuj vstup, výstup a kontrolní otázku.', category: 'workflows', tags: ['workflow', 'rešerše', 'proces'], target: 'chat', audience: ['researcher', 'teacher'] },
  { ...projectProvenance, id: 'p-komunitni-navrh', slug: 'komunitni-navrh-ke-kontrole', title: 'Komunitní návrh ke kontrole', description: 'Příklad z připravovaného katalogu; před publikací vyžaduje ověření licence a původu.', prompt: 'TODO: Tento záznam slouží jen jako kontrolovaný příklad příchozího komunitního návrhu. Před publikací doplň původní text, autora, licenci a ověř, zda je reprodukce povolená.', category: 'workflows', tags: ['komunita', 'review'], target: 'other', needsReview: true, sourceLabel: 'Příchozí návrh — čeká na ověření', audience: ['general'] },
];
