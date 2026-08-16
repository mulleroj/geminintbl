export interface PresentationState {
  deckFormat: 'Presenter Deck' | 'Detailed Deck';
  deckLength: 'short' | 'default' | 'long';
  outputLanguage: string;
  customLanguage: string;
  topic: string;
  primaryGoal: string;
  targetAudience: string;
  knowledgeLevel: 'beginner' | 'intermediate' | 'advanced';
  numSlides: number;
  exactSlides: boolean;
  oneIdea: boolean;
  bulletsPerSlide: number;
  speakerNotes: boolean;
  noInventedFacts: boolean;
  noScreenshots: boolean;
  illustrationPreset: string;
  atmosphere: string;
  visualConsistency: boolean;
  visualConstraints: string;
  constraintLevel: 'normal' | 'strict';
  themePack: string;
  geminiNaming: boolean;
  additionalTerminology: string;
}

export const defaultPresentationState: PresentationState = {
  deckFormat: 'Presenter Deck', deckLength: 'default', outputLanguage: 'Czech', customLanguage: '',
  topic: '', primaryGoal: '', targetAudience: '', knowledgeLevel: 'intermediate', numSlides: 10,
  exactSlides: true, oneIdea: true, bulletsPerSlide: 4, speakerNotes: true, noInventedFacts: true,
  noScreenshots: false, illustrationPreset: '3d-cut-paper', atmosphere: 'calm', visualConsistency: true,
  visualConstraints: '', constraintLevel: 'normal', themePack: 'education', geminiNaming: true, additionalTerminology: '',
};

export const presentationOptions = {
  illustration: [
    ['3d-cut-paper', '3D Cut Paper'], ['storybook', 'Storybook'], ['flat-vector', 'Flat vector'], ['minimal-line', 'Minimal line'],
    ['watercolor', 'Watercolor'], ['editorial-collage', 'Editorial collage'], ['isometric', 'Isometric'], ['chalkboard', 'Chalkboard'],
    ['technical-diagram', 'Technical diagram'], ['photorealistic', 'Photorealistic'],
  ],
  atmosphere: [['calm', 'Klidná a soustředěná'], ['energetic', 'Energická'], ['serious', 'Věcná'], ['warm', 'Teplá a podporující']],
  theme: [['education', 'Výuka a porozumění'], ['research', 'Výzkum a důkazy'], ['business', 'Rozhodování'], ['workshop', 'Workshop']],
} as const;
