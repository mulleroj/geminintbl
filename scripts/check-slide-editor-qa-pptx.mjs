import { readFile } from 'node:fs/promises';
import JSZip from 'jszip';

const path = process.argv[2] ?? 'artifacts/qa/notebook-slide-editor-regression.pptx';
const zip = await JSZip.loadAsync(await readFile(path));
const names = Object.keys(zip.files);
const presentation = await zip.file('ppt/presentation.xml').async('string');
const slideNames = names.filter((name) => /^ppt\/slides\/slide\d+\.xml$/.test(name)).sort();
const slideXml = await Promise.all(slideNames.map((name) => zip.file(name).async('string')));
const text = slideXml.join('\n');
const result = {
  slides: slideNames.length,
  slideRelationships: names.filter((name) => /^ppt\/slides\/_rels\/slide\d+\.xml\.rels$/.test(name)).length,
  wide16by9: presentation.includes('cx="9144000" cy="5143500"'),
  textObjects: (text.match(/<a:t>/g) ?? []).length,
  hasCzech: text.includes('Česká'),
  hasEnglish: text.includes('English'),
  hasNumbers: text.includes('75 %'),
  hasBold: text.includes('b="1"'),
  hasItalic: text.includes('i="1"'),
};
if (!result.slides || result.slides !== 8 || !result.wide16by9 || result.textObjects < 8 || !result.hasCzech || !result.hasEnglish || !result.hasNumbers || !result.hasBold || !result.hasItalic) process.exitCode = 1;
console.log(JSON.stringify(result));
