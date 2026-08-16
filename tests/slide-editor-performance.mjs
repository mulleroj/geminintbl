import PptxGenJS from 'pptxgenjs';
import { performance } from 'node:perf_hooks';

const onePixel = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIHWP4z8DwHwAFgAI/ScxW7QAAAABJRU5ErkJggg==';

for (const slideCount of [10, 25, 50]) {
  const start = performance.now();
  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_WIDE';
  for (let index = 0; index < slideCount; index += 1) {
    const slide = pptx.addSlide();
    slide.addImage({ data: onePixel, x: 0, y: 0, w: 13.333, h: 7.5 });
    slide.addText(`Regression slide ${index + 1}`, { x: 0.5, y: 0.5, w: 5, h: 0.4, fontFace: 'Arial', fontSize: 24, color: '17211C' });
    slide.addText('Editable text object for export and responsiveness smoke testing.', { x: 0.5, y: 1.1, w: 6.5, h: 0.5, fontFace: 'Arial', fontSize: 14, color: '17211C' });
  }
  const output = await pptx.write({ outputType: 'nodebuffer', compression: true });
  console.log(JSON.stringify({ slides: slideCount, exportMs: Math.round(performance.now() - start), pptxBytes: output.length }));
}
