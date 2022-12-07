import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteHandler,
  RouteOptions,
} from 'fastify'
import { ApiError } from '../types/ApiError'
import { ChessBoard } from '../types/ChessBoard'
import { ChessBoardRequestParams } from '../types/ChessBoardRequestParams'

type Reply = { board: ChessBoard } | { error: ApiError }
type FetchChessBoardHistory = {
  Params: ChessBoardRequestParams
  Reply: Reply
}

export const handler: RouteHandler<FetchChessBoardHistory> = async (
  request,
  reply
) => {
  return reply.status(502).send({
    error: {
      code: 'NotImplemented',
      message: 'The fetchChessBoardHistory route has not yet been implemented.',
    },
  })
}

export const fetchChessBoardHistory: RouteOptions<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  FetchChessBoardHistory
> = {
  method: 'GET',
  url: '/board/:boardId/history',
  handler,
  schema: {
    params: {
      $ref: 'ChessBoardRequestParams.json',
    },
    response: {
      502: {},
    },
  },
}

export default fetchChessBoardHistory
