import type { AccountModel } from '@/domain/models/account'
import type { AddAccount, AddAccountParams } from '@/domain/usecases/account/add-account'
import { type Authentication, type AuthenticationParams } from '@/domain/usecases/account/authentication'
import type { LoadAccountByToken } from '@/domain/usecases/account/load-account-by-token'
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
  token = faker.string.uuid()

  async auth (authenticationParams: AuthenticationParams): Promise<string> {
    this.authenticationParams = authenticationParams
    return await Promise.resolve(this.token)
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
