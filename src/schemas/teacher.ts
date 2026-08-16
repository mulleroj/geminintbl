export type TeacherWorkflowCategory =
  | 'lesson'
  | 'worksheet'
  | 'assessment'
  | 'spu'
  | 'differentiation'
  | 'language'
  | 'vocational'
  | 'visual'
  | 'audio-video';

export type TeacherWorkflowDifficulty = 'quick' | 'standard' | 'advanced';

export interface TeacherWorkflow {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: TeacherWorkflowCategory;
  goal: string;
  whatYouNeed: string[];
  sourcesToUpload: string[];
  promptIds: string[];
  steps: string[];
  checkBeforeUse: string[];
  followUp?: string[];
  generatorRoute?: string;
  difficulty?: TeacherWorkflowDifficulty;
  featured?: boolean;
}
