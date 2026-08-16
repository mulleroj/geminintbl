import type { PresentationState } from './config';

const lengthLabels: Record<PresentationState['deckLength'], string> = { short: 'krátká', default: 'standardní', long: 'dlouhá' };
const levels: Record<PresentationState['knowledgeLevel'], string> = { beginner: 'začátečník', intermediate: 'středně pokročilý', advanced: 'pokročilý' };

export function buildPresentationPrompt(state: PresentationState): string {
  const language = state.outputLanguage === 'custom' && state.customLanguage.trim() ? state.customLanguage.trim() : state.outputLanguage;
  const lines = [
    'Vygeneruj prompt pro prezentaci v Gemini Notebook.',
    '',
    'KONTEXT:',
    `- Téma / název: ${state.topic.trim() || '[doplňte téma]'}`,
    `- Hlavní cíl: ${state.primaryGoal.trim() || '[doplňte cíl]'}`,
    `- Cílové publikum: ${state.targetAudience.trim() || '[doplňte publikum]'}`,
    `- Úroveň znalostí: ${levels[state.knowledgeLevel]}`,
    `- Jazyk výstupu: ${language}`,
    '',
    'STRUKTURA VÝSTUPU:',
    `- Formát: ${state.deckFormat}`,
    `- Délka: ${lengthLabels[state.deckLength]}`,
    `- Počet slidů: ${state.numSlides}`,
    state.exactSlides ? `- Vygeneruj přesně ${state.numSlides} slidů, ne více ani méně.` : '- Počet slidů použij jako orientační rozsah.',
    state.oneIdea ? '- Každý slide má jednu hlavní myšlenku.' : '- Umožni více souvisejících myšlenek na jednom slidu, jen když to pomůže výkladu.',
    `- Nejvýše ${state.bulletsPerSlide} odrážek na slide.`,
    state.speakerNotes ? '- Přidej stručné mluvní poznámky s vysvětlením a zdrojem.' : '- Mluvní poznámky nepřidávej.',
    '',
    'PRÁCE SE ZDROJI:',
    state.noInventedFacts ? '- Používej jen fakta doložitelná v přiložených zdrojích; mezery označ.' : '- Návrhy mimo zdroje jasně označ jako návrhy, nikdy jako ověřená fakta.',
    state.noScreenshots ? '- Nenavrhuj screenshoty ani dekorativní obrázky bez jasné funkce.' : '- Screenshot navrhni jen tam, kde přináší skutečnou výukovou hodnotu.',
    '',
    'VIZUÁLNÍ PRAVIDLA:',
    `- Styl ilustrací: ${state.illustrationPreset}`,
    `- Atmosféra: ${state.atmosphere}`,
    state.visualConsistency ? '- Zachovej konzistentní typografii, barevnost a vizuální jazyk napříč slidy.' : '- Umožni vědomou změnu vizuálního jazyka mezi částmi.',
    state.visualConstraints.trim() ? `- Omezení: ${state.visualConstraints.trim()}` : '- Nepoužívej vizuální prvky, které odvádějí pozornost od hlavního sdělení.',
    state.constraintLevel === 'strict' ? '- Vizuální omezení uplatni striktně a upozorni na každý konflikt.' : '- Vizuální omezení uplatni jako kontrolovaný výchozí rámec.',
  ];
  if (state.themePack) lines.push(`- Tematické zasazení: ${state.themePack}.`);
  if (state.geminiNaming) lines.push('- Používej aktuální označení Gemini Notebook.');
  if (state.additionalTerminology.trim()) lines.push('', 'DODATEČNÍ TERMINOLOGIE:', state.additionalTerminology.trim());
  lines.push('', 'NA KONCI:', '- U každého hlavního tvrzení uveď zdrojovou stopu.', '- Přidej krátkou kontrolu: co musí učitel před použitím ještě ověřit.');
  return lines.join('\n');
}
