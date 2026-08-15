import { czechEducationSources } from './czech-education';
import { czechLanguageSources } from './czech-language';
import { economicsSources } from './economics';
import { euSources } from './eu';
import { historyArchiveSources } from './history-archives';
import { internationalSources } from './international-sources';
import { journalismFactCheckSources } from './journalism-fact-check';
import { legislationSources } from './legislation';
import { scienceResearchSources } from './science-research';
import { statisticsDataSources } from './statistics-data';

export const sources = [
  ...czechEducationSources,
  ...legislationSources,
  ...statisticsDataSources,
  ...economicsSources,
  ...scienceResearchSources,
  ...historyArchiveSources,
  ...czechLanguageSources,
  ...euSources,
  ...internationalSources,
  ...journalismFactCheckSources,
];
