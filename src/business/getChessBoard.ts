import getBoard from '../persistence/getBoard'
import { ChessBoard } from '../types/ChessBoard'

const getChessBoard = async (
  boardId: string
): Promise<ChessBoard | undefined> => {
  return getBoard(boardId)
}

export default getChessBoard
