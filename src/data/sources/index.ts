import { czechEducationSources } from './czech-education';
import { czechGovernmentSources } from './czech-government';
import { internationalSources } from './international';
import { miscellaneousSources } from './misc';
import { scienceSources } from './science';
import { statisticsSources } from './statistics';

export const sources = [
  ...statisticsSources,
  ...czechGovernmentSources,
  ...czechEducationSources,
  ...scienceSources,
  ...miscellaneousSources,
  ...internationalSources,
];
