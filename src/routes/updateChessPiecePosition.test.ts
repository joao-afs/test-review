import { FastifyInstance } from 'fastify'
import { createServer } from '../../createServer'
import saveBoard from '../persistence/saveBoard'

describe('PATCH /board/:boardId', () => {
  let server: FastifyInstance

  beforeAll(async () => {
    server = await createServer({ logger: { level: 'error' } })
  })

  it('returns a status code of 200 and the new representation of the board when a pawn moves 2 spaces forward', async () => {
    const newBoard = await saveBoard({
      boardSize: {
        columns: 8,
        rows: 8,
      },
      currentPieces: [
        {
          color: 'white',
          pieceType: 'P',
          hasMoved: false,
          position: {
            column: 1,
            row: 6,
          },
        },
      ],
      turn: 'white',
    })

    const response = await server.inject({
      method: 'PATCH',
      url: `/board/${newBoard.boardId}`,
      payload: {
        from: {
          column: 1,
          row: 6,
        },
        to: {
          column: 1,
          row: 4,
        },
      },
    })

    expect(response.statusCode).toEqual(200)
    expect(response.json().board).toEqual(
      expect.objectContaining({
        turn: 'black',
        currentPieces: [
          {
            color: 'white',
            pieceType: 'P',
            hasMoved: true,
            position: {
              column: 1,
              row: 4,
            },
          },
        ],
      })
    )
  })

  it('returns a status code of 200 and the new representation of the board when a pawn moves 1 space forward', async () => {
    const newBoard = await saveBoard({
      boardSize: {
        columns: 8,
        rows: 8,
      },
      currentPieces: [
        {
          color: 'white',
          pieceType: 'P',
          hasMoved: true,
          position: {
            column: 1,
            row: 6,
          },
        },
      ],
      turn: 'white',
    })

    const response = await server.inject({
      method: 'PATCH',
      url: `/board/${newBoard.boardId}`,
      payload: {
        from: {
          column: 1,
          row: 6,
        },
        to: {
          column: 1,
          row: 5,
        },
      },
    })

    expect(response.statusCode).toEqual(200)
    expect(response.json().board).toEqual(
      expect.objectContaining({
        turn: 'black',
        currentPieces: [
          {
            color: 'white',
            pieceType: 'P',
            hasMoved: true,
            position: {
              column: 1,
              row: 5,
            },
          },
        ],
      })
    )
  })

  it('returns a status code of 400 when a pawn tries to move to an invalid spot', async () => {
    const newBoard = await saveBoard({
      boardSize: {
        columns: 8,
        rows: 8,
      },
      currentPieces: [
        {
          color: 'white',
          pieceType: 'P',
          hasMoved: true,
          position: {
            column: 1,
            row: 6,
          },
        },
      ],
      turn: 'white',
    })

    const response = await server.inject({
      method: 'PATCH',
      url: `/board/${newBoard.boardId}`,
      payload: {
        from: {
          column: 1,
          row: 6,
        },
        to: {
          column: 4,
          row: 5,
        },
      },
    })

    expect(response.statusCode).toEqual(400)
    expect(response.json()).toEqual({
      error: expect.objectContaining({
        code: 'InvalidPosition',
      }),
    })
  })

  it('returns a status code of 200 and the new representation of the board when a pawn attacks an opposing piece', async () => {
    const newBoard = await saveBoard({
      boardSize: {
        columns: 8,
        rows: 8,
      },
      currentPieces: [
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
          color: 'black',
          pieceType: 'P',
          hasMoved: true,
          position: {
            column: 0,
            row: 5,
          },
        },
      ],
      turn: 'white',
    })

    const response = await server.inject({
      method: 'PATCH',
      url: `/board/${newBoard.boardId}`,
      payload: {
        from: {
          column: 1,
          row: 6,
        },
        to: {
          column: 0,
          row: 5,
        },
      },
    })

    expect(response.statusCode).toEqual(200)
    expect(response.json().board).toEqual(
      expect.objectContaining({
        turn: 'black',
        currentPieces: [
          // The black piece is no longer present on the board
          {
            color: 'white',
            pieceType: 'P',
            hasMoved: true,
            position: {
              column: 0,
              row: 5,
            },
          },
        ],
      })
    )
  })
})
