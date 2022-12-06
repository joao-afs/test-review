import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteHandler,
  RouteOptions,
} from 'fastify'
import { ApiError } from '../types/ApiError'
import { Position } from '../types/Position'

type Reply = { positions: Position[] } | { error: ApiError }
type FetchChessPiecePotentialRoute = {
  Params: Position
  Reply: Reply
}

export const handler: RouteHandler<FetchChessPiecePotentialRoute> = async (
  request,
  reply
) => {
  return reply.status(502).send({
    error: {
      code: 'NotImplemented',
      message: 'The fetch piece potential route has not yet been implemented.',
    },
  })
}

export const fetchChessPiecePotential: RouteOptions<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  FetchChessPiecePotentialRoute
> = {
  method: 'GET',
  url: '/board/column/:column/row/:row/potential',
  handler,
  schema: {
    params: {
      $ref: 'Position.json',
    },
    response: {
      200: {
        type: 'object',
        properties: {
          positions: {
            type: 'array',
            items: {
              $ref: 'Position.json',
            },
          },
        },
      },
    },
  },
}

export default fetchChessPiecePotential
