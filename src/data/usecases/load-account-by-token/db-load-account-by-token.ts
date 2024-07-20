import type { LoadAccountByToken } from '../../../domain/usecases/load-account-by-token'
import type { Decrypter } from '../../protocols/cryptography/decrypter'
import type { AccountModel } from '../add-account/db-add-account-protocols'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (private readonly decrypeter: Decrypter) { }

  async load (accessToken: string, role?: string): Promise<AccountModel> {
    await this.decrypeter.decrypt(accessToken)
    return null
  }
}