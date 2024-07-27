import { makeDbAuthentication } from '@/main/factories/usecases/account/authentication/db-authentication-factory'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeLoginValidation } from './login-validation-factory'
import { LoginController } from '@/presentation/controllers/login/login/login-controller'
import type { Controller } from '@/presentation/protocols'

export const makeLogInController = (): Controller => {
  const controller = new LoginController(makeDbAuthentication(), makeLoginValidation())
  return makeLogControllerDecorator(controller)
}
