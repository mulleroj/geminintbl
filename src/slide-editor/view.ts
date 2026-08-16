import { clearProject, readProject, saveProject } from './storage';
import { clamp, sanitizeFileName, userFacingProcessError, validatePdfFile } from './model';
import type { SlideEditorProject, SlideModel, SlideTextBlock } from './types';

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
  progress: number;
  progressMessage: string;
  error: string;
}

let state: EditorState;
let saveTimer: number | undefined;
let processToken = 0;
let recoveryProject: SlideEditorProject | null = null;

function freshState(): EditorState {
  return { phase: 'empty', project: null, selectedSlide: 0, selectedBlockId: null, progress: 0, progressMessage: '', error: '' };
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

function pageIntro(): string {
  return `<header class="slide-editor-intro"><div><p class="eyebrow">Praktický nástroj Notebook Hub CZ</p><h1>Editor prezentací</h1><p class="lead">Nahrajte PDF prezentaci z NotebookLM, opravte textové bloky a stáhněte výsledek jako editovatelný PowerPoint.</p></div><span class="editor-local-badge"><strong>Lokálně</strong><small>PDF zůstává ve vašem zařízení</small></span></header>`;
}

function steps(): string {
  return `<div class="slide-editor-steps" aria-label="Postup"><div><span>01</span><strong>Nahrajte PDF</strong><small>Ideálně export Slide Decku z NotebookLM.</small></div><div><span>02</span><strong>Upravte text</strong><small>OCR text můžete přepsat, posunout a změnit.</small></div><div><span>03</span><strong>Exportujte PPTX</strong><small>Grafika slidu zůstane jako pozadí.</small></div></div>`;
}

function emptyContent(): string {
  return `<section class="slide-editor-empty"><div class="slide-editor-notice"><strong>${'✦'} Zpracování přímo v prohlížeči</strong><span>PDF ani jeho stránky neposíláme na server Notebook Hubu. OCR model se při prvním použití načte do prohlížeče.</span></div>${steps()}<label class="slide-editor-dropzone" data-editor-dropzone><input aria-label="Vyberte PDF prezentaci" data-editor-upload type="file" accept="application/pdf,.pdf" /><span class="drop-icon">↑</span><strong>Nahrajte PDF prezentaci</strong><small>Přetáhněte soubor sem nebo jej vyberte. Limit: 40 MB a 50 stran.</small></label><p class="slide-editor-hint"><strong>Pro nejlepší výsledek:</strong> používejte slidy s jasně oddělenými textovými bloky. OCR a maskování pozadí jsou přibližné, proto si výsledek před sdílením zkontrolujte.</p></section>`;
}

function processingContent(): string {
  return `<section class="slide-editor-processing" aria-live="polite"><div class="processing-mark">${'✦'}</div><p class="eyebrow">${state.progress < 50 ? 'PDF' : 'OCR'} / zpracování v prohlížeči</p><h2>${esc(state.progressMessage || 'Připravuji slidy…')}</h2><progress aria-label="Postup zpracování PDF" max="100" value="${Math.min(100, state.progress)}">${state.progress}%</progress><p>${state.progress}% dokončeno. U větší prezentace může rozpoznání textu chvíli trvat.</p></section>`;
}

function errorContent(): string {
  return `<section class="slide-editor-error" role="alert"><div class="error-mark">!</div><div><p class="eyebrow">PDF se nepodařilo zpracovat</p><h2>${esc(state.error)}</h2><p>Zkontrolujte, že jde o platné PDF s nejvýše 50 stranami a zkuste to znovu. Původní soubor nebyl nahrán na server.</p><button class="button button-primary" type="button" data-editor-reset>Vybrat jiný soubor</button></div></section>`;
}

function thumbnail(slide: SlideModel, index: number): string {
  const active = index === state.selectedSlide;
  return `<button class="slide-thumbnail${active ? ' is-active' : ''}" type="button" data-slide-index="${index}" aria-label="Slide ${slide.pageNumber}" aria-pressed="${active}"><span>${slide.pageNumber}</span><img src="${esc(slide.imageUrl)}" alt="Náhled slidu ${slide.pageNumber}" /></button>`;
}

function blockStyle(block: SlideTextBlock, slide: SlideModel): string {
  return `left:${(block.x / slide.width) * 100}%;top:${(block.y / slide.height) * 100}%;width:${(block.width / slide.width) * 100}%;height:${(block.height / slide.height) * 100}%;--font-ratio:${block.fontSize / slide.width};--mask-color:${esc(block.maskColor)};`;
}

function blockMarkup(block: SlideTextBlock, slide: SlideModel): string {
  const selected = block.id === state.selectedBlockId;
  return `<div class="slide-editor-text-block${selected ? ' is-selected' : ''}" data-block-id="${esc(block.id)}" style="${blockStyle(block, slide)}"><textarea class="slide-editor-textarea" data-block-text spellcheck="true" aria-label="Textový blok" style="color:${esc(block.color)};font-weight:${block.bold ? 800 : 500};font-style:${block.italic ? 'italic' : 'normal'};text-align:${block.align};">${esc(block.text)}</textarea><button class="slide-editor-resize" type="button" data-resize-block aria-label="Změnit velikost textového bloku">↘</button></div>`;
}

function inspector(): string {
  const block = selectedBlock();
  if (!block) return `<aside class="slide-editor-inspector"><p class="eyebrow">Vlastnosti</p><h2>Vyberte textový blok</h2><p class="muted">Klikněte na text na plátně. Potom jej můžete přepsat, přetáhnout nebo upravit jeho vzhled.</p><div class="inspector-tip"><strong>OCR confidence</strong><span>Každý blok je pouze návrh. Čísla, diakritiku a názvy před exportem ověřte.</span></div></aside>`;
  return `<aside class="slide-editor-inspector"><p class="eyebrow">Vybraný textový blok</p><h2>Vlastnosti</h2><label class="editor-field editor-field-full"><span>Text</span><textarea rows="6" data-inspector-text>${esc(block.text)}</textarea></label><div class="editor-field-grid"><label class="editor-field"><span>Velikost</span><input type="number" min="8" max="120" step="1" value="${Math.round(block.fontSize)}" data-inspector-font-size /></label><label class="editor-field"><span>Barva</span><input type="color" value="${esc(block.color)}" data-inspector-color /></label></div><div class="editor-checks"><label><input type="checkbox" data-inspector-bold${block.bold ? ' checked' : ''} /> Tučné</label><label><input type="checkbox" data-inspector-italic${block.italic ? ' checked' : ''} /> Kurzíva</label></div><label class="editor-field"><span>Zarovnání</span><select data-inspector-align><option value="left"${block.align === 'left' ? ' selected' : ''}>Vlevo</option><option value="center"${block.align === 'center' ? ' selected' : ''}>Na střed</option><option value="right"${block.align === 'right' ? ' selected' : ''}>Vpravo</option></select></label><div class="inspector-confidence"><span>OCR confidence</span><strong>${block.confidence}%</strong><small>Rozpoznání je orientační; změny se ukládají pouze v tomto prohlížeči.</small></div></aside>`;
}

function readyContent(): string {
  const project = state.project;
  const slide = selectedSlide();
  if (!project || !slide) return emptyContent();
  const feedback = state.error
    ? `<strong>${esc(state.error)}</strong> Aktuální projekt zůstává dostupný v této relaci.`
    : (state.selectedBlockId ? 'Vybraný blok můžete upravit přímo na slidu nebo v panelu vlastností.' : 'Klikněte na rozpoznaný textový blok a začněte upravovat.');
  return `<section class="slide-editor-ready"><div class="slide-editor-toolbar"><div><p class="eyebrow">Rozpracovaný projekt</p><strong>${esc(project.fileName)}</strong><span>${project.slides.length} slidů · upravujete slide ${slide.pageNumber}</span></div><div class="slide-editor-toolbar-actions"><button class="button button-quiet" type="button" data-editor-reset>Nové PDF</button><button class="button button-primary" type="button" data-editor-export>Exportovat do PowerPointu ↗</button></div></div><div class="slide-editor-layout"><aside class="slide-editor-slides"><div class="slide-editor-panel-heading"><p class="eyebrow">Slidy</p><strong>${project.slides.length}</strong></div><div class="slide-thumbnails">${project.slides.map(thumbnail).join('')}</div></aside><main class="slide-editor-main"><div class="slide-editor-stage-wrap"><div class="slide-editor-stage" data-editor-stage style="aspect-ratio:${slide.width} / ${slide.height};"><img class="slide-editor-background" src="${esc(slide.imageUrl)}" alt="Slide ${slide.pageNumber} — původní grafika" />${slide.blocks.map((block) => blockMarkup(block, slide)).join('')}</div></div><p class="slide-editor-feedback" data-editor-feedback role="status" aria-live="polite">${feedback}</p></main>${inspector()}</div><div class="slide-editor-footnote"><strong>Jak funguje pozadí:</strong> původní slide zůstává jako obrázek. U rozpoznaných oblastí se vytvoří přibližná barevná maska a nad ní skutečný editovatelný text. U složitých nebo fotografických pozadí může být maska viditelná.</div></section>`;
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
  Object.assign(block, changes);
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
  if (element) element.style.cssText = blockStyle(block, selectedSlide()!);
}

function selectBlock(root: HTMLElement, blockId: string | null): void {
  state.selectedBlockId = blockId;
  const stage = root.querySelector<HTMLElement>('[data-editor-stage]');
  stage?.querySelectorAll<HTMLElement>('[data-block-id]').forEach((element) => element.classList.toggle('is-selected', element.dataset.blockId === blockId));
  const inspectorElement = root.querySelector<HTMLElement>('.slide-editor-inspector');
  if (inspectorElement) inspectorElement.replaceWith(document.createRange().createContextualFragment(inspector()));
  bindInspectorEvents(root);
  const feedback = root.querySelector<HTMLElement>('[data-editor-feedback]');
  if (feedback && blockId) feedback.textContent = 'Text se ukládá lokálně. Přetáhněte blok nebo použijte úchyt vpravo dole.';
}

function stagePoint(event: PointerEvent, stage: HTMLElement, slide: SlideModel): { x: number; y: number } {
  const rect = stage.getBoundingClientRect();
  return { x: ((event.clientX - rect.left) / rect.width) * slide.width, y: ((event.clientY - rect.top) / rect.height) * slide.height };
}

function bindStageEvents(root: HTMLElement): void {
  const stage = root.querySelector<HTMLElement>('[data-editor-stage]');
  const slide = selectedSlide();
  if (!stage || !slide) return;
  let action: { type: 'move' | 'resize'; block: SlideTextBlock; start: { x: number; y: number }; box: { x: number; y: number; width: number; height: number } } | null = null;
  stage.addEventListener('click', (event) => {
    const block = (event.target as HTMLElement).closest<HTMLElement>('[data-block-id]');
    selectBlock(root, block?.dataset.blockId ?? null);
  });
  stage.addEventListener('pointerdown', (event) => {
    const target = event.target as HTMLElement;
    const element = target.closest<HTMLElement>('[data-block-id]');
    const block = slide.blocks.find((item) => item.id === element?.dataset.blockId);
    if (!element || !block || target.closest('textarea')) return;
    selectBlock(root, block.id);
    action = { type: target.closest('[data-resize-block]') ? 'resize' : 'move', block, start: stagePoint(event, stage, slide), box: { x: block.x, y: block.y, width: block.width, height: block.height } };
    element.setPointerCapture(event.pointerId);
    event.preventDefault();
  });
  stage.addEventListener('pointermove', (event) => {
    if (!action) return;
    const point = stagePoint(event, stage, slide);
    const dx = point.x - action.start.x;
    const dy = point.y - action.start.y;
    if (action.type === 'move') updateBlock(action.block, { x: clamp(action.box.x + dx, 0, slide.width - action.box.width), y: clamp(action.box.y + dy, 0, slide.height - action.box.height) });
    else updateBlock(action.block, { width: clamp(action.box.width + dx, 24, slide.width - action.box.x), height: clamp(action.box.height + dy, 16, slide.height - action.box.y) });
    updateEditorBlock(root, action.block);
  });
  const finish = () => { action = null; };
  stage.addEventListener('pointerup', finish);
  stage.addEventListener('pointercancel', finish);
}

function bindInspectorEvents(root: HTMLElement): void {
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

function bindReadyEvents(root: HTMLElement): void {
  root.querySelectorAll<HTMLButtonElement>('[data-slide-index]').forEach((button) => button.addEventListener('click', () => {
    state.selectedSlide = Number(button.dataset.slideIndex) || 0;
    state.selectedBlockId = null;
    replacePage(root);
  }));
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
  if (feedback) feedback.textContent = 'Skládám původní grafiku a editovatelné textové objekty…';
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
  const validationError = validatePdfFile(file);
  if (validationError) { state.phase = 'error'; state.error = validationError; replacePage(root); return; }
  state = { ...freshState(), phase: 'processing', progressMessage: 'Připravuji PDF…' };
  replacePage(root);
  try {
    const { processPdf } = await import('./pdf');
    const slides = await processPdf(file, (progress) => {
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
    const project: SlideEditorProject = { id: makeId(), fileName: sanitizeFileName(file.name) + '.pdf', createdAt: new Date().toISOString(), slides };
    state = { ...state, phase: 'ready', project, selectedSlide: 0, selectedBlockId: slides[0]?.blocks[0]?.id ?? null, progress: 100, progressMessage: 'Hotovo' };
    const persisted = await saveProject(project);
    recoveryProject = null;
    if (!persisted) state.error = 'Projekt se nepodařilo automaticky uložit do tohoto prohlížeče.';
    replacePage(root);
  } catch (error) {
    if (token !== processToken) return;
    if (previousProject) {
      state = { ...freshState(), phase: 'ready', project: previousProject, selectedSlide: 0, selectedBlockId: previousProject.slides[0]?.blocks[0]?.id ?? null, error: userFacingProcessError(error) };
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
    state = { ...state, phase: 'ready', project, selectedSlide: 0, selectedBlockId: project.slides[0]?.blocks[0]?.id ?? null };
    replacePage(root);
  });
}
