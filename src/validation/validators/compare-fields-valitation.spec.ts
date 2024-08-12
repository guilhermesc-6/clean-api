import { CompareFieldsValidation } from './compare-fields-validation'
import { InvalidParamError } from '@/presentation/errors'
import { faker } from '@faker-js/faker'

const field = faker.word.words()
const fieldToCompare = faker.word.words()

const makeSut = (): CompareFieldsValidation => {
  return new CompareFieldsValidation(field, fieldToCompare)
}

describe('CompareFields Validation', () => {
  it('Should return an InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({
      [field]: faker.word.words(),
      [fieldToCompare]: faker.word.words()
    })
    expect(error).toEqual(new InvalidParamError(fieldToCompare))
  })

  it('Should not return if validation succeed', () => {
    const sut = makeSut()
    const value = faker.word.words()
    const error = sut.validate({
      [field]: value,
      [fieldToCompare]: value
    })
    expect(error).toBeFalsy()
  })
})
