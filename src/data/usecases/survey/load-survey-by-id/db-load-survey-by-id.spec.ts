import { DbLoadSurveyById } from './db-load-survey-by-id'
import { LoadSurveyByIdRepositorySpy } from '@/data/test'
import MockDate from 'mockdate'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: DbLoadSurveyById
  loadSurveyByIdRepositorySpy: LoadSurveyByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdRepositorySpy = new LoadSurveyByIdRepositorySpy()
  const sut = new DbLoadSurveyById(loadSurveyByIdRepositorySpy)
  return {
    sut,
    loadSurveyByIdRepositorySpy
  }
}

let surveyId: string

describe('DbLoadSurveys', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  beforeEach(() => {
    surveyId = faker.string.uuid()
  })

  it('Should call LoadSurveyByIdRepository with correct id', async () => {
    const { sut, loadSurveyByIdRepositorySpy } = makeSut()
    await sut.loadById(surveyId)
    expect(loadSurveyByIdRepositorySpy.id).toBe(surveyId)
  })

  it('Should return a Survey on success', async () => {
    const { sut, loadSurveyByIdRepositorySpy } = makeSut()
    const survey = await sut.loadById(surveyId)
    expect(survey).toEqual(loadSurveyByIdRepositorySpy.surveyModel)
  })

  it('Should throw if LoadSurveyByIdRepository throws', async () => {
    const { sut, loadSurveyByIdRepositorySpy } = makeSut()
    jest.spyOn(loadSurveyByIdRepositorySpy, 'loadById').mockImplementationOnce((): never => { throw new Error() })
    const promise = sut.loadById(surveyId)
    await expect(promise).rejects.toThrow()
  })
})
