import type { AccountModel } from '@/domain/models/account'
import type { AddAccount, AddAccountParams } from '@/domain/usecases/account/add-account'
import type { Authentication, AuthenticationParams } from '@/domain/usecases/account/authentication'
import type { LoadAccountByToken } from '@/domain/usecases/account/load-account-by-token'
import type { AuthenticationModel } from '@/domain/models/authentication'
import { mockAccountModel } from '@/domain/test'
import { faker } from '@faker-js/faker'

export class AddAccountSpy implements AddAccount {
  accountModel = mockAccountModel()
  addAccountParams: AddAccountParams

  async add (account: AddAccountParams): Promise<AccountModel> {
    this.addAccountParams = account
    return await Promise.resolve(this.accountModel)
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
