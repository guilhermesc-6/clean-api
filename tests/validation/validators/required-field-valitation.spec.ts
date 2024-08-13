import { RequiredFieldValidation } from '@/validation/validators'
import { MissingParamError } from '@/presentation/errors'
import { faker } from '@faker-js/faker'

const field = faker.word.words()

const makeSut = (): RequiredFieldValidation => {
  return new RequiredFieldValidation(field)
}

describe('RequiredField Validation', () => {
  it('Should return a MissingParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ invalidField: faker.word.words() })
    expect(error).toEqual(new MissingParamError(field))
  })

  it('Should not return if validation succeed', () => {
    const sut = makeSut()
    const error = sut.validate({ [field]: faker.word.words() })
    expect(error).toBeFalsy()
  })
})
