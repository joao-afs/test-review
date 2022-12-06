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
import buildNewStandardChessBoard from '../business/buildNewStandardChessBoard'
import getChessBoard from '../business/getChessBoard'

type Reply = { board: ChessBoard } | { error: ApiError }
type FetchChessBoardRoute = { Querystring: ChessBoardQueryParams; Reply: Reply }

export const handler: RouteHandler<FetchChessBoardRoute> = async (
  request,
  reply
) => {
  if (request.query.boardId === undefined) {
    const newBoard = await buildNewStandardChessBoard()

    return reply.status(200).send({ board: newBoard })
  } else {
    const board = await getChessBoard(request.query.boardId)
    if (!board) {
      return reply.status(404).send({
        error: {
          code: 'NotFound',
          message: 'No existing chess board was found with the provided id.',
        },
      })
    }

    return reply.status(200).send({ board })
  }
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
