import type { AddAccount, LoadAccountByToken } from '@/domain/usecases'
import type { Authentication } from '@/domain/usecases/authentication'
import { faker, simpleFaker } from '@faker-js/faker'

export class AddAccountSpy implements AddAccount {
  addAccountParams: AddAccount.Params
  result = true

  async add (account: AddAccount.Params): Promise<AddAccount.Result> {
    this.addAccountParams = account
    return this.result
  }
}

export class AuthenticationSpy implements Authentication {
  authenticationParams: Authentication.Params
  authenticationModel = {
    accessToken: faker.string.uuid(),
    name: faker.person.firstName()
  }

  async auth (authenticationParams: Authentication.Params): Promise<Authentication.Result> {
    this.authenticationParams = authenticationParams
    return await Promise.resolve(this.authenticationModel)
  }
}

export class LoadAccountByTokenSpy implements LoadAccountByToken {
  result = { id: simpleFaker.string.uuid() }
  accessToken: string
  role: string

  async load (accessToken: string, role?: string): Promise<LoadAccountByToken.Result> {
    this.accessToken = accessToken
    this.role = role
    return await Promise.resolve(this.result)
  }
}
