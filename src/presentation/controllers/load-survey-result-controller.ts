import type { LoadSurveyById, LoadSurveyResult } from '@/domain/usecases'
import { forbidden, ok, serverError } from '@/presentation/helpers'
import { InvalidParamError } from '@/presentation/errors'
import type { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class LoadSurveyResultController implements Controller {
  constructor (
    private readonly loadSurveyById: LoadSurveyById
    , private readonly loadSurveyResult: LoadSurveyResult
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params
      const survey = await this.loadSurveyById.loadById(surveyId)

      if (!survey) {
        return forbidden(new InvalidParamError('survey id'))
      }

      const surveyResult = await this.loadSurveyResult.load(surveyId, httpRequest.accountId)

      return ok(surveyResult)
    } catch (error) {
      return serverError(error)
    }
  }
}
