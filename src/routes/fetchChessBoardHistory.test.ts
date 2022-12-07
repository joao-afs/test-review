import { FastifyInstance } from 'fastify'
import { createServer } from '../../createServer'

describe('GET /board/:boardId/history', () => {
  let server: FastifyInstance

  beforeAll(async () => {
    server = await createServer({ logger: { level: 'error' } })
  })

  it('returns a 502 NotImplemented error', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/board/1234/history',
    })
    expect(response.statusCode).toEqual(502)
  })
})
