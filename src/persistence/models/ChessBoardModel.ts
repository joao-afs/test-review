import mongoose from 'mongoose'

const positionSchema = new mongoose.Schema({
  column: { type: Number, required: true },
  row: { type: Number, required: true },
})

const chessPieceSchema = new mongoose.Schema({
  color: {
    type: String,
    enum: ['white', 'black'],
    required: true,
  },
  pieceType: {
    type: String,
    enum: ['K', 'Q', 'B', 'N', 'R', 'P'],
    required: true,
  },
  position: { type: positionSchema, required: true },
  hasMoved: { type: Boolean, required: true },
})

export const chessBoardSchema = new mongoose.Schema({
  boardSize: {
    type: {
      columns: { type: Number, required: true },
      rows: { type: Number, required: true },
    },
    required: true,
  },
  currentPieces: [{ type: chessPieceSchema, required: true }],
  turn: { type: String, enum: ['white', 'black'], required: true },
})

export default mongoose.model('ChessBoard', chessBoardSchema)
