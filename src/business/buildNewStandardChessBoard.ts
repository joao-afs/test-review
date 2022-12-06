import saveBoard from '../persistence/saveBoard'
import { ChessBoard } from '../types/ChessBoard'
import { ChessPiece } from '../types/ChessPiece'
import { ChessPieceColor } from '../types/ChessPieceColor'

const standardBoardColumns = 8
const standardBoardRows = 8
// It is generally accepted that "white" is the first player to take a turn: https://en.wikipedia.org/wiki/White_and_Black_in_chess
const firstTurnColor: ChessPieceColor = 'white'
const standardBlackPieceStartingPositions: ChessPiece[] = [
  {
    color: 'black',
    pieceType: 'R',
    position: {
      column: 0,
      row: 0,
    },
  },
  {
    color: 'black',
    pieceType: 'N',
    position: {
      column: 1,
      row: 0,
    },
  },
  {
    color: 'black',
    pieceType: 'B',
    position: {
      column: 2,
      row: 0,
    },
  },
  {
    color: 'black',
    pieceType: 'Q',
    position: {
      column: 3,
      row: 0,
    },
  },
  {
    color: 'black',
    pieceType: 'K',
    position: {
      column: 4,
      row: 0,
    },
  },
  {
    color: 'black',
    pieceType: 'B',
    position: {
      column: 5,
      row: 0,
    },
  },
  {
    color: 'black',
    pieceType: 'N',
    position: {
      column: 6,
      row: 0,
    },
  },
  {
    color: 'black',
    pieceType: 'R',
    position: {
      column: 7,
      row: 0,
    },
  },
  {
    color: 'black',
    pieceType: 'P',
    position: {
      column: 0,
      row: 1,
    },
  },
  {
    color: 'black',
    pieceType: 'P',
    position: {
      column: 1,
      row: 1,
    },
  },
  {
    color: 'black',
    pieceType: 'P',
    position: {
      column: 2,
      row: 1,
    },
  },
  {
    color: 'black',
    pieceType: 'P',
    position: {
      column: 3,
      row: 1,
    },
  },
  {
    color: 'black',
    pieceType: 'P',
    position: {
      column: 4,
      row: 1,
    },
  },
  {
    color: 'black',
    pieceType: 'P',
    position: {
      column: 5,
      row: 1,
    },
  },
  {
    color: 'black',
    pieceType: 'P',
    position: {
      column: 6,
      row: 1,
    },
  },
  {
    color: 'black',
    pieceType: 'P',
    position: {
      column: 7,
      row: 1,
    },
  },
]

const standardWhitePieceStartingPositions: ChessPiece[] = [
  {
    color: 'white',
    pieceType: 'R',
    position: {
      column: 0,
      row: 7,
    },
  },
  {
    color: 'white',
    pieceType: 'N',
    position: {
      column: 1,
      row: 7,
    },
  },
  {
    color: 'white',
    pieceType: 'B',
    position: {
      column: 2,
      row: 7,
    },
  },
  {
    color: 'white',
    pieceType: 'Q',
    position: {
      column: 3,
      row: 7,
    },
  },
  {
    color: 'white',
    pieceType: 'K',
    position: {
      column: 4,
      row: 7,
    },
  },
  {
    color: 'white',
    pieceType: 'B',
    position: {
      column: 5,
      row: 7,
    },
  },
  {
    color: 'white',
    pieceType: 'N',
    position: {
      column: 6,
      row: 7,
    },
  },
  {
    color: 'white',
    pieceType: 'R',
    position: {
      column: 7,
      row: 7,
    },
  },
  {
    color: 'white',
    pieceType: 'P',
    position: {
      column: 0,
      row: 6,
    },
  },
  {
    color: 'white',
    pieceType: 'P',
    position: {
      column: 1,
      row: 6,
    },
  },
  {
    color: 'white',
    pieceType: 'P',
    position: {
      column: 2,
      row: 6,
    },
  },
  {
    color: 'white',
    pieceType: 'P',
    position: {
      column: 3,
      row: 6,
    },
  },
  {
    color: 'white',
    pieceType: 'P',
    position: {
      column: 4,
      row: 6,
    },
  },
  {
    color: 'white',
    pieceType: 'P',
    position: {
      column: 5,
      row: 6,
    },
  },
  {
    color: 'white',
    pieceType: 'P',
    position: {
      column: 6,
      row: 6,
    },
  },
  {
    color: 'white',
    pieceType: 'P',
    position: {
      column: 7,
      row: 6,
    },
  },
]

const buildNewStandardChessBoard = async (): Promise<ChessBoard> => {
  const board = {
    boardSize: {
      columns: standardBoardColumns,
      rows: standardBoardRows,
    },
    currentPieces: [
      ...standardBlackPieceStartingPositions,
      ...standardWhitePieceStartingPositions,
    ],
    turn: firstTurnColor,
  }

  await saveBoard(board)

  return board
}

export default buildNewStandardChessBoard
