import type { SurveyResultModel } from '@/domain/models'
import type { SaveSurveyResultParams } from '@/domain/usecases'
import { faker } from '@faker-js/faker'

export const mockSaveSurveyResultParams = (): SaveSurveyResultParams => ({
  accountId: faker.string.uuid(),
  surveyId: faker.string.uuid(),
  answer: faker.word.words(),
  date: faker.date.recent()
})

export const mockSurveyResultModel = (): SurveyResultModel => ({
  surveyId: faker.string.uuid(),
  question: faker.word.words(3),
  answers: [
    {
      answer: faker.word.words(),
      count: faker.number.int({ min: 0, max: 1000 }),
      percent: faker.number.int({ min: 0, max: 100 }),
      isCurrentAccountAnswer: faker.datatype.boolean()
    },
    {
      answer: faker.word.words(),
      image: faker.image.url(),
      count: faker.number.int({ min: 0, max: 1000 }),
      percent: faker.number.int({ min: 0, max: 100 }),
      isCurrentAccountAnswer: faker.datatype.boolean()
    }
  ],
  date: faker.date.recent()
})
