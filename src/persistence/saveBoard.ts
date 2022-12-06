import { ChessBoard } from '../types/ChessBoard'

export const boards: ChessBoard[] = []
let startId = 1000

const saveBoard = async (board: ChessBoard): Promise<ChessBoard> => {
  const newBoard = { ...board, boardId: `${++startId}` }
  boards.push(newBoard)
  return newBoard
}

export default saveBoard
