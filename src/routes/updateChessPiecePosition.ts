import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteHandler,
  RouteOptions,
} from 'fastify'
import { ApiError } from '../types/ApiError'
import { ChessBoardRequestParams } from '../types/ChessBoardRequestParams'
import { Position } from '../types/Position'

type Reply = { positions: Position[] } | { error: ApiError }
type UpdateChessPiecePositionRoute = {
  Params: ChessBoardRequestParams
  Body: {
    from: Position
    to: Position
  }
  Reply: Reply
}

export const handler: RouteHandler<UpdateChessPiecePositionRoute> = async (
  request,
  reply
) => {
  // If the provided from position does not contain a piece that matches the current turn, return 400

  // If the position's piece is not a pawn, return 502

  // If the `to` position is not valid for the piece, return 400

  // Move the piece, and return 200

  return reply.status(502).send({
    error: {
      code: 'NotImplemented',
      message:
        'The update chess piece position route has not yet been implemented.',
    },
  })
}

export const updateChessPiecePosition: RouteOptions<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  UpdateChessPiecePositionRoute
> = {
  method: 'PATCH',
  url: '/board/:boardId',
  handler,
  schema: {
    params: {
      $ref: 'ChessBoardRequestParams.json',
    },
    body: {
      type: 'object',
      properties: {
        from: {
          $ref: 'Position.json',
        },
        to: {
          $ref: 'Position.json',
        },
      },
    },
    response: {
      // 200: {
      //   type: 'object',
      //   properties: {
      //     positions: {
      //       type: 'array',
      //       items: {
      //         $ref: 'Position.json',
      //       },
      //     },
      //   },
      // },
    },
  },
}

export default updateChessPiecePosition
