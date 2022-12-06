import fastify, { FastifyInstance, FastifyServerOptions } from 'fastify'
import allRoutes from './src/routes'
import fs from 'fs'
import path from 'path'

export const createServer = async (
  opts: FastifyServerOptions = {}
): Promise<FastifyInstance> => {
  const server = fastify({ ...opts })

  await server.register(allRoutes)

  const schemas = fs.readdirSync(path.join('src', 'schemas'))
  for (const schemaFileName of schemas) {
    const schema = fs.readFileSync(
      path.join('src', 'schemas', schemaFileName),
      'utf-8'
    )

    server.addSchema(JSON.parse(schema))
  }

  return server
}

export default createServer
