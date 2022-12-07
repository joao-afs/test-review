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
import moveChessPiece from '../business/moveChessPiece'
import { ApiError } from '../types/ApiError'
import { ChessBoard } from '../types/ChessBoard'
import { ChessBoardRequestParams } from '../types/ChessBoardRequestParams'
import { Position } from '../types/Position'
import { unsupportedPieceTypes } from './fetchChessPiecePotential'

type Reply = { board: ChessBoard } | { error: ApiError }
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
  const chessBoard = await getChessBoard(request.params.boardId)
  if (!chessBoard) {
    return reply.status(404).send({
      error: {
        code: 'NotFound',
        message: 'No existing chess board was found with the provided id.',
      },
    })
  }

  const requestedFromPosition = request.body.from
  if (
    !checkBoardPositionInBounds(chessBoard.boardSize, requestedFromPosition)
  ) {
    return reply.status(400).send({
      error: {
        code: 'PositionOutOfBounds',
        message:
          'The specified from position is not present on the specified chess board.',
      },
    })
  }

  const chessPieceAtSpecifiedFromPosition =
    await getChessPieceAtChessBoardPosition(chessBoard, requestedFromPosition)
  if (!chessPieceAtSpecifiedFromPosition) {
    return reply.status(400).send({
      error: {
        code: 'InvalidPosition',
        message: 'No piece was present at the specified position.',
      },
    })
  }
  if (chessPieceAtSpecifiedFromPosition.color !== chessBoard.turn) {
    return reply.status(400).send({
      error: {
        code: 'NotYourTurn',
        message: 'The piece at the specified position cannot move this turn.',
      },
    })
  }
  if (
    unsupportedPieceTypes.includes(chessPieceAtSpecifiedFromPosition.pieceType)
  ) {
    return reply.status(502).send({
      error: {
        code: 'NotImplemented',
        message: 'The piece type at the specified position is not supported.',
      },
    })
  }

  const potentialPositions = getChessPiecePotential(
    chessBoard,
    chessPieceAtSpecifiedFromPosition
  )

  const requestedToPosition = request.body.to
  if (
    !potentialPositions.find(
      (it) =>
        it.column === requestedToPosition.column &&
        it.row === requestedToPosition.row
    )
  ) {
    return reply.status(400).send({
      error: {
        code: 'InvalidPosition',
        message:
          'The specified to position is not a valid position for the piece to move.',
      },
    })
  }

  try {
    const updatedBoard = await moveChessPiece(
      chessBoard,
      chessPieceAtSpecifiedFromPosition,
      requestedToPosition
    )

    return reply.status(200).send({ board: updatedBoard })
  } catch (err) {
    request.log.error({
      params: request.params,
      body: request.body,
      err,
    })
    return reply.status(500).send({
      error: {
        code: 'Unknown',
        message:
          'An unknown error has occurred and the piece could not be moved.',
      },
    })
  }
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

export default updateChessPiecePosition
