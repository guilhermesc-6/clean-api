export const surveyPath = {
  get: {
    security: [
      { apiKeyAuth: [] }
    ],
    tags: ['Enquete'],
    summary: 'Api para listar todas as enquetes',
    description: 'Essa rota só pode ser  executada por **úsuarios autenticados.**',
    responses: {
      200: {
        description: 'Successo',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/surveys'
            }
          }
        }
      },
      403: {
        $ref: '#/components/forbidden'
      },
      404: {
        $ref: '#/components/notFound'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  },
  post: {
    security: [
      { apiKeyAuth: [] }
    ],
    tags: ['Enquete'],
    summary: 'Api para criar uma enquete',
    description: 'Essa rota só pode ser  executada por **úsuarios autenticados.**',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/addSurveyParams'
          }
        }
      }
    },
    responses: {
      204: {
        description: 'Successo'
      },
      400: {
        $ref: '#/components/badRequest'
      },
      403: {
        $ref: '#/components/forbidden'
      },
      404: {
        $ref: '#/components/notFound'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
