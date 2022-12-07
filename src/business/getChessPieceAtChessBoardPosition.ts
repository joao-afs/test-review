import { ChessBoard, ChessPiece } from '../types/ChessBoard'
import { Position } from '../types/Position'

const getChessPieceAtChessBoardPosition = (
  board: ChessBoard,
  position: Position
): ChessPiece | undefined => {
  return board.currentPieces.find(
    (it) =>
      it.position.column === position.column && it.position.row === position.row
  )
}

export default getChessPieceAtChessBoardPosition
