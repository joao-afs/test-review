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
    hasMoved: false,
    position: {
      column: 0,
      row: 0,
    },
  },
  {
    color: 'black',
    pieceType: 'N',
    hasMoved: false,
    position: {
      column: 1,
      row: 0,
    },
  },
  {
    color: 'black',
    pieceType: 'B',
    hasMoved: false,
    position: {
      column: 2,
      row: 0,
    },
  },
  {
    color: 'black',
    pieceType: 'Q',
    hasMoved: false,
    position: {
      column: 3,
      row: 0,
    },
  },
  {
    color: 'black',
    pieceType: 'K',
    hasMoved: false,
    position: {
      column: 4,
      row: 0,
    },
  },
  {
    color: 'black',
    pieceType: 'B',
    hasMoved: false,
    position: {
      column: 5,
      row: 0,
    },
  },
  {
    color: 'black',
    pieceType: 'N',
    hasMoved: false,
    position: {
      column: 6,
      row: 0,
    },
  },
  {
    color: 'black',
    pieceType: 'R',
    hasMoved: false,
    position: {
      column: 7,
      row: 0,
    },
  },
  {
    color: 'black',
    pieceType: 'P',
    hasMoved: false,
    position: {
      column: 0,
      row: 1,
    },
  },
  {
    color: 'black',
    pieceType: 'P',
    hasMoved: false,
    position: {
      column: 1,
      row: 1,
    },
  },
  {
    color: 'black',
    pieceType: 'P',
    hasMoved: false,
    position: {
      column: 2,
      row: 1,
    },
  },
  {
    color: 'black',
    pieceType: 'P',
    hasMoved: false,
    position: {
      column: 3,
      row: 1,
    },
  },
  {
    color: 'black',
    pieceType: 'P',
    hasMoved: false,
    position: {
      column: 4,
      row: 1,
    },
  },
  {
    color: 'black',
    pieceType: 'P',
    hasMoved: false,
    position: {
      column: 5,
      row: 1,
    },
  },
  {
    color: 'black',
    pieceType: 'P',
    hasMoved: false,
    position: {
      column: 6,
      row: 1,
    },
  },
  {
    color: 'black',
    pieceType: 'P',
    hasMoved: false,
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
    hasMoved: false,
    position: {
      column: 0,
      row: 7,
    },
  },
  {
    color: 'white',
    pieceType: 'N',
    hasMoved: false,
    position: {
      column: 1,
      row: 7,
    },
  },
  {
    color: 'white',
    pieceType: 'B',
    hasMoved: false,
    position: {
      column: 2,
      row: 7,
    },
  },
  {
    color: 'white',
    pieceType: 'Q',
    hasMoved: false,
    position: {
      column: 3,
      row: 7,
    },
  },
  {
    color: 'white',
    pieceType: 'K',
    hasMoved: false,
    position: {
      column: 4,
      row: 7,
    },
  },
  {
    color: 'white',
    pieceType: 'B',
    hasMoved: false,
    position: {
      column: 5,
      row: 7,
    },
  },
  {
    color: 'white',
    pieceType: 'N',
    hasMoved: false,
    position: {
      column: 6,
      row: 7,
    },
  },
  {
    color: 'white',
    pieceType: 'R',
    hasMoved: false,
    position: {
      column: 7,
      row: 7,
    },
  },
  {
    color: 'white',
    pieceType: 'P',
    hasMoved: false,
    position: {
      column: 0,
      row: 6,
    },
  },
  {
    color: 'white',
    pieceType: 'P',
    hasMoved: false,
    position: {
      column: 1,
      row: 6,
    },
  },
  {
    color: 'white',
    pieceType: 'P',
    hasMoved: false,
    position: {
      column: 2,
      row: 6,
    },
  },
  {
    color: 'white',
    pieceType: 'P',
    hasMoved: false,
    position: {
      column: 3,
      row: 6,
    },
  },
  {
    color: 'white',
    pieceType: 'P',
    hasMoved: false,
    position: {
      column: 4,
      row: 6,
    },
  },
  {
    color: 'white',
    pieceType: 'P',
    hasMoved: false,
    position: {
      column: 5,
      row: 6,
    },
  },
  {
    color: 'white',
    pieceType: 'P',
    hasMoved: false,
    position: {
      column: 6,
      row: 6,
    },
  },
  {
    color: 'white',
    pieceType: 'P',
    hasMoved: false,
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

  return await saveBoard(board)
}

export default buildNewStandardChessBoard
