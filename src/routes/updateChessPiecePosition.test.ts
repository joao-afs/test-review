import { FastifyInstance } from 'fastify'
import { createServer } from '../../createServer'

describe('PATCH /board/:boardId', () => {
  let server: FastifyInstance

  beforeAll(async () => {
    server = await createServer({ logger: { level: 'error' } })
  })

  it('returns a 502 NotImplemented error', async () => {
    const response = await server.inject({
      method: 'PATCH',
      url: '/board/1234',
      payload: {
        from: {
          column: 0,
          row: 0,
        },
        to: {
          column: 1,
          row: 1,
        },
      },
    })
    expect(response.statusCode).toEqual(502)
  })
})
