export const surveyResultPath = {
  put: {
    security: [
      { apiKeyAuth: [] }
    ],
    tags: ['Enquete'],
    summary: 'Api para criar a resposta de uma enquete',
    parameters: [{
      in: 'path',
      name: 'surveyId',
      description: 'ID da enquete a ser respondida',
      required: true,
      schema: {
        type: 'string'
      }
    }],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/saveSurveyParams'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Successo',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/surveyResult'
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
  }
}
