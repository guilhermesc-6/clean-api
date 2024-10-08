
import type { Authentication } from '@/domain/usecases'
import type { Controller, Validation, HttpResponse } from '@/presentation/protocols'
import { badRequest, ok, serverError, unauthorized } from '@/presentation/helpers'

export class LoginController implements Controller {
  constructor (
    private readonly authentication: Authentication,
    private readonly validation: Validation) {}

  async handle (request: LoginController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const { email, password } = request

      const authenticationModel = await this.authentication.auth(
        {
          email,
          password
        }
      )
      if (!authenticationModel) {
        return unauthorized()
      }

      return ok(authenticationModel)
    } catch (error) {
      return serverError(error)
    }
  };
}

export namespace LoginController{
  export type Request = {
    email: string
    password: string
  }
}
