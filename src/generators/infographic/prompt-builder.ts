export interface InfographicState { subject: string; audience: string; structure: string; extra: string; ratio: string; detail: 'Minimalistická' | 'Standardní' | 'Detailní'; style: string; layoutPreset: string; colorMode: string; fixTypography: boolean; spellcheck: boolean; }

export const defaultInfographicState: InfographicState = { subject: '', audience: '', structure: 'Úvod → hlavní body → závěr', extra: '', ratio: '16:9', detail: 'Standardní', style: 'nordic', layoutPreset: 'standard_grid', colorMode: 'auto', fixTypography: true, spellcheck: true };

export function buildInfographicPrompt(data: InfographicState): string {
  const lines = [
    'Vygeneruj prompt pro výukovou infografiku v Gemini Notebook workflow.', '',
    'OBSAH:', `- Téma: ${data.subject.trim() || '[doplňte téma]'}`, `- Cílové publikum: ${data.audience.trim() || '[doplňte publikum]'}`, `- Struktura: ${data.structure}`, `- Dodatečné informace: ${data.extra.trim() || 'nejsou'}`, '',
    'VIZUÁLNÍ KONFIGURACE:', `- Poměr stran: ${data.ratio}`, `- Úroveň detailu: ${data.detail}`, `- Vizuální styl: ${data.style}`, `- Layout preset: ${data.layoutPreset}`, `- Barevný režim / paleta: ${data.colorMode}`,
    data.fixTypography ? '- Hlídání typografie: ano; nepřekrývej text a zachovej čitelnost.' : '- Hlídání typografie: výchozí.',
    data.spellcheck ? '- Kontrola pravopisu: ano; před výstupem projdi českou diakritiku a názvy.' : '- Kontrola pravopisu: výchozí.', '',
    'PRAVIDLA:', '- Zdroje a důležitá čísla nejprve ověř proti podkladům.', '- Každý blok má jednu hlavní myšlenku a krátký popisek.', '- Pokud podklady něco nepokrývají, označ mezeru místo domyšlení.', '- Výstupem tohoto nástroje je prompt, ne hotová infografika.',
  ];
  return lines.join('\n');
}
