import { makeLoginValidation } from './login-validation-factory'
import { makeDbAuthentication, makeLogControllerDecorator } from '@/main/factories'
import { LoginController } from '@/presentation/controllers'
import type { Controller } from '@/presentation/protocols'

export const makeLogInController = (): Controller => {
  const controller = new LoginController(makeDbAuthentication(), makeLoginValidation())
  return makeLogControllerDecorator(controller)
}
