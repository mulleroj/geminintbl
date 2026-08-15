import type { Source } from '../../schemas';

export const czechEducationSources: Source[] = [
  { id: 's-csicr', title: 'Česká školní inspekce', url: 'https://www.csicr.cz/', domain: 'csicr.cz', category: 'education', description: 'Inspekční zprávy, tematické zprávy a data o kvalitě vzdělávání.', importTip: 'Pro srovnání školních témat přidejte zprávu a metodiku jako dva samostatné zdroje.', access: 'free', language: ['cs'], region: ['Česká republika'], featured: true, sourceLabel: 'Oficiální instituce', retrievedAt: '2026-08-15', license: 'Dle podmínek ČŠI' },
];
