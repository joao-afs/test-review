import { FastifyPluginCallback, RouteOptions } from 'fastify'
import createNewGame from './createNewGame'
import healthcheck from './healthcheck'

const routesToRegister = [healthcheck, createNewGame] as RouteOptions[]

export const routes: FastifyPluginCallback = (server, _, done) => {
  for (const routeOptions of routesToRegister) {
    server.route(routeOptions)
  }
  done()
}

export default routes
