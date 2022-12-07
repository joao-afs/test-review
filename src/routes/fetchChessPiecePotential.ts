import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteHandler,
  RouteOptions,
} from 'fastify'
import checkBoardPositionInBounds from '../business/checkBoardPositionInBounds'
import getChessBoard from '../business/getChessBoard'
import getChessPieceAtChessBoardPosition from '../business/getChessPieceAtChessBoardPosition'
import getChessPiecePotential from '../business/getChessPiecePotential'
import { ApiError } from '../types/ApiError'
import { ChessPieceType } from '../types/ChessPieceType'
import { FetchChessPiecePotentialRequestParams } from '../types/FetchChessPiecePotentialRequestParams'
import { Position } from '../types/Position'

type Reply = { positions: Position[] } | { error: ApiError }
type FetchChessPiecePotentialRoute = {
  Params: FetchChessPiecePotentialRequestParams
  Reply: Reply
}

export const unsupportedPieceTypes: ChessPieceType[] = ['R', 'N', 'B', 'Q', 'K']

export const handler: RouteHandler<FetchChessPiecePotentialRoute> = async (
  request,
  reply
) => {
  const chessBoard = await getChessBoard(request.params.boardId)
  if (!chessBoard) {
    return reply.status(404).send({
      error: {
        code: 'NotFound',
        message: 'No existing chess board was found with the provided id.',
      },
    })
  }

  const requestedPosition = {
    column: request.params.column,
    row: request.params.row,
  }
  if (!checkBoardPositionInBounds(chessBoard.boardSize, requestedPosition)) {
    return reply.status(400).send({
      error: {
        code: 'PositionOutOfBounds',
        message:
          'The specified positions is not present on the specified chess board.',
      },
    })
  }

  const chessPieceAtSpecifiedPosition = await getChessPieceAtChessBoardPosition(
    chessBoard,
    requestedPosition
  )
  if (!chessPieceAtSpecifiedPosition) {
    // Nothing exists, so there are no potential moves
    return reply.status(200).send({ positions: [] })
  }

  if (unsupportedPieceTypes.includes(chessPieceAtSpecifiedPosition.pieceType)) {
    return reply.status(502).send({
      error: {
        code: 'NotImplemented',
        message: 'The piece type at the specified position is not supported.',
      },
    })
  }

  const potentialPositions = getChessPiecePotential(
    chessBoard,
    chessPieceAtSpecifiedPosition
  )
  return reply.status(200).send({ positions: potentialPositions })
}

export const fetchChessPiecePotential: RouteOptions<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  FetchChessPiecePotentialRoute
> = {
  method: 'GET',
  url: '/board/:boardId/column/:column/row/:row/potential',
  handler,
  schema: {
    params: {
      $ref: 'FetchChessPiecePotentialRequestParams.json',
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
