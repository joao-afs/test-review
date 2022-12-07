import { ChessBoard } from '../types/ChessBoard'
import ChessBoardModel from './models/ChessBoardModel'
import { chessBoardModelToApiChessBoard } from './saveBoard'

const updateBoard = async (
  boardId: string,
  updatedBoard: ChessBoard
): Promise<ChessBoard> => {
  const updatedChessBoard = await ChessBoardModel.findByIdAndUpdate(
    boardId,
    updatedBoard,
    {
      returnDocument: 'after',
    }
  )

  if (!updatedChessBoard) {
    throw new Error('The specified chess board was not found.')
  }

  return chessBoardModelToApiChessBoard(updatedChessBoard)
}

export default updateBoard
