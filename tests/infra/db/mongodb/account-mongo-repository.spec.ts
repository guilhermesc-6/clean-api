
import { MongoHelper, AccountMongoRepository } from '@/infra/db'
import { mockAddAccountParams } from '@/tests/domain/mocks'
import { faker } from '@faker-js/faker'
import type { Collection } from 'mongodb'

let accountCollection: Collection

describe('Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  const makeSut = (): AccountMongoRepository => {
    return new AccountMongoRepository()
  }

  describe('add()', () => {
    it('Should return an account on success', async () => {
      const sut = makeSut()
      const addAccountParams = mockAddAccountParams()
      const account = await sut.add(addAccountParams)

      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe(addAccountParams.name)
      expect(account.email).toBe(addAccountParams.email)
      expect(account.password).toBe(addAccountParams.password)
    })
  })

  describe('loadByEmail()', () => {
    it('Should return an account on success', async () => {
      const sut = makeSut()
      const addAccountParams = mockAddAccountParams()
      await accountCollection.insertOne(addAccountParams)

      const account = await sut.loadByEmail(addAccountParams.email)

      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe(addAccountParams.name)
      expect(account.email).toBe(addAccountParams.email)
      expect(account.password).toBe(addAccountParams.password)
    })

    it('Should return null if loadByEmail fails', async () => {
      const sut = makeSut()
      const account = await sut.loadByEmail(faker.internet.email())

      expect(account).toBeFalsy()
    })
  })

  describe('updateAccessToken()', () => {
    it('Should update the account accessToken on success', async () => {
      const sut = makeSut()

      const res = await accountCollection.insertOne(mockAddAccountParams())
      const rawAccount = await accountCollection.findOne({ _id: res.insertedId })
      expect(rawAccount?.accessToken).toBeFalsy()

      const fakeAccount = res
      const accessToken = faker.string.uuid()
      await sut.updateAccessToken(fakeAccount.insertedId.toHexString(), accessToken)

      const account = await accountCollection.findOne({ _id: fakeAccount.insertedId })

      expect(account).toBeTruthy()
      expect(account?.accessToken).toBe(accessToken)
    })
  })

  describe('loadByToken()', () => {
    let name = faker.person.firstName()
    let email = faker.internet.email()
    let password = faker.internet.password()
    let accessToken = faker.string.uuid()

    beforeEach(() => {
      name = faker.person.firstName()
      email = faker.internet.email()
      password = faker.internet.password()
      accessToken = faker.string.uuid()
    })

    it('Should return an account on loadByToken without role', async () => {
      const sut = makeSut()

      await accountCollection.insertOne({
        name,
        email,
        password,
        accessToken
      })

      const account = await sut.loadByToken(accessToken)

      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
    })

    it('Should return an account on loadByToken with admin role', async () => {
      const sut = makeSut()

      await accountCollection.insertOne({
        name,
        email,
        password,
        accessToken,
        role: 'admin'
      })

      const account = await sut.loadByToken(accessToken, 'admin')

      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
    })

    it('Should return an account on loadByToken with invalid role', async () => {
      const sut = makeSut()

      await accountCollection.insertOne({
        name,
        email,
        password,
        accessToken
      })

      const account = await sut.loadByToken(accessToken, 'admin')

      expect(account).toBeFalsy()
    })

    it('Should return an account on loadByToken if user is admin', async () => {
      const sut = makeSut()

      await accountCollection.insertOne({
        name,
        email,
        password,
        accessToken,
        role: 'admin'
      })

      const account = await sut.loadByToken(accessToken)

      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
    })

    it('Should return null if loadByToken fails', async () => {
      const sut = makeSut()
      const account = await sut.loadByToken(accessToken)

      expect(account).toBeFalsy()
    })
  })
})
