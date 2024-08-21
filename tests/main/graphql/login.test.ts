
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

    it('Should return UnauthorizedError on invalid credentials', async () => {
      const res = await request(app)
        .post('/graphql')
        .send({ query })
      expect(res.status).toBe(401)
      expect(res.body.data).toBeFalsy()
      expect(res.body.errors[0].message).toBe('Unauthorized')
    })
  })

  describe('SignUp Mutation', () => {
    const query = `mutation {
      signUp (name: "John Doe", email: "john@gmail.com", password: "123", passwordConfirmation: "123") {
        accessToken
        name
      }
    }`

    it('Should return an Account on valid data', async () => {
      const res = await request(app)
        .post('/graphql')
        .send({ query })
      expect(res.status).toBe(200)
      expect(res.body.data.signUp.accessToken).toBeTruthy()
      expect(res.body.data.signUp.name).toBe('John Doe')
    })

    it('Should return EmailInUseError on invalid data', async () => {
      const password = await hash('abc', 12)
      await accountCollection.insertOne({
        name: 'John Doe',
        email: 'john@gmail.com',
        password
      })

      const res = await request(app)
        .post('/graphql')
        .send({ query })
      expect(res.status).toBe(403)
      expect(res.body.data).toBeFalsy()
      expect(res.body.errors[0].message).toBe('The received email is already on use')
    })
  })
})
