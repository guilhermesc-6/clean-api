import { MongoHelper as sut } from '@/infra/db'

describe('Mongo Helper', () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL)
  })
  afterAll(async () => {
    await sut.disconnect()
  })

  it('Should reconnect if mongodb is down', async () => {
    let accountCollection = await sut.getCollection('accounts')
    expect(accountCollection).toBeTruthy()
    await sut.disconnect()
    accountCollection = await sut.getCollection('accounts')
    expect(accountCollection).toBeTruthy()
  })

  it('Should reconnect if mongodb is down on getCollection', async () => {
    await sut.disconnect()
    const accountCollection = await sut.getCollection('accounts')
    expect(accountCollection).toBeTruthy()
  })
})
