import updateBoard from '../persistence/updateBoard'
import { ChessBoard } from '../types/ChessBoard'
import { ChessPiece } from '../types/ChessPiece'
import { Position } from '../types/Position'

const moveChessPiece = async (
  board: ChessBoard,
  pieceToMove: ChessPiece,
  to: Position
): Promise<ChessBoard> => {
  const pieceOnBoard = board.currentPieces.find(
    (it) =>
      it.position.column === pieceToMove.position.column &&
      it.position.row === pieceToMove.position.row
  )
  if (!pieceOnBoard) {
    throw new Error('The specified piece was not found on the board.')
  }

  // Remove any piece occupying the `to` position
  const pieces = board.currentPieces.filter(
    (it) => it.position.column !== to.column || it.position.row !== to.row
  )

  // Set the piece to move's position to the `to` position
  pieceOnBoard.position = to
  pieceOnBoard.hasMoved = true

  // Update the turn
  const newTurn = board.turn === 'white' ? 'black' : 'white'

  const newBoard: ChessBoard = {
    boardSize: board.boardSize,
    currentPieces: pieces,
    turn: newTurn,
  }

  // FIXME: we'll probably have a schema model to use for the board here, and not the type... change this out when we can.
  return await updateBoard(board.boardId!, newBoard)
}

export default moveChessPiece
