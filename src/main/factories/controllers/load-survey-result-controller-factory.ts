import { makeLogControllerDecorator, makeDbLoadSurveyResult, makeDbLoadSurveyById } from '@/main/factories'
import { LoadSurveyResultController } from '@/presentation/controllers'
import type { Controller } from '@/presentation/protocols'

export const makeLoadSurveyResultController = (): Controller => {
  const controller = new LoadSurveyResultController(makeDbLoadSurveyById(), makeDbLoadSurveyResult())
  return makeLogControllerDecorator(controller)
}