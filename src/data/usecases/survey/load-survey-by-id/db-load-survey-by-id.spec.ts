import { DbLoadSurveyById } from './db-load-survey-by-id'
import type { LoadSurveyByIdRepository } from './db-load-survey-by-id-protocols'
import { mockSurveyModel } from '@/domain/test'
import { mockLoadSurveyByIdRepository } from '@/data/test'
import MockDate from 'mockdate'

type SutTypes = {
  sut: DbLoadSurveyById
  loadSurveyByIdRepositoryStub: LoadSurveyByIdRepository
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdRepositoryStub = mockLoadSurveyByIdRepository()
  const sut = new DbLoadSurveyById(loadSurveyByIdRepositoryStub)
  return {
    sut,
    loadSurveyByIdRepositoryStub
  }
}

describe('DbLoadSurveys', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  it('Should call LoadSurveyByIdRepository with correct id', async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById')
    await sut.loadbyId('any_id')
    expect(loadByIdSpy).toBeCalledWith('any_id')
  })

  it('Should return a Survey on success', async () => {
    const { sut } = makeSut()
    const survey = await sut.loadbyId('any_id')
    expect(survey).toEqual(mockSurveyModel())
  })

  it('Should throw if LoadSurveyByIdRepository throws', async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut()
    jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById').mockImplementationOnce((): never => { throw new Error() })
    const promise = sut.loadbyId('any_id')
    await expect(promise).rejects.toThrow()
  })
})
