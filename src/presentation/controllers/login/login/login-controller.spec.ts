import type { HttpRequest } from './login-controller-protocols'
import { LoginController } from './login-controller'
import { mockAuthenticationParams, throwError } from '@/domain/test'
import { AuthenticationSpy, ValidationSpy } from '@/presentation/test'
import { MissingParamError } from '@/presentation/errors'
import { badRequest, ok, serverError, unauthorized } from '@/presentation/helpers/http/http-helper'

type SutTypes = {
  sut: LoginController
  validationSpy: ValidationSpy
  authenticationSpy: AuthenticationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const authenticationSpy = new AuthenticationSpy()
  const sut = new LoginController(authenticationSpy, validationSpy)
  return {
    sut,
    validationSpy,
    authenticationSpy
  }
}

const mockRequest = (): HttpRequest => ({
  body: mockAuthenticationParams()
})

describe('LoginController', () => {
  it('Should call Authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(authenticationSpy.authenticationParams).toEqual(
      {
        email: httpRequest.body.email,
        password: httpRequest.body.password
      }
    )
  })

  it('Should return 401 if invalid credential is provided', async () => {
    const { sut, authenticationSpy } = makeSut()
    authenticationSpy.authenticationModel = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(unauthorized())
  })

  it('Should return 500 if Authentication throws', async () => {
    const { sut, authenticationSpy } = makeSut()
    jest.spyOn(authenticationSpy, 'auth').mockImplementation(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  it('Should return 200 if valid credential is provided', async () => {
    const { sut, authenticationSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(authenticationSpy.authenticationModel))
  })

  it('Should call Validation with correct value', async () => {
    const { sut, validationSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(validationSpy.input).toEqual(httpRequest.body)
  })

  it('Should return 400 if Validation returns an error', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new MissingParamError('any_field')
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })
})
