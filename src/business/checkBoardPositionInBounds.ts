import { Position } from '../types/Position'

const checkBoardPositionInBounds = (
  boardSize: {
    columns: number
    rows: number
  },
  positionToCheck: Position
): boolean => {
  const { column, row } = positionToCheck

  return (
    column >= 0 &&
    row >= 0 &&
    column < boardSize.columns &&
    row < boardSize.rows
  )
}

export default checkBoardPositionInBounds
