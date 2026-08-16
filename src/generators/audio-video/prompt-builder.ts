import type { AudioVideoState } from './config';

export function buildAudioVideoPrompt(state: AudioVideoState): string {
  const isVideo = state.mediaType === 'Video';
  const isAudio = state.mediaType === 'Audio';
  const lines = [
    `Vygeneruj prompt pro ${state.mediaType === 'CinematicOverview' ? 'filmový overview' : state.mediaType.toLowerCase()} v Gemini Notebook.`, '',
    'ZÁKLADNÍ PARAMETRY:', `- Téma: ${state.topic.trim() || '[doplňte téma]'}`, `- Délka: ${state.duration}`, `- Jazyk: ${state.outputLanguage}`, `- Cílová skupina: ${state.targetGroup}`, `- Úroveň hloubky: ${state.depthLevel}`, '',
    'STYL VYPRÁVĚNÍ:', `- Styl: ${state.narrationStyle}`, `- Tón: ${state.narrationTone}`, `- Tempo: ${state.pacing}`,
  ];
  if (isAudio || state.mediaType === 'CinematicOverview') {
    lines.push('', 'MLUVČÍ A SCÉNÁŘ:', `- Mluvčí 1: ${state.speaker1} / ${state.speaker1Personality}`, `- Mluvčí 2: ${state.speaker2} / ${state.speaker2Personality}`, `- Kontext: ${state.audioContext || 'vycházej pouze z podkladů'}`, `- Literární styl: ${state.literaryStyle}`, `- Filmová dynamika: ${state.filmStyle}`, `- Vyvážení rolí: ${state.speakerBalance}`, `- Práce s tichem: ${state.silenceHandling}`);
    if (state.roleLockEnabled) lines.push('- Udržuj konzistentní role a nepřehazuj mluvčí.', state.preventRoleSwitch ? '- Neměň role mluvčích během dialogu.' : '- Role měň jen s jasnou dramaturgickou funkcí.');
    if (state.allowOverlap) lines.push('- Přirozené pauzy, reakce a občasné překrytí hlasů použij jen tam, kde zlepšuje autenticitu.');
  }
  if (isVideo) lines.push('', 'VIZUÁLNÍ STYL:', `- Poměr stran: ${state.aspectRatio}`, `- Vizuální styl: ${state.visualStyle}`, `- Art styl: ${state.artStyle}`, `- Barevnost: ${state.colorTone}`, `- Styl obrázků: ${state.imageStyle}`, `- Vyhnout se: ${state.forbiddenElements || 'generickým dekoracím'}`);
  lines.push('', 'STRUKTURA:', `- Členění: ${state.structure}`, `- Přechody: ${state.transitions}`, `- Shrnutí na konci: ${state.summaryAtEnd}`, `- Míra opakování: ${state.repetitionLevel}`, '', 'ŘÍZENÍ OBSAHU:', `- Práce se zdroji: ${state.sourceHandling}`);
  if (state.focusOn.trim()) lines.push(`- Zaměřit se na: ${state.focusOn.trim()}`);
  if (state.omit.trim()) lines.push(`- Vynechat: ${state.omit.trim()}`);
  const extras = [state.explainTerms ? 'vysvětlovat pojmy' : '', state.useExamples ? 'používat příklady' : '', state.useAnalogies ? 'používat analogie' : ''].filter(Boolean);
  if (extras.length) lines.push(`- Doplňkové instrukce: ${extras.join(', ')}`);
  if (state.notes.trim()) lines.push(`- Poznámky: ${state.notes.trim()}`);
  lines.push('', 'KONTROLA:', '- Každý důležitý bod opři o zdroj nebo označ jako návrh.', '- Výsledkem je prompt pro další AI workflow; tento generátor audio ani video sám nevyrábí.');
  return lines.join('\n');
}
