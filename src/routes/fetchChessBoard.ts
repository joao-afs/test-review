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

type Reply = { board: ChessBoard } | { error: ApiError }
type FetchChessBoardRoute = { Querystring: ChessBoardQueryParams; Reply: Reply }

export const handler: RouteHandler<FetchChessBoardRoute> = async (
  request,
  reply
) => {
  if (request.query.boardId === undefined) {
    // TODO: Create a new board and return it
  } else {
    // TODO: Fetch the board by its id and return it. Return 404 if it does not exist.
  }

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
        type: 'object',
        properties: {
          board: {
            $ref: 'ChessBoard.json',
          },
        },
      },
    },
  },
}

export default fetchChessBoard
