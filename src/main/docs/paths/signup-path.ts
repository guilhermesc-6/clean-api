export const signUpPath = {
  post: {
    tags: ['Login'],
    summary: 'Api para criar conta de um usuário',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/signUpParams'
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
              $ref: '#/schemas/account'
            }
          }
        }
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
