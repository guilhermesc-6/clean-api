import paths from './paths'
import components from './components'
import schemas from './schemas'

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
    {
      name: 'Login',
      description: 'APIs relacionadas a Login'
    },
    {
      name: 'Enquete',
      description: 'APIs relacionadas a Enquete'
    }
  ],
  paths,
  schemas,
  components
}
