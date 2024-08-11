import { forbidden, serverError } from '@/presentation/helpers/http/http-helper'
import type { Controller, HttpRequest, HttpResponse, LoadSurveyById } from './load-survey-result-controller-protocols'
import { InvalidParamError } from '@/presentation/errors'

export class LoadSurveyResultController implements Controller {
  constructor (private readonly loadSurveyBuId: LoadSurveyById) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params
      const survey = await this.loadSurveyBuId.loadbyId(surveyId)

      if (!survey) {
        return forbidden(new InvalidParamError('survey id'))
      }

      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
