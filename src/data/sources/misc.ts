import type { Source } from '../../schemas';

export const miscellaneousSources: Source[] = [
  { id: 's-nkp', title: 'Národní knihovna ČR', url: 'https://www.nkp.cz/', domain: 'nkp.cz', category: 'czech-language', description: 'Katalogy, digitalizované fondy a autoritní informace pro práci s textem.', importTip: 'Přidejte konkrétní katalogový záznam, ne jen domovskou stránku instituce.', access: 'free', language: ['cs'], region: ['Česká republika'], sourceLabel: 'Národní knihovna ČR', retrievedAt: '2026-08-15', license: 'Dle podmínek NK ČR' },
];
