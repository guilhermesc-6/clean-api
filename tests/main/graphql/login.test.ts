
import { MongoHelper } from '@/infra/db'
import { setupApp } from '@/main/config/app'
import type { Collection } from 'mongodb'
import { hash } from 'bcrypt'
import request from 'supertest'
import type { Express } from 'express'

let accountCollection: Collection
let app: Express

describe('Login Graphql', () => {
  beforeAll(async () => {
    app = await setupApp()
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('Login Query', () => {
    const query = `query {
      login (email: "john.doe@gmail.com", password: "abc") {
        accessToken
        name
      }
    }`

    it('Should return an Account on valid credentials', async () => {
      const password = await hash('abc', 12)
      await accountCollection.insertOne({
        name: 'John Doe',
        email: 'john.doe@gmail.com',
        password
      })

      const res = await request(app)
        .post('/graphql')
        .send({ query })
      expect(res.status).toBe(200)
      expect(res.body.data.login.accessToken).toBeTruthy()
      expect(res.body.data.login.name).toBe('John Doe')
    })
  })
})