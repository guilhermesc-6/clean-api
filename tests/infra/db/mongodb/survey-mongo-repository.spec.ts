import { SurveyMongoRepository, MongoHelper } from '@/infra/db'
import { mockAddAccountParams, mockAddSurveyParams } from '@/tests/domain/mocks'
import { ObjectId, type Collection } from 'mongodb'
import FakeObjectId from 'bson-objectid'

let surveyCollection: Collection
let accountCollection: Collection
let surveyResultCollection: Collection

const makeAccountId = async (): Promise<string> => {
  const res = await accountCollection.insertOne(mockAddAccountParams())
  return res.insertedId.toHexString()
}

const makeSut = (): SurveyMongoRepository => {
  return new SurveyMongoRepository()
}

describe('Survey Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL || '')
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    surveyResultCollection = await MongoHelper.getCollection('surveyResults')
    await surveyResultCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('add()', () => {
    it('Should add a survey on add success', async () => {
      const sut = makeSut()
      await sut.add(mockAddSurveyParams())
      const count = await surveyCollection.countDocuments()
      expect(count).toBe(1)
    })
  })

  describe('loadAll()', () => {
    it('Should load all surveys on  success', async () => {
      const accountId = await makeAccountId()
      const addSurveyModels = [mockAddSurveyParams(), mockAddSurveyParams()]
      const result = await surveyCollection.insertMany(addSurveyModels)
      const surveyId = result.insertedIds[0]
      await surveyResultCollection.insertOne({
        surveyId,
        accountId: new ObjectId(accountId),
        answer: addSurveyModels[0].answers[1].answer,
        date: new Date()
      })
      const sut = makeSut()
      const surveys = await sut.loadAll(accountId)

      expect(surveys.length).toBe(2)
      expect(surveys[0].id).toBeTruthy()
      expect(surveys[0].question).toBe(addSurveyModels[0].question)
      expect(surveys[0].didAnswer).toBe(true)
      expect(surveys[1].question).toBe(addSurveyModels[1].question)
      expect(surveys[1].didAnswer).toBe(false)
    })

    it('Should load empty list', async () => {
      const accountId = await makeAccountId()
      const sut = makeSut()
      const surveys = await sut.loadAll(accountId)
      expect(surveys.length).toBe(0)
    })
  })

  describe('loadById()', () => {
    it('Should load survey by id on success', async () => {
      const res = await surveyCollection.insertOne(mockAddSurveyParams())
      const sut = makeSut()
      const surveys = await sut.loadById(res.insertedId.toHexString())
      expect(surveys).toBeTruthy()
      expect(surveys.id).toBeTruthy()
    })

    it('Should return null if survey does not exists', async () => {
      const sut = makeSut()
      const surveys = await sut.loadById(FakeObjectId.createFromTime(1).toHexString())
      expect(surveys).toBeFalsy()
    })
  })

  describe('loadAnswers()', () => {
    it('Should load answers by id on  success', async () => {
      const res = await surveyCollection.insertOne(mockAddSurveyParams())
      const survey = await surveyCollection.findOne({ _id: res.insertedId })
      const sut = makeSut()
      const answers = await sut.loadAnswers(res.insertedId.toHexString())
      expect(answers).toEqual([survey.answers[0].answer, survey.answers[1].answer])
    })

    it('Should return empty array if survey not found', async () => {
      const sut = makeSut()
      const answers = await sut.loadAnswers(FakeObjectId.createFromTime(1).toHexString())
      expect(answers).toEqual([])
    })
  })

  describe('checkById()', () => {
    it('Should return true if survey exists', async () => {
      const res = await surveyCollection.insertOne(mockAddSurveyParams())
      const sut = makeSut()
      const exists = await sut.checkById(res.insertedId.toHexString())
      expect(exists).toBe(true)
    })

    it('Should return false if survey exists', async () => {
      const sut = makeSut()
      const exists = await sut.checkById(FakeObjectId.createFromTime(1).toHexString())
      expect(exists).toBe(false)
    })
  })
})
