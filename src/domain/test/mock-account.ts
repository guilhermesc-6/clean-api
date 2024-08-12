import type { AccountModel } from '@/domain/models/account'
import type { AddAccountParams } from '@/domain/usecases/account/add-account'
import type { AuthenticationParams } from '@/domain/usecases/account/authentication'
import { faker } from '@faker-js/faker'

export const mockAddAccountParams = (): AddAccountParams => ({
  name: faker.person.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAccountModel = (): AccountModel => ({
  id: faker.string.uuid(),
  name: faker.person.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAuthenticationParams = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})
