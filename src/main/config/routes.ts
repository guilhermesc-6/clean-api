import { Router, type Express } from 'express'
import { readdirSync } from 'node:fs'
import path from 'node:path'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  readdirSync(path.resolve(__dirname, '..', 'routes')).map(async file => {
    if (!file.includes('.test.')) {
      if (!file.includes('.js.map')) {
        (await import(`../routes/${file}`)).default(router)
      }
    }
  })
}
