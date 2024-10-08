import { EmailValidation } from '@/validation/validators'
import { EmailValidatorSpy } from '@/tests/validation/mocks'
import { InvalidParamError } from '@/presentation/errors'
import { faker } from '@faker-js/faker'

const field = faker.word.words()

type SutTypes = {
  sut: EmailValidation
  emailValidatorSpy: EmailValidatorSpy
}

const makeSut = (): SutTypes => {
  const emailValidatorSpy = new EmailValidatorSpy()
  const sut = new EmailValidation(field, emailValidatorSpy)

  return {
    sut,
    emailValidatorSpy
  }
}

describe('SignUp Controller', () => {
  it('Should return an error if EmailValidator return false', () => {
    const { sut, emailValidatorSpy } = makeSut()
    emailValidatorSpy.result = false
    const email = faker.internet.email()
    const error = sut.validate({ [field]: email })
    expect(error).toEqual(new InvalidParamError(field))
  })

  it('Should call EmailValidator with correct email', () => {
    const { sut, emailValidatorSpy } = makeSut()
    const email = faker.internet.email()
    sut.validate({ [field]: email })
    expect(emailValidatorSpy.email).toBe(email)
  })

  it('Should throw if EmailValidator throws', () => {
    const { sut, emailValidatorSpy } = makeSut()
    jest.spyOn(emailValidatorSpy, 'isValid').mockImplementationOnce(() => { throw new Error() })
    expect(sut.validate).toThrow()
  })
})
