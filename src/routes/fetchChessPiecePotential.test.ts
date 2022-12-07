import { FastifyInstance } from 'fastify'
import { createServer } from '../../createServer'
import saveBoard from '../persistence/saveBoard'

describe('GET /board/column/:column/row/:row/potential', () => {
  let server: FastifyInstance

  beforeAll(async () => {
    server = await createServer({ logger: { level: 'error' } })
  })

  it('returns a 404 status code when a non existent board is specified', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/board/IDontExist/column/1/row/1/potential',
    })
    expect(response.statusCode).toEqual(404)
    expect(response.json()).toEqual({
      error: expect.objectContaining({ code: 'NotFound' }),
    })
  })

  it('returns a 400 status code when an out of bounds position is specified', async () => {
    const newBoard = await saveBoard({
      boardSize: {
        columns: 8,
        rows: 8,
      },
      currentPieces: [],
      turn: 'white',
    })

    const response = await server.inject({
      method: 'GET',
      url: `/board/${newBoard.boardId}/column/999/row/999/potential`,
    })
    expect(response.statusCode).toEqual(400)
    expect(response.json()).toEqual({
      error: expect.objectContaining({ code: 'PositionOutOfBounds' }),
    })
  })

  it('returns a 200 status code and an empty array when the specified position does not contain a piece', async () => {
    const newBoard = await saveBoard({
      boardSize: {
        columns: 8,
        rows: 8,
      },
      currentPieces: [],
      turn: 'white',
    })

    const response = await server.inject({
      method: 'GET',
      url: `/board/${newBoard.boardId}/column/1/row/1/potential`,
    })
    expect(response.statusCode).toEqual(200)
    expect(response.json()).toEqual({
      positions: [],
    })
  })

  it('returns a 200 status code and valid potential moves', async () => {
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
          pieceType: 'R',
          hasMoved: true,
          position: {
            column: 0,
            row: 5,
          },
        },
        {
          color: 'black',
          pieceType: 'R',
          hasMoved: true,
          position: {
            column: 2,
            row: 5,
          },
        },
      ],
      turn: 'white',
    })

    const response = await server.inject({
      method: 'GET',
      url: `/board/${newBoard.boardId}/column/1/row/6/potential`,
    })
    expect(response.statusCode).toEqual(200)
    expect(response.json().positions).toHaveLength(4)
    expect(response.json()).toEqual({
      positions: expect.arrayContaining([
        {
          column: 0,
          row: 5,
          contains: expect.objectContaining({
            color: 'black',
            position: {
              column: 0,
              row: 5,
            },
          }),
        },
        {
          column: 2,
          row: 5,
          contains: expect.objectContaining({
            color: 'black',
            position: {
              column: 2,
              row: 5,
            },
          }),
        },
        {
          column: 1,
          row: 5,
        },
        {
          column: 1,
          row: 4,
        },
      ]),
    })
  })
})
