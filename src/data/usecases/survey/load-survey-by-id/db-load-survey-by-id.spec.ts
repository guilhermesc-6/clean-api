import { DbLoadSurveyById } from './db-load-survey-by-id'
import type { SurveyModel, LoadSurveyByIdRepository } from './db-load-survey-by-id-protocols'
import MockDate from 'mockdate'

const makeFakeSurvey = (): SurveyModel => {
  return {
    id: 'any_id',
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    }],
    date: new Date()
  }
}

const makeLoadSurveyByIdRepository = (): LoadSurveyByIdRepository => {
  class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
    async loadById (id: string): Promise<SurveyModel> {
      return await new Promise(resolve => { resolve(makeFakeSurvey()) })
    }
  }

  return new LoadSurveyByIdRepositoryStub()
}

type SutTypes = {
  sut: DbLoadSurveyById
  loadSurveyByIdRepositoryStub: LoadSurveyByIdRepository
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdRepositoryStub = makeLoadSurveyByIdRepository()
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
    expect(survey).toEqual(makeFakeSurvey())
  })

  it('Should throw if LoadSurveyByIdRepository throws', async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut()
    jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById').mockImplementationOnce((): never => { throw new Error() })
    const promise = sut.loadbyId('any_id')
    await expect(promise).rejects.toThrow()
  })
})