import env from '@/main/config/env'
import type { LoadAccountByToken } from '@/domain/usecases/account/load-account-by-token'
import { DbLoadAccountByToken } from '@/data/usecases/account/load-account-by-token/db-load-account-by-token'
import { JwtAdapter } from '@/infra/cryptography/jwt-adapter/jtw-adapter'
import { AccountMongoRepository } from '@/infra/db/mongodb/account/account-mongo-repository'

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbLoadAccountByToken(jwtAdapter, accountMongoRepository)
}
