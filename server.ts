import dotenv from 'dotenv'
import fastify, { FastifyInstance, FastifyServerOptions } from 'fastify'

const createServer = async (
  opts: FastifyServerOptions
): Promise<FastifyInstance> => {
  const server = fastify({ ...opts })

  return server
}

const start = async () => {
  dotenv.config()

  const server = await createServer({}).catch((err) => {
    console.error('Failed to createServer!', { error: err })
    process.exit(2)
  })

  try {
    await server.listen({ port: +(process.env?.PORT ?? 8080) })
  } catch (err) {
    server.log.error({ err })
    process.exit(1)
  }
}
start()
