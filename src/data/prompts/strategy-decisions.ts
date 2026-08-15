import type { Prompt } from '../../schemas';
import { projectProvenance } from '../provenance';

export const strategyDecisionPrompts: Prompt[] = [
  { ...projectProvenance, id: 'p-rozhodovaci-memo', slug: 'rozhodovaci-memo', title: 'Rozhodovací memo', description: 'Z dokumentů vytáhne varianty, rizika a doporučený další krok.', prompt: 'Připrav jednostránkové rozhodovací memo. Shrň situaci, rozhodnutí, které je třeba udělat, dostupné varianty, důkazy pro a proti, hlavní rizika a neznámé. Na závěr doporuč jeden další krok a uveď, jaký nový důkaz by doporučení změnil.', category: 'strategy-decisions', tags: ['strategie', 'rozhodování', 'memo'], target: 'chat', audience: ['general', 'researcher'] },
];
