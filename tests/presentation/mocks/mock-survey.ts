import type { SurveyModel } from '@/domain/models'
import type { AddSurvey, LoadSurveys, LoadAnswersBySurvey, CheckSurveyById } from '@/domain/usecases'
import { mockSurveyModels } from '@/tests/domain/mocks'
import { faker } from '@faker-js/faker'

export class AddSurveySpy implements AddSurvey {
  params: AddSurvey.Params

  async add (data: AddSurvey.Params): Promise<void> {
    this.params = data
    await Promise.resolve()
  }
}

export class LoadSurveysSpy implements LoadSurveys {
  result = mockSurveyModels()
  accountId: string

  async load (accountId: string): Promise<SurveyModel[]> {
    this.accountId = accountId
    return await Promise.resolve(this.result)
  }
}

export class LoadAnswersBySurveySpy implements LoadAnswersBySurvey {
  result = [faker.word.words(), faker.word.words()]
  id: string

  async loadAnswers (id: string): Promise<LoadAnswersBySurvey.Result> {
    this.id = id
    return await Promise.resolve(this.result)
  }
}

export class CheckSurveyByIdSpy implements CheckSurveyById {
  result = true
  id: string

  async checkById (id: string): Promise<CheckSurveyById.Result> {
    this.id = id
    return await Promise.resolve(this.result)
  }
}
