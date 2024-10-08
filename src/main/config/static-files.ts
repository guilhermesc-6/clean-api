import type { Express } from 'express'
import express from 'express'
import { resolve } from 'node:path'

export default (app: Express): void => {
  app.use('/static', express.static(resolve(__dirname, '../../static')))
}
