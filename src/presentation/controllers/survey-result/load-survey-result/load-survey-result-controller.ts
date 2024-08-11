import type { Controller, HttpRequest, HttpResponse, LoadSurveyById } from './load-survey-result-controller-protocols'

export class LoadSurveyResultController implements Controller {
  constructor (private readonly loadSurveyBuId: LoadSurveyById) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { surveyId } = httpRequest.params
    await this.loadSurveyBuId.loadbyId(surveyId)
    return null
  }
}
