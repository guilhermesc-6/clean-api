import type { LoadSurveyById, Controller, HttpRequest, HttpResponse } from './save-survey-result-controller-protocols'

export class SaveSurveyResultController implements Controller {
  constructor (private readonly loadSurveyById: LoadSurveyById) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.loadSurveyById.loadbyId(httpRequest.params.surveyId)
    return null
  }
}
