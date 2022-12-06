import { FastifyPluginCallback, RouteOptions } from 'fastify'
import fetchChessBoard from './fetchChessBoard'
import fetchChessPiecePotential from './fetchChessPiecePotential'
import healthcheck from './healthcheck'
import updateChessPiecePosition from './updateChessPiecePosition'

const routesToRegister = [
  healthcheck,
  fetchChessBoard,
  fetchChessPiecePotential,
  updateChessPiecePosition,
] as RouteOptions[]

export const routes: FastifyPluginCallback = (server, _, done) => {
  for (const routeOptions of routesToRegister) {
    server.route(routeOptions)
  }
  done()
}

export default routes
