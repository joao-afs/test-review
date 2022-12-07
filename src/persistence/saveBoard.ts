import { ChessBoard } from '../types/ChessBoard'
import ChessBoardModel from './models/ChessBoardModel'

export const chessBoardModelToApiChessBoard = (
  board: InstanceType<typeof ChessBoardModel>
): ChessBoard => {
  return {
    boardId: board.id,
    boardSize: board.boardSize,
    currentPieces: board.currentPieces,
    turn: board.turn,
  }
}

const saveBoard = async (board: ChessBoard): Promise<ChessBoard> => {
  const newBoard = new ChessBoardModel({ ...board })
  const savedBoard = await newBoard.save()

  return chessBoardModelToApiChessBoard(savedBoard)
}

export default saveBoard
