import type { PresentationState } from './config';

export const presentationPresets: Record<string, { name: string; data: Partial<PresentationState> }> = {
  usecases: { name: '10 případů použití – 3D Cut Paper', data: { deckLength: 'default', numSlides: 10, illustrationPreset: '3d-cut-paper', themePack: 'education' } },
  lesson: { name: 'Výuková prezentace – studenti – začátečníci', data: { deckFormat: 'Presenter Deck', deckLength: 'long', knowledgeLevel: 'beginner', illustrationPreset: 'storybook', themePack: 'education' } },
  workshop: { name: 'Workshop – učitelé – středně pokročilí', data: { deckFormat: 'Detailed Deck', deckLength: 'default', knowledgeLevel: 'intermediate', illustrationPreset: 'flat-vector', themePack: 'workshop' } },
};

export const presentationStorageKey = 'notebook-hub-cz-presentation-presets-v1';
