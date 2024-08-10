import type { SurveyResultModel } from '@/domain/models/survey-result'

export interface LoadSurveyResult {
  laod: (surveyId: string) => Promise<SurveyResultModel>
}
