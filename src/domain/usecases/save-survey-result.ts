import type { SurveyResultModel } from '@/domain/models/survey-result'

export interface SaveSurveyResult {
  save: (data: SaveSurveyResult.Params) => Promise<SaveSurveyResult.Result>
}

export namespace SaveSurveyResult{
  export type Params = {
    surveyId: string
    accountId: string
    answer: string
    date: Date
  }
  export type Result = SurveyResultModel
}
