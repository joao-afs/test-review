import { FastifyPluginCallback, RouteOptions } from 'fastify'
import fetchChessBoard from './fetchChessBoard'
import healthcheck from './healthcheck'

const routesToRegister = [healthcheck, fetchChessBoard] as RouteOptions[]

export const routes: FastifyPluginCallback = (server, _, done) => {
  for (const routeOptions of routesToRegister) {
    server.route(routeOptions)
  }
  done()
}

export default routes
