import { type AddAccountRepository, type AccountModel, type AddAccount, type AddAccountModel, type Encrypter } from './db-add-account-protocols'
export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter
  private readonly addAccountrepository: AddAccountRepository

  constructor (encrypter: Encrypter, addAccountrepository: AddAccountRepository) {
    this.encrypter = encrypter
    this.addAccountrepository = addAccountrepository
  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password)
    const account = await this.addAccountrepository.add(Object.assign({}, accountData, { password: hashedPassword }))
    return account
  };
}
