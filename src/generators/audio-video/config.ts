export interface AudioVideoState {
  mediaType: 'Video' | 'Audio' | 'CinematicOverview'; topic: string; duration: string; outputLanguage: string; targetGroup: string; depthLevel: string;
  narrationStyle: string; narrationTone: string; pacing: string; speaker1: string; speaker2: string; speaker1Personality: string; speaker2Personality: string;
  audioContext: string; literaryStyle: string; filmStyle: string; speakerBalance: string; structureLevel: string; silenceHandling: string;
  visualStyle: string; artStyle: string; structure: string; transitions: string; summaryAtEnd: string; aspectRatio: string; focusOn: string; omit: string; notes: string;
  sourceHandling: string; repetitionLevel: string; colorTone: string; imageStyle: string; forbiddenElements: string; explainTerms: boolean; useExamples: boolean; useAnalogies: boolean;
  roleLockEnabled: boolean; preventRoleSwitch: boolean; allowOverlap: boolean;
}

export const defaultAudioVideoState: AudioVideoState = {
  mediaType: 'Video', topic: '', duration: '3–5 min', outputLanguage: 'Čeština', targetGroup: 'Žáci SŠ', depthLevel: 'Střední', narrationStyle: 'Vysvětlující učitelský styl', narrationTone: 'Přístupný a věcný', pacing: 'Střední', speaker1: 'Anna', speaker2: 'Petr', speaker1Personality: 'Klidný vysvětlovač', speaker2Personality: 'Zvídavý tazatel', audioContext: '', literaryStyle: 'Přístupný výklad', filmStyle: 'Dokumentární', speakerBalance: 'speaker1_leads', structureLevel: 'medium', silenceHandling: 'natural', visualStyle: 'Automatický', artStyle: 'Bauhaus – infografická čistota', structure: 'Úvod – kapitoly – shrnutí', transitions: 'Plynulé', summaryAtEnd: 'Ano', aspectRatio: '16:9 (YouTube)', focusOn: '', omit: '', notes: '', sourceHandling: 'Pouze přiložené zdroje', repetitionLevel: 'Střední', colorTone: 'Automatická', imageStyle: 'Ilustrace', forbiddenElements: '', explainTerms: true, useExamples: true, useAnalogies: false, roleLockEnabled: true, preventRoleSwitch: true, allowOverlap: true,
};

export const audioVideoOptions = {
  narration: ['Vysvětlující učitelský styl', 'Popularizační styl', 'Příběhový storytelling', 'Dialogický styl', 'Mentorský / koučovací styl', 'Analytický styl', 'Esejistický styl', 'Kritický / polemický styl', 'Faktografický dokumentární styl', 'Ironický / jemně humorný styl', 'Empatický styl', 'Provokativní styl', 'Shrnovací / revizní styl'],
  art: ['Caravaggio – dramatický kontrast', 'Romantismus / Delacroix / Goya', 'Frida Kahlo – expresivní symbolismus', 'Vincent van Gogh – dynamická expresivita', 'Edward Hopper – civilní realismus', 'Bauhaus – infografická čistota', 'Renesanční ilustrace / da Vinci styl', 'Japonská minimalistická ilustrace'],
  literary: ['Přístupný výklad', 'Příběhový', 'Analytický', 'Esejistický', 'Dialogický'],
  film: ['Dokumentární', 'Dynamický', 'Pozorovací', 'Výukový storyboard', 'Filmový'],
} as const;
