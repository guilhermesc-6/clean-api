import type { SurveyResultModel } from '@/domain/models/survey-result'
import type { SaveSurveyResult, SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result'
import type { LoadSurveyResult } from '@/domain/usecases/survey-result/load-survey-result'
import { mockSurveyResultModel } from '@/domain/test'

export class SaveSurveyResultSpy implements SaveSurveyResult {
  surveyResultModel = mockSurveyResultModel()
  saveSurveyResultParams: SaveSurveyResultParams

  async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    this.saveSurveyResultParams = data
    return await Promise.resolve(this.surveyResultModel)
  }
}

export class LoadSurveyResultSpy implements LoadSurveyResult {
  surveyResultModel = mockSurveyResultModel()
  surveyId: string

  async load (surveyId: string): Promise<SurveyResultModel> {
    this.surveyId = surveyId
    return await Promise.resolve(this.surveyResultModel)
  }
}
