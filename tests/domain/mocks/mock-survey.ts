import type { SurveyModel } from '@/domain/models'
import type { AddSurvey } from '../usecases'
import { faker } from '@faker-js/faker'

export const mockSurveyModel = (): SurveyModel => {
  return {
    id: faker.string.uuid(),
    question: faker.word.words(),
    answers: [
      {
        answer: faker.word.words()

      },
      {
        answer: faker.word.words(),
        image: faker.image.url()

      }],
    date: faker.date.recent()
  }
}

export const mockSurveyModels = (): SurveyModel[] => [
  mockSurveyModel(), mockSurveyModel()
]

export const mockAddSurveyParams = (): AddSurvey.Params => ({
  question: faker.word.words(),
  answers: [{
    image: faker.image.url(),
    answer: faker.word.words()
  }, {
    answer: faker.word.words()
  }],
  date: faker.date.recent()
})
