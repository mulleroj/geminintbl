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
import { studySetupByGuide } from './study-power';
import { visibleDepthHeadings, visibleExtraHeadings } from './editorial-plan';

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

function withSubsections(section: Guide['content'][number], subsections: Guide['content']): Guide['content'][number] {
  return { ...section, subsections: [...(section.subsections ?? []), ...subsections] };
}

function editorialVisibleSections(base: Guide['content'], depth: Guide['content']): Guide['content'] {
  const visible = base.slice(0, 4);
  const baseRemainder = base.slice(4);
  if (baseRemainder.length && visible.length) {
    visible[visible.length - 1] = withSubsections(visible[visible.length - 1], baseRemainder);
  } else if (baseRemainder.length) {
    visible.push(...baseRemainder);
  }
  if (depth.length) visible.push(depth[0]);
  if (depth.length > 1) visible.push({ heading: 'Příklad a kontrola', paragraphs: [], subsections: depth.slice(1) });
  return visible;
}

function guideWordCount(sections: Guide['content']): number {
  return sections.reduce((total, section) => total + [section.heading, ...section.paragraphs, ...(section.bullets ?? [])].join(' ').split(/\s+/).filter(Boolean).length + guideWordCount(section.subsections ?? []), 0);
}

export const guides: Guide[] = baseGuides.map((guide) => {
  const depth = depthDefinitions.find((item) => item.id === guide.id);
  if (!depth) throw new Error(`Missing guide depth definition: ${guide.id}`);
  const extra = extraById.get(guide.id);
  if (!extra) throw new Error(`Missing guide depth extension: ${guide.id}`);
  const selectedDepthHeadings = visibleDepthHeadings[guide.id];
  if (selectedDepthHeadings?.some((heading) => !depth.sections.some((section) => section.heading === heading))) throw new Error(`Missing visible depth heading for ${guide.id}`);
  const visibleDepth = selectedDepthHeadings ? depth.sections.filter((section) => selectedDepthHeadings.includes(section.heading)) : depth.sections;
  const advancedDepth = selectedDepthHeadings ? depth.sections.filter((section) => !selectedDepthHeadings.includes(section.heading)) : [];
  const selectedExtraHeadings = visibleExtraHeadings[guide.id] ?? [];
  if (selectedExtraHeadings.some((heading) => !extra.sections.some((section) => section.heading === heading))) throw new Error(`Missing visible extra heading for ${guide.id}`);
  const visibleExtra = extra.sections.filter((section) => selectedExtraHeadings.includes(section.heading));
  const advancedExtra = extra.sections.filter((section) => !selectedExtraHeadings.includes(section.heading));
  const content = editorialVisibleSections(guide.content, visibleDepth);
  if (visibleExtra.length) content.push({ heading: 'Další praktické rozhodnutí', paragraphs: [], subsections: visibleExtra });
  return {
    ...guide,
    depthClass: depth.depthClass,
    relatedGuideIds: depth.relatedGuideIds,
    content,
    advancedSections: [...advancedDepth, ...advancedExtra],
    studySetup: studySetupByGuide[guide.id],
    readingMinutes: Math.max(2, Math.ceil(guideWordCount(content) / 200)),
  };
});
