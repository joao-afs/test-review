import { FastifyInstance } from 'fastify'
import routesToRegister from './routes/index'

const routes = async (server: FastifyInstance): Promise<void> => {
  // NOTE: currently we will only expose a public server with no authentication. Future iterations may include an auth server as well. We can easily split this out here.
  await server.register(async function (publicServer) {
    await publicServer.register(routesToRegister)
  })
}

export default routes
