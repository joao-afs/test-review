import { boards } from './saveBoard'
import { ChessBoard } from '../types/ChessBoard'

const getBoard = async (boardId: string): Promise<ChessBoard | undefined> => {
  return boards.find((it) => it.boardId === boardId)
}

export default getBoard
