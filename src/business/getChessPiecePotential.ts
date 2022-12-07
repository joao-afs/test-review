import { ChessBoard } from '../types/ChessBoard'
import { ChessPiece } from '../types/ChessPiece'
import { Position } from '../types/Position'
import checkBoardPositionInBounds from './checkBoardPositionInBounds'
import getChessPieceAtChessBoardPosition from './getChessPieceAtChessBoardPosition'

// TODO: implement non-pawn pieces
const getChessPiecePotential = async (
  board: ChessBoard,
  piece: ChessPiece
): Promise<Position[]> => {
  switch (piece.pieceType) {
    case 'P':
      return getPawnPotential(board, piece)
    case 'R':
    case 'N':
    case 'B':
    case 'Q':
    case 'K':
    default:
      // Fall through all pieces that are not a pawn.
      return []
  }
}

const getPawnPotential = (board: ChessBoard, piece: ChessPiece): Position[] => {
  const positions: Position[] = []
  // will be 1 to go up, -1 to go down
  const directionMultiplier = piece.color === 'white' ? 1 : -1

  let twoForward: Position | undefined
  if (!piece.hasMoved) {
    twoForward = {
      column: piece.position.column,
      row: piece.position.row + 2 * directionMultiplier,
    }
  }
  const oneForward: Position = {
    column: piece.position.column,
    row: piece.position.row + 1 * directionMultiplier,
  }
  const oneForwardAndLeft: Position = {
    column: oneForward.column - 1,
    row: oneForward.row,
  }
  const oneForwardAndRight: Position = {
    column: oneForward.column + 1,
    row: oneForward.row,
  }

  if (
    twoForward &&
    checkBoardPositionInBounds(board.boardSize, twoForward) &&
    !getChessPieceAtChessBoardPosition(board, twoForward)
  ) {
    // Can move
    positions.push(twoForward)
  }
  if (
    checkBoardPositionInBounds(board.boardSize, oneForward) &&
    !getChessPieceAtChessBoardPosition(board, oneForward)
  ) {
    // Can move
    positions.push(oneForward)
  }

  const colorToAttack = piece.color === 'white' ? 'black' : 'white'
  if (
    checkBoardPositionInBounds(board.boardSize, oneForwardAndLeft) &&
    getChessPieceAtChessBoardPosition(board, oneForwardAndLeft)?.color ===
      colorToAttack
  ) {
    // Can attack
    positions.push(oneForwardAndLeft)
  }
  if (
    checkBoardPositionInBounds(board.boardSize, oneForwardAndRight) &&
    getChessPieceAtChessBoardPosition(board, oneForwardAndRight)?.color ===
      colorToAttack
  ) {
    // Can attack
    positions.push(oneForwardAndRight)
  }

  return positions
}

export default getChessPiecePotential
