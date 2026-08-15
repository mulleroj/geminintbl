import type { Source } from '../../schemas';

export const internationalSources: Source[] = [
  { id: 's-scholar', title: 'Google Scholar', url: 'https://scholar.google.com/', domain: 'scholar.google.com', category: 'research', description: 'Vyhledávač odborné literatury a citací napříč obory.', importTip: 'Do notebooku importujte konkrétní článek nebo PDF, ne výsledky vyhledávání bez kontextu.', access: 'free', language: ['cs', 'en'], region: ['globální'], featured: true, sourceLabel: 'Vyhledávač odborné literatury', retrievedAt: '2026-08-15' },
  { id: 's-arxiv', title: 'arXiv', url: 'https://arxiv.org/', domain: 'arxiv.org', category: 'research', description: 'Otevřený archiv preprintů z fyziky, matematiky, informatiky a dalších oborů.', importTip: 'U preprintu uveďte verzi a datum; výsledek nemusí být recenzovaný.', access: 'free', language: ['en'], region: ['globální'], sourceLabel: 'Open-access archiv', retrievedAt: '2026-08-15', license: 'Podle konkrétního záznamu' },
];
