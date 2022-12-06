import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteHandler,
  RouteOptions,
} from 'fastify'
import { ApiError } from '../types/ApiError'
import { ChessBoardQueryParams } from '../types/ChessBoardQueryParams'
import { ChessBoard } from '../types/ChessBoard'

type Reply = ChessBoard | { error: ApiError }
type FetchChessBoardRoute = { Querystring: ChessBoardQueryParams; Reply: Reply }

export const handler: RouteHandler<FetchChessBoardRoute> = async (
  request,
  reply
) => {
  return reply.status(502).send({
    error: {
      code: 'NotImplemented',
      message: 'The create new game route has not yet been implemented.',
    },
  })
}

export const fetchChessBoard: RouteOptions<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  FetchChessBoardRoute
> = {
  method: 'GET',
  url: '/board',
  handler,
  schema: {
    querystring: {
      $ref: 'ChessBoardQueryParams.json',
    },
    response: {
      200: {
        $ref: 'ChessBoard.json',
      },
    },
  },
}

export default fetchChessBoard
