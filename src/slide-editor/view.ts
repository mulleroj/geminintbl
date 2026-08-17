import { clearProject, readProject, saveProject } from './storage';
import { clamp, isBlockEdited, sanitizeFileName, userFacingProcessError, validateImageFile, validateSourceFile } from './model';
import type { SlideEditorProject, SlideImageBlock, SlideModel, SlideTextBlock } from './types';

const esc = (value: unknown): string => String(value ?? '')
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

type EditorPhase = 'empty' | 'processing' | 'ready' | 'error';

interface EditorState {
  phase: EditorPhase;
  project: SlideEditorProject | null;
  selectedSlide: number;
  selectedBlockId: string | null;
  selectedImageId: string | null;
  imageMode: boolean;
  progress: number;
  progressMessage: string;
  error: string;
}

let state: EditorState;
let saveTimer: number | undefined;
let processToken = 0;
let recoveryProject: SlideEditorProject | null = null;

function freshState(): EditorState {
  return { phase: 'empty', project: null, selectedSlide: 0, selectedBlockId: null, selectedImageId: null, imageMode: false, progress: 0, progressMessage: '', error: '' };
}

function makeId(): string {
  return typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : `project-${Date.now()}`;
}

function selectedSlide(): SlideModel | null {
  return state.project?.slides[state.selectedSlide] ?? null;
}

function selectedBlock(): SlideTextBlock | null {
  return selectedSlide()?.blocks.find((block) => block.id === state.selectedBlockId) ?? null;
}

function selectedImage(): SlideImageBlock | null {
  return selectedSlide()?.imageBlocks.find((image) => image.id === state.selectedImageId) ?? null;
}

function pageIntro(): string {
  return `<header class="slide-editor-intro"><div><p class="eyebrow">Praktický nástroj Notebook Hub CZ</p><h1>Editor prezentací</h1><p class="lead">Nahrajte PDF nebo PPTX prezentaci, upravte textové bloky, obrázky a vodoznaky a stáhněte výsledek jako PowerPoint.</p></div><span class="editor-local-badge"><strong>Lokálně</strong><small>Soubor zůstává ve vašem zařízení</small></span></header>`;
}

function steps(): string {
  return `<div class="slide-editor-steps" aria-label="Postup"><div><span>01</span><strong>Nahrajte PDF nebo PPTX</strong><small>U PPTX se zachovají skutečné textové a obrazové objekty.</small></div><div><span>02</span><strong>Upravte text nebo obrázek</strong><small>Text, obrázky a vodoznaky upravte přímo; u sloučeného PDF označte oblast.</small></div><div><span>03</span><strong>Exportujte PPTX</strong><small>Původní rozložení zůstane zachované.</small></div></div>`;
}

function emptyContent(): string {
  return `<section class="slide-editor-empty"><div class="slide-editor-notice"><strong>${'✦'} Zpracování přímo v prohlížeči</strong><span>PDF ani PPTX neposíláme na server Notebook Hubu. OCR a rozbalení prezentace probíhá přímo ve vašem prohlížeči.</span></div>${steps()}<label class="slide-editor-dropzone" data-editor-dropzone><input aria-label="Vyberte PDF nebo PowerPoint prezentaci" data-editor-upload type="file" accept="application/pdf,.pdf,application/vnd.openxmlformats-officedocument.presentationml.presentation,.pptx" /><span class="drop-icon">↑</span><strong>Nahrajte PDF nebo PPTX prezentaci</strong><small>Přetáhněte soubor sem nebo jej vyberte. Limit: PDF 40 MB, PPTX 80 MB a 50 slidů.</small></label><p class="slide-editor-hint"><strong>Pro nejlepší výsledek:</strong> u PPTX se skutečnými objekty se zachovají jejich texty a obrázky. U sloučeného PDF nebo PPTX slidu označte oblast ikony ručně.</p></section>`;
}

function processingContent(): string {
  return `<section class="slide-editor-processing" aria-live="polite"><div class="processing-mark">${'✦'}</div><p class="eyebrow">Soubor / zpracování v prohlížeči</p><h2>${esc(state.progressMessage || 'Připravuji slidy…')}</h2><progress aria-label="Postup zpracování prezentace" max="100" value="${Math.min(100, state.progress)}">${state.progress}%</progress><p>${state.progress}% dokončeno. U větší prezentace může rozpoznání textu chvíli trvat.</p></section>`;
}

function errorContent(): string {
  return `<section class="slide-editor-error" role="alert"><div class="error-mark">!</div><div><p class="eyebrow">Soubor se nepodařilo zpracovat</p><h2>${esc(state.error)}</h2><p>Zkontrolujte, že jde o platný PDF nebo PPTX soubor s nejvýše 50 slidy a zkuste to znovu. Původní soubor nebyl nahrán na server.</p><button class="button button-primary" type="button" data-editor-reset>Vybrat jiný soubor</button></div></section>`;
}

function thumbnail(slide: SlideModel, index: number): string {
  const active = index === state.selectedSlide;
  return `<button class="slide-thumbnail${active ? ' is-active' : ''}" type="button" data-slide-index="${index}" aria-label="Slide ${slide.pageNumber}" aria-pressed="${active}"><span>${slide.pageNumber}</span><img src="${esc(slide.imageUrl)}" alt="Náhled slidu ${slide.pageNumber}" /></button>`;
}

function blockStyle(block: SlideTextBlock, slide: SlideModel): string {
  return `left:${(block.x / slide.width) * 100}%;top:${(block.y / slide.height) * 100}%;width:${(block.width / slide.width) * 100}%;height:${(block.height / slide.height) * 100}%;--font-ratio:${block.fontSize / slide.width};--mask-color:${esc(block.maskColor)};--block-color:${esc(block.color)};`;
}

function imageStyle(image: SlideImageBlock, slide: SlideModel): string {
  return `left:${(image.x / slide.width) * 100}%;top:${(image.y / slide.height) * 100}%;width:${(image.width / slide.width) * 100}%;height:${(image.height / slide.height) * 100}%;--image-mask-color:${esc(image.maskColor)};`;
}

function blockMarkup(block: SlideTextBlock, slide: SlideModel): string {
  const selected = block.id === state.selectedBlockId;
  const edited = isBlockEdited(block);
  return `<div class="slide-editor-text-block${selected ? ' is-selected' : ''}${edited ? ' is-edited' : ''}" data-block-id="${esc(block.id)}" style="${blockStyle(block, slide)}"><textarea class="slide-editor-textarea" data-block-text spellcheck="true" aria-label="Textový blok" style="font-weight:${block.bold ? 800 : 500};font-style:${block.italic ? 'italic' : 'normal'};text-align:${block.align};">${esc(block.text)}</textarea><button class="slide-editor-resize" type="button" data-resize-block aria-label="Změnit velikost textového bloku">↘</button></div>`;
}

function imageMarkup(image: SlideImageBlock, slide: SlideModel): string {
  const selected = image.id === state.selectedImageId;
  const imageContent = image.imageUrl
    ? `<img src="${esc(image.imageUrl)}" alt="${esc(image.altText || 'Nahrazený obrázek')}" />`
    : '<span class="slide-editor-image-placeholder">Vyberte obrázek</span>';
  return `<div class="slide-editor-image-block${selected ? ' is-selected' : ''}${image.edited ? ' is-edited' : ''}${image.imageUrl ? ' has-image' : ''}" data-image-id="${esc(image.id)}" style="${imageStyle(image, slide)}" tabindex="0" role="button" aria-label="${esc(image.altText || 'Obrázková oblast')}">${imageContent}<button class="slide-editor-image-resize" type="button" data-resize-image aria-label="Změnit velikost obrázku">↘</button></div>`;
}

function inspector(): string {
  const image = selectedImage();
  if (image) return `<aside class="slide-editor-inspector"><p class="eyebrow">Vybraný obrázek</p><h2>Vlastnosti</h2><p class="muted">${image.edited ? 'Tato oblast překryje původní grafiku a vloží nový obrázek.' : 'Toto je původní obrazový objekt z PPTX. Po nahrání náhrady se při exportu zachová jeho pozice a rozměry.'}</p><label class="editor-field editor-field-full"><span>${image.imageUrl ? 'Vyměnit obrázek' : 'Vybrat obrázek'}</span><input type="file" accept="image/png,image/jpeg,image/svg+xml,.png,.jpg,.jpeg,.svg" data-image-upload /></label>${image.imageUrl ? `<img class="slide-editor-image-preview" src="${esc(image.imageUrl)}" alt="${esc(image.altText || 'Náhled obrázku')}" />` : ''}<label class="editor-field"><span>Barva překrytí původní ikony</span><input type="color" value="${esc(image.maskColor)}" data-image-mask-color /></label><label class="editor-field editor-field-full"><span>Popis obrázku</span><input type="text" value="${esc(image.altText)}" data-image-alt /></label><button class="button button-quiet image-remove-button" type="button" data-image-remove>Odstranit náhradu</button><div class="inspector-tip"><strong>Tip</strong><span>Oblast můžete přetáhnout a změnit její velikost. Pro ikony použijte ideálně PNG nebo SVG s průhledným pozadím.</span></div></aside>`;
  const block = selectedBlock();
  if (!block) return `<aside class="slide-editor-inspector"><p class="eyebrow">Vlastnosti</p><h2>${state.imageMode ? 'Označte obrázek' : 'Vyberte text nebo obrázek'}</h2><p class="muted">${state.imageMode ? 'Tažením myši nebo prstem označte oblast ikony. Potom do ní vložíte vlastní PNG, JPG nebo SVG.' : 'Klikněte na text na plátně. Pro výměnu ikony klikněte na „Odemknout obrázek“ a označte její oblast.'}</p><div class="inspector-tip"><strong>OCR confidence</strong><span>Textové bloky jsou pouze návrh. Čísla, diakritiku a názvy před exportem ověřte.</span></div></aside>`;
  return `<aside class="slide-editor-inspector"><p class="eyebrow">Vybraný textový blok</p><h2>Vlastnosti</h2><label class="editor-field editor-field-full"><span>Text</span><textarea rows="6" data-inspector-text>${esc(block.text)}</textarea></label><div class="editor-field-grid"><label class="editor-field"><span>Velikost</span><input type="number" min="8" max="120" step="1" value="${Math.round(block.fontSize)}" data-inspector-font-size /></label><label class="editor-field"><span>Barva</span><input type="color" value="${esc(block.color)}" data-inspector-color /></label></div><div class="editor-checks"><label><input type="checkbox" data-inspector-bold${block.bold ? ' checked' : ''} /> Tučné</label><label><input type="checkbox" data-inspector-italic${block.italic ? ' checked' : ''} /> Kurzíva</label></div><label class="editor-field"><span>Zarovnání</span><select data-inspector-align><option value="left"${block.align === 'left' ? ' selected' : ''}>Vlevo</option><option value="center"${block.align === 'center' ? ' selected' : ''}>Na střed</option><option value="right"${block.align === 'right' ? ' selected' : ''}>Vpravo</option></select></label><div class="inspector-confidence"><span>OCR confidence</span><strong>${block.confidence}%</strong><small>Rozpoznání je orientační; změny se ukládají pouze v tomto prohlížeči.</small></div></aside>`;
}

function readyContent(): string {
  const project = state.project;
  const slide = selectedSlide();
  if (!project || !slide) return emptyContent();
  const feedback = state.error
    ? `<strong>${esc(state.error)}</strong> Aktuální projekt zůstává dostupný v této relaci.`
    : (state.imageMode ? 'Tažením označte oblast obrázku nebo ikony.' : (state.selectedImageId ? 'Vybraný obrázek můžete vyměnit, přetáhnout nebo změnit jeho velikost.' : (state.selectedBlockId ? 'Vybraný blok můžete upravit přímo na slidu nebo v panelu vlastností.' : 'Klikněte na rozpoznaný textový blok, nebo odemkněte oblast obrázku.')));
  return `<section class="slide-editor-ready"><div class="slide-editor-toolbar"><div><p class="eyebrow">Rozpracovaný projekt</p><strong>${esc(project.fileName)}</strong><span>${project.slides.length} slidů · upravujete slide ${slide.pageNumber}</span></div><div class="slide-editor-toolbar-actions"><button class="button button-quiet" type="button" data-editor-reset>Nový soubor</button><button class="button button-quiet${state.imageMode ? ' is-active' : ''}" type="button" data-image-mode>${state.imageMode ? 'Zrušit označování' : 'Odemknout obrázek'}</button><button class="button button-primary" type="button" data-editor-export>Exportovat do PowerPointu ↗</button></div></div><div class="slide-editor-layout"><aside class="slide-editor-slides"><div class="slide-editor-panel-heading"><p class="eyebrow">Slidy</p><strong>${project.slides.length}</strong></div><div class="slide-thumbnails">${project.slides.map(thumbnail).join('')}</div></aside><main class="slide-editor-main"><div class="slide-editor-stage-wrap"><div class="slide-editor-stage${state.imageMode ? ' is-image-mode' : ''}" data-editor-stage style="aspect-ratio:${slide.width} / ${slide.height};"><img class="slide-editor-background" src="${esc(slide.imageUrl)}" alt="Slide ${slide.pageNumber} — původní grafika" />${slide.imageBlocks.map((image) => imageMarkup(image, slide)).join('')}${slide.blocks.map((block) => blockMarkup(block, slide)).join('')}</div></div><p class="slide-editor-feedback" data-editor-feedback role="status" aria-live="polite">${feedback}</p></main>${inspector()}</div><div class="slide-editor-footnote"><strong>Jak funguje úprava obrázku:</strong> U PDF nebo sloučeného PPTX slidu označíte oblast ikony, nahrajete náhradu a ta se do exportu vloží jako samostatný upravitelný objekt. U PPTX s nativními objekty se zachová jejich pozice; upravené obrázky překryjí původní grafiku a exportují se jako samostatné objekty.</div></section>`;
}

function page(): string {
  let content = emptyContent();
  if (state.phase === 'processing') content = processingContent();
  if (state.phase === 'ready') content = readyContent();
  if (state.phase === 'error') content = errorContent();
  return `<section class="slide-editor-page wrap" data-slide-editor>${pageIntro()}${content}</section>`;
}

export function renderSlideEditor(): string {
  state = freshState();
  return page();
}

function replacePage(root: HTMLElement): void {
  const current = root.querySelector<HTMLElement>('[data-slide-editor]');
  current?.replaceWith(document.createRange().createContextualFragment(page()));
  bindEditorEvents(root);
}

function updateBlock(block: SlideTextBlock, changes: Partial<SlideTextBlock>): void {
  Object.assign(block, changes, { edited: true });
  scheduleSave();
}

function scheduleSave(): void {
  if (!state.project) return;
  window.clearTimeout(saveTimer);
  saveTimer = window.setTimeout(() => { if (state.project) void saveProject(state.project); }, 350);
}

function updateEditorBlock(root: HTMLElement, block: SlideTextBlock): void {
  const element = root.querySelector<HTMLElement>(`[data-block-id="${CSS.escape(block.id)}"]`);
  const textarea = element?.querySelector<HTMLTextAreaElement>('[data-block-text]');
  if (textarea) {
    textarea.value = block.text;
    textarea.style.color = block.color;
    textarea.style.fontWeight = block.bold ? '800' : '500';
    textarea.style.fontStyle = block.italic ? 'italic' : 'normal';
    textarea.style.textAlign = block.align;
  }
  if (element) {
    element.style.cssText = blockStyle(block, selectedSlide()!);
    element.classList.toggle('is-edited', isBlockEdited(block));
  }
}

function updateEditorImage(root: HTMLElement, image: SlideImageBlock): void {
  const element = root.querySelector<HTMLElement>(`[data-image-id="${CSS.escape(image.id)}"]`);
  if (!element) return;
  element.style.cssText = imageStyle(image, selectedSlide()!);
  element.classList.toggle('has-image', Boolean(image.imageUrl));
  element.classList.toggle('is-edited', image.edited);
  const preview = element.querySelector<HTMLImageElement>('img');
  if (preview) preview.src = image.imageUrl;
}

function updateImageBlock(image: SlideImageBlock, changes: Partial<SlideImageBlock>): void {
  Object.assign(image, changes, { edited: true });
  scheduleSave();
}

function selectBlock(root: HTMLElement, blockId: string | null): void {
  state.selectedBlockId = blockId;
  state.selectedImageId = null;
  const stage = root.querySelector<HTMLElement>('[data-editor-stage]');
  stage?.querySelectorAll<HTMLElement>('[data-block-id]').forEach((element) => element.classList.toggle('is-selected', element.dataset.blockId === blockId));
  stage?.querySelectorAll<HTMLElement>('[data-image-id]').forEach((element) => element.classList.remove('is-selected'));
  const inspectorElement = root.querySelector<HTMLElement>('.slide-editor-inspector');
  if (inspectorElement) inspectorElement.replaceWith(document.createRange().createContextualFragment(inspector()));
  bindInspectorEvents(root);
  const feedback = root.querySelector<HTMLElement>('[data-editor-feedback]');
  if (feedback && blockId) feedback.textContent = 'Text se ukládá lokálně. Přetáhněte blok nebo použijte úchyt vpravo dole.';
}

function selectImage(root: HTMLElement, imageId: string | null): void {
  state.selectedImageId = imageId;
  state.selectedBlockId = null;
  const stage = root.querySelector<HTMLElement>('[data-editor-stage]');
  stage?.querySelectorAll<HTMLElement>('[data-image-id]').forEach((element) => element.classList.toggle('is-selected', element.dataset.imageId === imageId));
  stage?.querySelectorAll<HTMLElement>('[data-block-id]').forEach((element) => element.classList.remove('is-selected'));
  const inspectorElement = root.querySelector<HTMLElement>('.slide-editor-inspector');
  if (inspectorElement) inspectorElement.replaceWith(document.createRange().createContextualFragment(inspector()));
  bindInspectorEvents(root);
  const feedback = root.querySelector<HTMLElement>('[data-editor-feedback]');
  if (feedback && imageId) feedback.textContent = 'Vyberte nový soubor, nebo oblast přetáhněte a změňte její velikost.';
}

function stagePoint(event: PointerEvent, stage: HTMLElement, slide: SlideModel): { x: number; y: number } {
  const rect = stage.getBoundingClientRect();
  return { x: ((event.clientX - rect.left) / rect.width) * slide.width, y: ((event.clientY - rect.top) / rect.height) * slide.height };
}

function selectionBox(start: { x: number; y: number }, end: { x: number; y: number }, slide: SlideModel): { x: number; y: number; width: number; height: number } {
  const x = clamp(Math.min(start.x, end.x), 0, Math.max(0, slide.width - 24));
  const y = clamp(Math.min(start.y, end.y), 0, Math.max(0, slide.height - 16));
  return {
    x,
    y,
    width: clamp(Math.abs(end.x - start.x), 24, slide.width - x),
    height: clamp(Math.abs(end.y - start.y), 16, slide.height - y),
  };
}

function selectionStyle(box: { x: number; y: number; width: number; height: number }, slide: SlideModel): string {
  return `left:${(box.x / slide.width) * 100}%;top:${(box.y / slide.height) * 100}%;width:${(box.width / slide.width) * 100}%;height:${(box.height / slide.height) * 100}%;`;
}

function bindStageEvents(root: HTMLElement): void {
  const stage = root.querySelector<HTMLElement>('[data-editor-stage]');
  const slide = selectedSlide();
  if (!stage || !slide) return;
  let action: { type: 'move' | 'resize'; object: 'text' | 'image'; item: SlideTextBlock | SlideImageBlock; start: { x: number; y: number }; box: { x: number; y: number; width: number; height: number } } | { type: 'create-image'; start: { x: number; y: number }; selection: HTMLElement } | null = null;
  let suppressNextClick = false;
  stage.addEventListener('click', (event) => {
    if (suppressNextClick) {
      suppressNextClick = false;
      return;
    }
    const target = event.target as HTMLElement;
    const image = target.closest<HTMLElement>('[data-image-id]');
    if (image) {
      selectImage(root, image.dataset.imageId ?? null);
      return;
    }
    const block = target.closest<HTMLElement>('[data-block-id]');
    selectBlock(root, block?.dataset.blockId ?? null);
  });
  stage.addEventListener('pointerdown', (event) => {
    const target = event.target as HTMLElement;
    const start = stagePoint(event, stage, slide);
    const imageElement = target.closest<HTMLElement>('[data-image-id]');
    const image = slide.imageBlocks.find((item) => item.id === imageElement?.dataset.imageId);
    if (imageElement && image) {
      selectImage(root, image.id);
      action = { type: 'move', object: 'image', item: image, start, box: { x: image.x, y: image.y, width: image.width, height: image.height } };
      if (target.closest('[data-resize-image]')) action.type = 'resize';
      imageElement.setPointerCapture(event.pointerId);
      event.preventDefault();
      return;
    }
    const blockElement = target.closest<HTMLElement>('[data-block-id]');
    const block = slide.blocks.find((item) => item.id === blockElement?.dataset.blockId);
    if (blockElement && block && !target.closest('textarea')) {
      selectBlock(root, block.id);
      action = { type: 'move', object: 'text', item: block, start, box: { x: block.x, y: block.y, width: block.width, height: block.height } };
      if (target.closest('[data-resize-block]')) action.type = 'resize';
      blockElement.setPointerCapture(event.pointerId);
      event.preventDefault();
      return;
    }
    if (state.imageMode) {
      const selection = document.createElement('div');
      selection.className = 'slide-editor-image-selection';
      selection.style.cssText = selectionStyle({ x: start.x, y: start.y, width: 24, height: 16 }, slide);
      stage.append(selection);
      stage.setPointerCapture(event.pointerId);
      action = { type: 'create-image', start, selection };
      event.preventDefault();
    }
  });
  stage.addEventListener('pointermove', (event) => {
    if (!action) return;
    const point = stagePoint(event, stage, slide);
    if (action.type === 'create-image') {
      action.selection.style.cssText = selectionStyle(selectionBox(action.start, point, slide), slide);
      return;
    }
    const dx = point.x - action.start.x;
    const dy = point.y - action.start.y;
    if (action.object === 'text') {
      const block = action.item as SlideTextBlock;
      if (action.type === 'move') updateBlock(block, { x: clamp(action.box.x + dx, 0, slide.width - action.box.width), y: clamp(action.box.y + dy, 0, slide.height - action.box.height) });
      else updateBlock(block, { width: clamp(action.box.width + dx, 24, slide.width - action.box.x), height: clamp(action.box.height + dy, 16, slide.height - action.box.y) });
      updateEditorBlock(root, block);
    } else {
      const image = action.item as SlideImageBlock;
      if (action.type === 'move') updateImageBlock(image, { x: clamp(action.box.x + dx, 0, slide.width - action.box.width), y: clamp(action.box.y + dy, 0, slide.height - action.box.height) });
      else updateImageBlock(image, { width: clamp(action.box.width + dx, 24, slide.width - action.box.x), height: clamp(action.box.height + dy, 16, slide.height - action.box.y) });
      updateEditorImage(root, image);
    }
  });
  const finish = (event: PointerEvent) => {
    if (!action) return;
    if (action.type === 'create-image') {
      const box = selectionBox(action.start, stagePoint(event, stage, slide), slide);
      action.selection.remove();
      action = null;
      suppressNextClick = true;
      if (box.width < 24 || box.height < 16) return;
      const image: SlideImageBlock = { id: `image-${makeId()}`, ...box, imageUrl: '', edited: true, maskColor: '#ffffff', altText: 'Náhrada obrázku' };
      slide.imageBlocks.push(image);
      state.imageMode = false;
      state.selectedImageId = image.id;
      state.selectedBlockId = null;
      scheduleSave();
      replacePage(root);
      return;
    }
    action = null;
  };
  stage.addEventListener('pointerup', finish);
  stage.addEventListener('pointercancel', finish);
}

function bindInspectorEvents(root: HTMLElement): void {
  const image = selectedImage();
  if (image) {
    const upload = root.querySelector<HTMLInputElement>('[data-image-upload]');
    upload?.addEventListener('change', async () => {
      const file = upload.files?.[0];
      if (!file) return;
      const validationError = validateImageFile(file);
      if (validationError) {
        state.error = validationError;
        replacePage(root);
        return;
      }
      try {
        const imageUrl = await readFileAsDataUrl(file);
        updateImageBlock(image, { imageUrl, altText: image.altText === 'Náhrada obrázku' ? file.name.replace(/\.[^.]+$/, '') : image.altText });
        state.error = '';
        replacePage(root);
      } catch {
        state.error = 'Obrázek se nepodařilo načíst. Zkuste jiný soubor.';
        replacePage(root);
      }
    });
    const maskColor = root.querySelector<HTMLInputElement>('[data-image-mask-color]');
    maskColor?.addEventListener('input', () => { updateImageBlock(image, { maskColor: maskColor.value }); updateEditorImage(root, image); });
    const altText = root.querySelector<HTMLInputElement>('[data-image-alt]');
    altText?.addEventListener('input', () => { updateImageBlock(image, { altText: altText.value }); });
    root.querySelector<HTMLButtonElement>('[data-image-remove]')?.addEventListener('click', () => {
      const slide = selectedSlide();
      if (!slide) return;
      slide.imageBlocks = slide.imageBlocks.filter((item) => item.id !== image.id);
      state.selectedImageId = null;
      scheduleSave();
      replacePage(root);
    });
    return;
  }
  const block = selectedBlock();
  if (!block) return;
  const text = root.querySelector<HTMLTextAreaElement>('[data-inspector-text]');
  text?.addEventListener('input', () => { updateBlock(block, { text: text.value }); updateEditorBlock(root, block); });
  const fontSize = root.querySelector<HTMLInputElement>('[data-inspector-font-size]');
  fontSize?.addEventListener('input', () => { updateBlock(block, { fontSize: clamp(Number(fontSize.value) || block.fontSize, 8, 120) }); updateEditorBlock(root, block); });
  const color = root.querySelector<HTMLInputElement>('[data-inspector-color]');
  color?.addEventListener('input', () => { updateBlock(block, { color: color.value }); updateEditorBlock(root, block); });
  const bold = root.querySelector<HTMLInputElement>('[data-inspector-bold]');
  bold?.addEventListener('change', () => { updateBlock(block, { bold: bold.checked }); updateEditorBlock(root, block); });
  const italic = root.querySelector<HTMLInputElement>('[data-inspector-italic]');
  italic?.addEventListener('change', () => { updateBlock(block, { italic: italic.checked }); updateEditorBlock(root, block); });
  const align = root.querySelector<HTMLSelectElement>('[data-inspector-align]');
  align?.addEventListener('change', () => { updateBlock(block, { align: align.value as SlideTextBlock['align'] }); updateEditorBlock(root, block); });
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => typeof reader.result === 'string' ? resolve(reader.result) : reject(new Error('Image data is unavailable.')));
    reader.addEventListener('error', () => reject(reader.error ?? new Error('Image read failed.')));
    reader.readAsDataURL(file);
  });
}

function bindReadyEvents(root: HTMLElement): void {
  root.querySelectorAll<HTMLButtonElement>('[data-slide-index]').forEach((button) => button.addEventListener('click', () => {
    state.selectedSlide = Number(button.dataset.slideIndex) || 0;
    state.selectedBlockId = null;
    state.selectedImageId = null;
    state.imageMode = false;
    replacePage(root);
  }));
  root.querySelector<HTMLButtonElement>('[data-image-mode]')?.addEventListener('click', () => {
    state.imageMode = !state.imageMode;
    state.selectedBlockId = null;
    state.selectedImageId = null;
    replacePage(root);
  });
  root.querySelectorAll<HTMLTextAreaElement>('[data-block-text]').forEach((textarea) => textarea.addEventListener('focus', () => {
    const id = textarea.closest<HTMLElement>('[data-block-id]')?.dataset.blockId;
    if (id) selectBlock(root, id);
  }));
  root.querySelectorAll<HTMLTextAreaElement>('[data-block-text]').forEach((textarea) => textarea.addEventListener('input', () => {
    const id = textarea.closest<HTMLElement>('[data-block-id]')?.dataset.blockId;
    const block = selectedSlide()?.blocks.find((item) => item.id === id);
    if (block) {
      updateBlock(block, { text: textarea.value });
      const inspectorText = root.querySelector<HTMLTextAreaElement>('[data-inspector-text]');
      if (inspectorText && document.activeElement !== inspectorText) inspectorText.value = textarea.value;
    }
  }));
  bindStageEvents(root);
  bindInspectorEvents(root);
}

async function exportProject(root: HTMLElement): Promise<void> {
  if (!state.project) return;
  const button = root.querySelector<HTMLButtonElement>('[data-editor-export]');
  const feedback = root.querySelector<HTMLElement>('[data-editor-feedback]');
  if (button) { button.disabled = true; button.textContent = 'Připravuji PPTX…'; }
  if (feedback) feedback.textContent = 'Skládám původní grafiku a editovatelné textové i obrázkové objekty…';
  try {
    const { downloadPptx } = await import('./export');
    await downloadPptx(state.project);
    if (feedback) feedback.textContent = 'PowerPoint je připravený ke stažení. Po otevření ověřte text a rozvržení.';
  } catch {
    if (feedback) feedback.textContent = 'Export se nepodařil. Zkuste projekt znovu načíst nebo zmenšit počet slidů.';
  } finally {
    if (button) { button.disabled = false; button.textContent = 'Exportovat do PowerPointu ↗'; }
  }
}

function bindEditorEvents(root: HTMLElement): void {
  const upload = root.querySelector<HTMLInputElement>('[data-editor-upload]');
  const dropzone = root.querySelector<HTMLElement>('[data-editor-dropzone]');
  const reset = root.querySelectorAll<HTMLButtonElement>('[data-editor-reset]');
  const start = (file: File | undefined) => { if (file) void processFile(root, file); };
  upload?.addEventListener('change', () => start(upload.files?.[0]));
  dropzone?.addEventListener('dragover', (event) => { event.preventDefault(); dropzone.classList.add('is-dragging'); });
  dropzone?.addEventListener('dragleave', () => dropzone.classList.remove('is-dragging'));
  dropzone?.addEventListener('drop', (event) => { event.preventDefault(); dropzone.classList.remove('is-dragging'); start(event.dataTransfer?.files[0]); });
  reset.forEach((button) => button.addEventListener('click', () => { void resetProject(root); }));
  root.querySelector<HTMLButtonElement>('[data-editor-export]')?.addEventListener('click', () => { void exportProject(root); });
  if (state.phase === 'ready') bindReadyEvents(root);
}

async function resetProject(root: HTMLElement): Promise<void> {
  recoveryProject = state.project;
  processToken += 1;
  await clearProject();
  state = freshState();
  replacePage(root);
}

async function processFile(root: HTMLElement, file: File): Promise<void> {
  const token = ++processToken;
  const previousProject = state.project ?? recoveryProject;
  const isPptx = file.name.toLowerCase().endsWith('.pptx') || file.type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
  const validationError = validateSourceFile(file);
  if (validationError) { state.phase = 'error'; state.error = validationError; replacePage(root); return; }
  state = { ...freshState(), phase: 'processing', progressMessage: isPptx ? 'Připravuji PowerPoint…' : 'Připravuji PDF…' };
  replacePage(root);
  try {
    const processor = isPptx ? (await import('./pptx')).processPptx : (await import('./pdf')).processPdf;
    const slides = await processor(file, (progress) => {
      if (token !== processToken) return;
      const stageOffset = progress.stage === 'ocr' ? 50 : 0;
      state.progress = Math.min(99, Math.round(stageOffset + ((progress.current - 1) / Math.max(1, progress.total)) * 50));
      state.progressMessage = progress.message;
      const element = root.querySelector<HTMLElement>('[data-slide-editor]');
      const progressBar = element?.querySelector<HTMLProgressElement>('progress');
      const heading = element?.querySelector<HTMLElement>('.slide-editor-processing h2');
      const copy = element?.querySelector<HTMLElement>('.slide-editor-processing p:last-child');
      if (progressBar) progressBar.value = state.progress;
      if (heading) heading.textContent = state.progressMessage;
      if (copy) copy.textContent = `${state.progress}% dokončeno. U větší prezentace může rozpoznání textu chvíli trvat.`;
    });
    if (token !== processToken) return;
    const project: SlideEditorProject = { id: makeId(), fileName: `${sanitizeFileName(file.name)}.${isPptx ? 'pptx' : 'pdf'}`, createdAt: new Date().toISOString(), sourceType: isPptx ? 'pptx' : 'pdf', slides };
    state = { ...state, phase: 'ready', project, selectedSlide: 0, selectedBlockId: slides[0]?.blocks[0]?.id ?? null, selectedImageId: null, imageMode: false, progress: 100, progressMessage: 'Hotovo' };
    const persisted = await saveProject(project);
    recoveryProject = null;
    if (!persisted) state.error = 'Projekt se nepodařilo automaticky uložit do tohoto prohlížeče.';
    replacePage(root);
  } catch (error) {
    if (token !== processToken) return;
    if (previousProject) {
      state = { ...freshState(), phase: 'ready', project: previousProject, selectedSlide: 0, selectedBlockId: previousProject.slides[0]?.blocks[0]?.id ?? null, selectedImageId: null, imageMode: false, error: userFacingProcessError(error) };
      replacePage(root);
      return;
    }
    state.phase = 'error';
    state.error = userFacingProcessError(error);
    replacePage(root);
  }
}

export function mountSlideEditor(root: HTMLElement): void {
  state = freshState();
  bindEditorEvents(root);
  void readProject().then((project) => {
    if (!project || state.phase !== 'empty') return;
    state = { ...state, phase: 'ready', project, selectedSlide: 0, selectedBlockId: project.slides[0]?.blocks[0]?.id ?? null, selectedImageId: null, imageMode: false };
    replacePage(root);
  });
}
