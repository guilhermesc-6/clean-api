import app from '@/main/config/app'
import env from '@/main/config/env'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import type { Collection } from 'mongodb'
import { sign } from 'jsonwebtoken'
import request from 'supertest'

let surveyCollection: Collection
let accountCollection: Collection

const makeAccessToken = async (): Promise<string> => {
  const res = await accountCollection.insertOne({
    name: 'John Doe',
    email: 'john@gmail.com',
    password: '123',
    role: 'admin'
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

describe('Servey Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL || '')
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('POST /surveys', () => {
    it('Should return 403 on add survey without accessToken', async () => {
      await request(app)
        .post('/api/surveys')
        .send({
          question: 'Question',
          answers: [
            {
              image: 'http://image-name.com',
              answer: 'Answer 1'
            },
            {
              answer: 'Answer 2'
            }]
        })
        .expect(403)
    })

    it('Should return 204 on add survey with valid accessToken', async () => {
      const accessToken = await makeAccessToken()

      await request(app)
        .post('/api/surveys')
        .set('x-access-token', accessToken)
        .send({
          question: 'Question',
          answers: [
            {
              image: 'http://image-name.com',
              answer: 'Answer 1'
            },
            {
              answer: 'Answer 2'
            }]
        })
        .expect(204)
    })
  })

  describe('GET /surveys', () => {
    it('Should return 403 on laod surveys without accessToken', async () => {
      await request(app)
        .get('/api/surveys')
        .expect(403)
    })

    it('Should return 204 on load surveys with valid accessToken', async () => {
      const accessToken = await makeAccessToken()
      await request(app)
        .get('/api/surveys')
        .set('x-access-token', accessToken)
        .expect(204)
    })
  })
})
