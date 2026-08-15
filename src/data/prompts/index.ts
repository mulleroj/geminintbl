import { audioOverviewPrompts } from './audio-overviews';
import { deepAnalysisPrompts } from './deep-analysis';
import { setupAccuracyPrompts } from './setup-accuracy';
import { slidesVideoInfographicsPrompts } from './slides-video-infographics';
import { strategyDecisionPrompts } from './strategy-decisions';
import { studyExamPrepPrompts } from './study-exam-prep';
import { workflowPrompts } from './workflows';
import { writingContentPrompts } from './writing-content';
import { teachingPrompts } from './teaching';

export const prompts = [
  ...deepAnalysisPrompts,
  ...setupAccuracyPrompts,
  ...studyExamPrepPrompts,
  ...audioOverviewPrompts,
  ...slidesVideoInfographicsPrompts,
  ...writingContentPrompts,
  ...strategyDecisionPrompts,
  ...workflowPrompts,
  ...teachingPrompts,
];
