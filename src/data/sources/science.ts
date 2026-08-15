import type { Source } from '../../schemas';

export const scienceSources: Source[] = [
  { id: 's-avcr', title: 'Akademie věd ČR', url: 'https://www.avcr.cz/', domain: 'avcr.cz', category: 'science', description: 'Výzkumné zprávy, popularizační texty a informace o české vědě.', importTip: 'Oddělte popularizační text od původní studie a porovnejte jejich tvrzení.', access: 'free', language: ['cs'], region: ['Česká republika'], sourceLabel: 'Akademie věd ČR', retrievedAt: '2026-08-15', license: 'Dle podmínek AV ČR' },
  { id: 's-pmc', title: 'PubMed Central', url: 'https://pmc.ncbi.nlm.nih.gov/', domain: 'pmc.ncbi.nlm.nih.gov', category: 'science', description: 'Volně dostupný archiv biomedicínské a přírodovědné literatury.', importTip: 'Při zdravotních tématech kontrolujte datum, typ studie a populaci.', access: 'free', language: ['en'], region: ['globální'], sourceLabel: 'Národní lékařská knihovna USA', retrievedAt: '2026-08-15' },
];
