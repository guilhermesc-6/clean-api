import { mockAccountModel } from '@/tests/domain/mocks'
import type { AccountModel, AuthenticationModel } from '@/domain/models'
import type { AddAccount, LoadAccountByToken } from '@/domain/usecases'
import type { Authentication, AuthenticationParams } from '@/domain/usecases/authentication'
import { faker } from '@faker-js/faker'

export class AddAccountSpy implements AddAccount {
  addAccountParams: AddAccount.Params
  isValid = true

  async add (account: AddAccount.Params): Promise<AddAccount.Result> {
    this.addAccountParams = account
    return this.isValid
  }
}

export class AuthenticationSpy implements Authentication {
  authenticationParams: AuthenticationParams
  authenticationModel = {
    accessToken: faker.string.uuid(),
    name: faker.person.firstName()
  }

  async auth (authenticationParams: AuthenticationParams): Promise<AuthenticationModel> {
    this.authenticationParams = authenticationParams
    return await Promise.resolve(this.authenticationModel)
  }
}

export class LoadAccountByTokenSpy implements LoadAccountByToken {
  accountModel = mockAccountModel()
  accessToken: string
  role: string

  async load (accessToken: string, role?: string): Promise<AccountModel> {
    this.accessToken = accessToken
    this.role = role
    return await Promise.resolve(this.accountModel)
  }
}