import { badRequest, serverError } from '../helpers/http-helper'
import { MissingParamError, InvalidParamError } from '../errors'
import { type Controller, type EmailValidator, type HttpRequest, type HttpResponse } from '../protocols'
export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

      for (const fields of requiredFields) {
        if (!httpRequest.body[fields]) {
          return badRequest(new MissingParamError(fields))
        }
      }

      const isValid = this.emailValidator.isValid(httpRequest.body.email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
    } catch (error) {
      return serverError()
    }
  }
}
