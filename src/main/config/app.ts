import setupApolloServer from './apollo-server'
import setupMiddlewares from './middlewares'
import setupStaticFiles from './static-files'
import setupRoutes from './routes'
import setupSwagger from './swagger'
import express, { type Express } from 'express'

export const setupApp = async (): Promise<Express> => {
  const app = express()
  setupApolloServer(app)
  setupStaticFiles(app)
  setupSwagger(app)
  setupMiddlewares(app)
  setupRoutes(app)
  return app
}
