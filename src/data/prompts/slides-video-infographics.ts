import type { Prompt } from '../../schemas';
import { projectProvenance } from '../provenance';

export const slidesVideoInfographicsPrompts: Prompt[] = [
  { ...projectProvenance, id: 'p-vyukova-infografika', slug: 'vyukova-infografika', title: 'Výuková infografika krok za krokem', description: 'Převádí složité téma do struktury, kterou lze bezpečně zkontrolovat.', prompt: 'Navrhni osnovu jedné výukové infografiky. Uveď cílovou skupinu, hlavní sdělení, pořadí bloků, krátké popisky a návrhy vizuálních metafor. Každý údaj připoj ke zdroji. Pokud je téma příliš široké, nejprve navrhni zúžení.', category: 'slides-video-infographics', tags: ['infografika', 'výuka', 'vizuál'], target: 'infographic', audience: ['teacher', 'student'] },
  { ...projectProvenance, id: 'p-osnova-prezentace', slug: 'osnova-prezentace-z-vyzkumu', title: 'Osnova prezentace z výzkumu', description: 'Připraví čistou osnovu prezentace bez nafukování tvrzení.', prompt: 'Zpracuj zdroje do osnovy prezentace o 8 slidech. Každý slide má jeden titulek, jednu hlavní myšlenku, nejvýše tři podpůrné body a poznámku ke zdroji. Na konci uveď, co z materiálů nelze tvrdit. Nepřidávej dekorativní obsah.', category: 'slides-video-infographics', tags: ['prezentace', 'výzkum', 'slidy'], target: 'slides', audience: ['researcher', 'student'] },
];
