import type { ApolloServerPlugin } from 'apollo-server-plugin-base/src/index'
import type { GraphQLError } from 'graphql'

const handleErros = (response: any, errors: readonly GraphQLError[]): void => {
  errors?.forEach(error => {
    response.data = undefined
    if (checkError(error, 'UserInputError')) {
      response.http.status = 400
    } else if (checkError(error, 'AuthenticationError')) {
      response.http.status = 401
    } else if (checkError(error, 'ForbiddenError')) {
      response.http.status = 403
    } else {
      response.http.status = 500
    }
  })
}

const checkError = (error: GraphQLError, errorName: string): boolean => {
  return [error.name, error.originalError?.name].some(name => name === errorName)
}

const statusCodePlugin: ApolloServerPlugin = {
  async requestDidStart (requestContext) {
    return {
      async willSendResponse (requestContext) {
        const errors = (requestContext?.response?.errors || []) as any[]
        handleErros(requestContext.response, errors)
      }
    }
  }
}

export default statusCodePlugin
