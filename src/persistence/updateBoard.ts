import { ChessBoard } from '../types/ChessBoard'
import { boards } from './saveBoard'

const updateBoard = async (
  boardId: string,
  updatedBoard: ChessBoard
): Promise<ChessBoard> => {
  const indexOfBoard = boards.findIndex((it) => it.boardId === boardId)
  boards.splice(indexOfBoard, 1, { ...updatedBoard, boardId: boardId })
  return boards[indexOfBoard]
}

export default updateBoard
