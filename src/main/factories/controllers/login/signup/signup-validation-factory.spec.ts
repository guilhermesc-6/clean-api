import { EmailValidatorAdapter } from '@/infra/validators/email-validator-adapter'
import { makeSignUpValidation } from './signup-validation-factory'
import type { Validation } from '@/presentation/protocols/validation'
import { RequiredFieldValidation, CompareFieldsValidation, EmailValidation, ValidationComposite } from '@/validation/validators'

jest.mock('@/validation/validators/validation-composite')

describe('SignUpValidation Factory', () => {
  it('Should call ValidationComposite with all validations', () => {
    makeSignUpValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
