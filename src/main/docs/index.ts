import { loginPath, surveyPath } from './paths'
import { badRequest, forbidden, notFound, serverError, unauthorized } from './components'
import { accountSchema, apiKeyAuthSchema, errorSchema, loginParamsSchema, surveyAnswerSchema, surveySchema, surveysSchema } from './schemas'

export default {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'Clean Node API',
    description: 'API do curso do Mango para realizar enquetes entre programadores'
  },
  license: {
    name: 'GPL-3.0-or-later',
    url: 'https://spdx.org/licenses/GPL-3.0-or-later.html'
  },
  servers: [
    {
      url: '/api'
    }
  ],
  tags: [
    { name: 'Login' },
    { name: 'Enquete' }
  ],
  paths: {
    '/login': loginPath,
    '/surveys': surveyPath
  },
  schemas: {
    account: accountSchema,
    survey: surveySchema,
    loginParams: loginParamsSchema,
    error: errorSchema,
    surveys: surveysSchema,
    surveyAnswer: surveyAnswerSchema
  },
  components: {
    securitySchemes:
    { apiKeyAuth: apiKeyAuthSchema },
    badRequest,
    serverError,
    unauthorized,
    notFound,
    forbidden
  }
}
