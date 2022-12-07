import { ChessBoard } from '../types/ChessBoard'
import ChessBoardModel from './models/ChessBoardModel'
import { chessBoardModelToApiChessBoard } from './saveBoard'

const getBoard = async (boardId: string): Promise<ChessBoard | undefined> => {
  const fetchedBoard = await ChessBoardModel.findById(boardId)
  return fetchedBoard ? chessBoardModelToApiChessBoard(fetchedBoard) : undefined
}

export default getBoard
