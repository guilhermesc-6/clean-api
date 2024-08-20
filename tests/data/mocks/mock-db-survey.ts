import type { AddSurveyRepository, CheckSurveyByIdRepository, LoadAnswersBySurveyRepository, LoadSurveyByIdRepository, LoadSurveysRepository } from '@/data/protocols'
import type { SurveyModel } from '@/domain/models'
import { mockSurveyModel, mockSurveyModels } from '@/tests/domain/mocks'
import { faker } from '@faker-js/faker'

export class AddSurveyRepositorySpy implements AddSurveyRepository {
  addSurveyParams: AddSurveyRepository.Params

  async add (data: AddSurveyRepository.Params): Promise<void> {
    this.addSurveyParams = data
    await Promise.resolve()
  }
}

export class LoadSurveyByIdRepositorySpy implements LoadSurveyByIdRepository {
  result = mockSurveyModel()
  id: string

  async loadById (id: string): Promise<LoadSurveyByIdRepository.Result> {
    this.id = id
    return await Promise.resolve(this.result)
  }
}

export class LoadAnswersBySurveyRepositorySpy implements LoadAnswersBySurveyRepository {
  result = [faker.word.words(), faker.word.words()]
  id: string

  async loadAnswers (id: string): Promise<LoadAnswersBySurveyRepository.Result> {
    this.id = id
    return await Promise.resolve(this.result)
  }
}

export class CheckSurveyByIdRepositorySpy implements CheckSurveyByIdRepository {
  result = true
  id: string

  async checkById (id: string): Promise<CheckSurveyByIdRepository.Result> {
    this.id = id
    return await Promise.resolve(this.result)
  }
}

export class LoadSurveysRepositorySpy implements LoadSurveysRepository {
  result = mockSurveyModels()
  accountId: string

  async loadAll (accountId: string): Promise<SurveyModel[]> {
    this.accountId = accountId
    return await Promise.resolve(this.result)
  }
}
