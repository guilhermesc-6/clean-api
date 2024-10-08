import { makeAddSurveyValidation } from './add-survey-validation-factory'
import { makeLogControllerDecorator, makeDbAddSurvey } from '@/main/factories'
import { AddSurveyController } from '@/presentation/controllers'
import type { Controller } from '@/presentation/protocols'

export const makeAddSurveyController = (): Controller => {
  const controller = new AddSurveyController(makeAddSurveyValidation(), makeDbAddSurvey())
  return makeLogControllerDecorator(controller)
}
