import { LoadSurveyResultController } from './load-survey-result-controller'
import type { HttpRequest, LoadSurveyById } from './load-survey-result-controller-protocols'
import { forbidden } from '@/presentation/helpers/http/http-helper'
import { mockLoadSurveyById } from '@/presentation/test'
import { InvalidParamError } from '@/presentation/errors'

const makeFakeRequest = (): HttpRequest => ({
  params: {
    surveyId: 'any_id'
  }
})

type SutType = {
  sut: LoadSurveyResultController
  loadSurveyByIdStub: LoadSurveyById
}

const makeSut = (): SutType => {
  const loadSurveyByIdStub = mockLoadSurveyById()
  const sut = new LoadSurveyResultController(loadSurveyByIdStub)
  return {
    sut, loadSurveyByIdStub
  }
}
describe('LoadSurveyResult Controller', () => {
  it('Should call LoadSurveyById with correct value', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadbyId')
    await sut.handle(makeFakeRequest())
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id')
  })

  it('Should return 403 if LoadSurveyById returns null', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    jest.spyOn(loadSurveyByIdStub, 'loadbyId').mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('survey id')))
  })
})
