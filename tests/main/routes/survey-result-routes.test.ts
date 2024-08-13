import { MongoHelper } from '@/infra/db'
import app from '@/main/config/app'
import env from '@/main/config/env'
import request from 'supertest'
import { sign } from 'jsonwebtoken'
import type { Collection } from 'mongodb'

let surveyCollection: Collection
let accountCollection: Collection

const makeAccessToken = async (): Promise<string> => {
  const res = await accountCollection.insertOne({
    name: 'John Doe',
    email: 'john@gmail.com',
    password: '123'
  })
  const id = res.insertedId.toHexString()
  const accessToken = sign({ id }, env.jwtSecret)
  await accountCollection.updateOne({ _id: res.insertedId }, {
    $set: {
      accessToken
    }
  })
  return accessToken
}

describe('Survey Results Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL || '')
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('PUT /surveys/:surveyId/results', () => {
    it('Should return 403 on save survey results without accessToken', async () => {
      await request(app)
        .put('/api/surveys/any_id/results')
        .send({
          answers: 'any_answer'
        })
        .expect(403)
    })

    it('Should return 200 on save survey results with accessToken', async () => {
      const accessToken = await makeAccessToken()
      const res = await surveyCollection.insertOne({
        question: 'Question',
        answers: [
          {
            image: 'http://image-name.com',
            answer: 'Answer 1'
          },
          {
            answer: 'Answer 2'
          }],
        date: new Date()
      })

      await request(app)
        .put(`/api/surveys/${res.insertedId.toHexString()}/results`)
        .set('x-access-token', accessToken)
        .send({
          answer: 'Answer 2'
        })
        .expect(200)
    })
  })

  describe('GET /surveys/:surveyId/results', () => {
    it('Should return 403 on load survey results without accessToken', async () => {
      await request(app)
        .get('/api/surveys/any_id/results')
        .expect(403)
    })

    it('Should return 200 on load survey results with accessToken', async () => {
      const accessToken = await makeAccessToken()
      const res = await surveyCollection.insertOne({
        question: 'Question',
        answers: [
          {
            image: 'http://image-name.com',
            answer: 'Answer 1'
          },
          {
            answer: 'Answer 2'
          }],
        date: new Date()
      })

      await request(app)
        .get(`/api/surveys/${res.insertedId.toHexString()}/results`)
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })
})
