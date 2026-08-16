import { readFile } from 'node:fs/promises';
import JSZip from 'jszip';

const path = process.argv[2];
if (!path) throw new Error('Usage: node scripts/inspect-slide-editor-pptx.mjs <file.pptx>');

const zip = await JSZip.loadAsync(await readFile(path));
const names = Object.keys(zip.files);
const slideNames = names.filter((name) => /^ppt\/slides\/slide\d+\.xml$/.test(name)).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

function inspectShape(part, type) {
  const name = part.match(/<p:cNvPr[^>]*name="([^"]*)"/i)?.[1] ?? '';
  const texts = [...part.matchAll(/<a:t>([\s\S]*?)<\/a:t>/g)].map((match) => match[1]).join(' | ');
  const locks = part.match(/<p:cNv(?:Sp|Pic)Pr[^>]*>/)?.[0] ?? '';
  const transform = part.match(/<a:xfrm>[\s\S]*?<a:off x="([^"]+)" y="([^"]+)"\s*\/>[\s\S]*?<a:ext cx="([^"]+)" cy="([^"]+)"\s*\/>[\s\S]*?<\/a:xfrm>/)?.slice(1).map(Number) ?? [];
  return {
    type,
    name,
    text: texts,
    txBody: part.includes('<p:txBody>'),
    locks,
    hasNoSelect: /noSelect="1"/.test(locks),
    hasNoMove: /noMove="1"/.test(locks),
    hasNoResize: /noResize="1"/.test(locks),
    hasGroup: part.includes('<p:grpSp>'),
    transform: transform.length === 4 ? { x: transform[0], y: transform[1], cx: transform[2], cy: transform[3] } : null,
  };
}

const slides = [];
for (const slideName of slideNames) {
  const xml = await zip.file(slideName).async('string');
  const start = xml.indexOf('<p:spTree>');
  const end = xml.indexOf('</p:spTree>');
  const tree = xml.slice(start, end);
  const objects = [];
  const shapeMatches = [...tree.matchAll(/<p:(pic|sp)(?:\s|>)/g)];
  for (let index = 0; index < shapeMatches.length; index += 1) {
    const match = shapeMatches[index];
    const next = shapeMatches[index + 1]?.index ?? tree.length;
    objects.push(inspectShape(tree.slice(match.index, next), match[1]));
  }
  slides.push({ slide: slideName, objects });
}

console.log(JSON.stringify({
  slides: slideNames.length,
  media: names.filter((name) => name.startsWith('ppt/media/')),
  relationships: names.filter((name) => /^ppt\/slides\/_rels\/slide\d+\.xml\.rels$/.test(name)).length,
  slides,
}, null, 2));
