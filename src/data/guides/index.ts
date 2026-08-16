import type { Guide } from '../../schemas';
import { depthSafety } from './depth-bezpecnost';
import { depthExtra } from './depth-extra';
import { depthExtraFinal } from './depth-extra-final';
import { depthExtraFinal2 } from './depth-extra-final2';
import { depthExtraFinal3 } from './depth-extra-final3';
import { depthExtraFinal4 } from './depth-extra-final4';
import { depthExtraFinal5 } from './depth-extra-final5';
import { depthExtraFinal6 } from './depth-extra-final6';
import { depthResearch } from './depth-vyzkum';
import { depthStart } from './depth-zacinate';
import { depthStudio } from './depth-studio';
import { depthTeachers } from './depth-ucitele';
import { guidesSafety } from './bezpecnost-kvalita';
import { guidesStart } from './zacinate';
import { guidesStudio } from './studio-vystupy';
import { guidesTeachers } from './ucitele';
import { guidesResearch } from './vyzkum';

const baseGuides: Guide[] = [
  ...guidesStart,
  ...guidesTeachers,
  ...guidesStudio,
  ...guidesResearch,
  ...guidesSafety,
];

const depthDefinitions = [...depthStart, ...depthTeachers, ...depthStudio, ...depthResearch, ...depthSafety];
const extraById = new Map<string, (typeof depthExtra)[number]>();
for (const item of [...depthExtra, ...depthExtraFinal, ...depthExtraFinal2, ...depthExtraFinal3, ...depthExtraFinal4, ...depthExtraFinal5, ...depthExtraFinal6]) {
  const previous = extraById.get(item.id);
  extraById.set(item.id, previous ? { ...item, sections: [...previous.sections, ...item.sections] } : item);
}

export const guides: Guide[] = baseGuides.map((guide) => {
  const depth = depthDefinitions.find((item) => item.id === guide.id);
  if (!depth) throw new Error(`Missing guide depth definition: ${guide.id}`);
  const extra = extraById.get(guide.id);
  if (!extra) throw new Error(`Missing guide depth extension: ${guide.id}`);
  return {
    ...guide,
    depthClass: depth.depthClass,
    relatedGuideIds: depth.relatedGuideIds,
    content: [...guide.content, ...depth.sections, ...extra.sections],
  };
});
