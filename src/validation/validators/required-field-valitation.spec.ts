import { RequiredFieldValidation } from './required-field-validation'
import { MissingParamError } from '@/presentation/errors'

const makeSut = (): RequiredFieldValidation => {
  return new RequiredFieldValidation('field')
}

describe('RequiredField Validation', () => {
  it('Should return a MissingParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ name: 'nay_name' })
    expect(error).toEqual(new MissingParamError('field'))
  })

  it('Should not return if validation succeed', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'nay_name' })
    expect(error).toBeFalsy()
  })
})
