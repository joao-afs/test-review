import { ChessBoard } from '../types/ChessBoard'

export const boards: ChessBoard[] = []

const saveBoard = async (board: ChessBoard): Promise<void> => {
  boards.push(board)
}

export default saveBoard
