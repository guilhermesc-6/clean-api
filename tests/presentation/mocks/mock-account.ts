import type { AddAccount, LoadAccountByToken } from '@/domain/usecases'
import type { Authentication } from '@/domain/usecases/authentication'
import { faker, simpleFaker } from '@faker-js/faker'

export class AddAccountSpy implements AddAccount {
  params: AddAccount.Params
  result = true

  async add (account: AddAccount.Params): Promise<AddAccount.Result> {
    this.params = account
    return this.result
  }
}

export class AuthenticationSpy implements Authentication {
  params: Authentication.Params
  result = {
    accessToken: faker.string.uuid(),
    name: faker.person.firstName()
  }

  async auth (params: Authentication.Params): Promise<Authentication.Result> {
    this.params = params
    return await Promise.resolve(this.result)
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
