import type { Guide } from '../../schemas';
import { guidesSafety } from './bezpecnost-kvalita';
import { guidesStart } from './zacinate';
import { guidesStudio } from './studio-vystupy';
import { guidesTeachers } from './ucitele';
import { guidesResearch } from './vyzkum';

export const guides: Guide[] = [
  ...guidesStart,
  ...guidesTeachers,
  ...guidesStudio,
  ...guidesResearch,
  ...guidesSafety,
];
