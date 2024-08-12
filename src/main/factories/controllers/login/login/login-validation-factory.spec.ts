import { EmailValidatorAdapter } from '@/infra/validators/email-validator-adapter'
import { makeLoginValidation } from './login-validation-factory'
import type { Validation } from '@/presentation/protocols/validation'
import { RequiredFieldValidation, EmailValidation, ValidationComposite } from '@/validation/validators'

jest.mock('@/validation/validators/validation-composite')

describe('LoginValidation Factory', () => {
  it('Should call ValidationComposite with all validations', () => {
    makeLoginValidation()
    const validations: Validation[] = []
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
