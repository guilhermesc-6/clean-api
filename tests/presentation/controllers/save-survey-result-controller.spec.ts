import { LoadAnswersBySurveySpy, SaveSurveyResultSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/domain/mocks'
import { SaveSurveyResultController } from '@/presentation/controllers'
import { forbidden, ok, serverError } from '@/presentation/helpers'
import { InvalidParamError } from '@/presentation/errors'
import MockDate from 'mockdate'
import { simpleFaker } from '@faker-js/faker'

const mockRequest = (answer: string = null): SaveSurveyResultController.Request => ({
  surveyId: simpleFaker.string.uuid(),
  answer,
  accountId: simpleFaker.string.uuid()
})

type SutTypes = {
  sut: SaveSurveyResultController
  loadAnswersBySurveySpy: LoadAnswersBySurveySpy
  saveSurveyResultSpy: SaveSurveyResultSpy
}

const makeSut = (): SutTypes => {
  const loadAnswersBySurveySpy = new LoadAnswersBySurveySpy()
  const saveSurveyResultSpy = new SaveSurveyResultSpy()
  const sut = new SaveSurveyResultController(loadAnswersBySurveySpy, saveSurveyResultSpy)
  return {
    sut,
    loadAnswersBySurveySpy,
    saveSurveyResultSpy
  }
}

describe('SaveSurveyResult Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  it('Should calls LoadAnswersBySurvey with correct values', async () => {
    const { sut, loadAnswersBySurveySpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadAnswersBySurveySpy.id).toBe(request.surveyId)
  })

  it('Should return 403 if LoadAnswersBySurvey returns null', async () => {
    const { sut, loadAnswersBySurveySpy } = makeSut()
    loadAnswersBySurveySpy.result = []
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('surveyId')))
  })

  it('Should return 500 if LoadAnswersBySurvey throws', async () => {
    const { sut, loadAnswersBySurveySpy } = makeSut()
    jest.spyOn(loadAnswersBySurveySpy, 'loadAnswers').mockImplementation(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  it('Should return 403 if an invalid answer is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('answer')))
  })

  it('Should calls SaveSurveyResult with correct values', async () => {
    const { sut, saveSurveyResultSpy, loadAnswersBySurveySpy } = makeSut()
    const request = mockRequest(loadAnswersBySurveySpy.result[0])
    await sut.handle(request)
    expect(saveSurveyResultSpy.saveSurveyResultParams).toEqual({
      surveyId: request.surveyId,
      accountId: request.accountId,
      answer: request.answer,
      date: new Date()
    })
  })

  it('Should return 500 if SaveSurveyResult throws', async () => {
    const { sut, saveSurveyResultSpy, loadAnswersBySurveySpy } = makeSut()
    jest.spyOn(saveSurveyResultSpy, 'save').mockImplementation(throwError)
    const request = mockRequest(loadAnswersBySurveySpy.result[0])
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  it('Should return 200 on success', async () => {
    const { sut, saveSurveyResultSpy, loadAnswersBySurveySpy } = makeSut()
    const request = mockRequest(loadAnswersBySurveySpy.result[0])
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(ok(saveSurveyResultSpy.surveyResultModel))
  })
})
