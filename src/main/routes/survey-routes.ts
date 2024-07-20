/* eslint-disable @typescript-eslint/no-misused-promises */
import type { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { adaptMiddleware } from '../adapters/express-middleware-adapter'
import { makeAddSurveyController } from '../factories/controllers/survey/add-survey/add-survey-controller-factory'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'

export default (router: Router): void => {
  const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))
  router.post('/surveys', adminAuth, adaptRoute(makeAddSurveyController()))
}
