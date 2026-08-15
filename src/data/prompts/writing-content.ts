import type { Prompt } from '../../schemas';
import { projectProvenance } from '../provenance';

export const writingContentPrompts: Prompt[] = [
  { ...projectProvenance, id: 'p-osnova-clanku', slug: 'osnova-clanku-se-zdroji', title: 'Osnova článku se zdroji', description: 'Z výzkumných materiálů vytvoří redakční kostru a hlídá nepodložené mezery.', prompt: 'Navrhni osnovu článku pro českého čtenáře. U každé části uveď účel, otázku, kterou zodpovídá, a zdroje, o které se může opřít. Odděl ověřená tvrzení od míst, která vyžadují další rešerši. Nepsat hotový článek.', category: 'writing-content', tags: ['článek', 'rešerše', 'psaní'], target: 'chat', featured: true, audience: ['general', 'researcher'] },
];
