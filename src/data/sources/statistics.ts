import type { Source } from '../../schemas';

export const statisticsSources: Source[] = [
  { id: 's-cszu', title: 'Český statistický úřad', url: 'https://www.czso.cz/', domain: 'czso.cz', category: 'statistics', description: 'Oficiální statistiky o obyvatelstvu, ekonomice, školství a společnosti.', importTip: 'Začněte tematickou stránkou a přidejte jen tabulky relevantní k otázce.', access: 'free', language: ['cs'], region: ['Česká republika'], featured: true, sourceLabel: 'Oficiální instituce', retrievedAt: '2026-08-15', license: 'Dle podmínek ČSÚ' },
];
