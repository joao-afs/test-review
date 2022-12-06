import { FastifyInstance } from 'fastify'
import { createServer } from '../../createServer'
import * as buildNewStandardChessBoard from '../business/buildNewStandardChessBoard'
import * as getChessBoard from '../business/getChessBoard'
import saveBoard from '../persistence/saveBoard'

describe('GET /board', () => {
  let server: FastifyInstance

  beforeAll(async () => {
    server = await createServer({ logger: { level: 'error' } })
  })

  it('creates a new standard chess board and returns it when no boardId is provided', async () => {
    const buildNewStandardChessBoardSpy = jest.spyOn(
      buildNewStandardChessBoard,
      'default'
    )
    const getChessBoardSpy = jest.spyOn(getChessBoard, 'default')

    const response = await server.inject({
      method: 'GET',
      url: '/board',
    })

    expect(response.statusCode).toEqual(200)
    expect(buildNewStandardChessBoardSpy).toHaveBeenCalledTimes(1)
    expect(getChessBoardSpy).not.toHaveBeenCalled()
  })

  it('fetches an existing chess board and returns it when a boardId is provided', async () => {
    const buildNewStandardChessBoardSpy = jest.spyOn(
      buildNewStandardChessBoard,
      'default'
    )
    const getChessBoardSpy = jest.spyOn(getChessBoard, 'default')

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
      url: '/board',
      query: {
        boardId: `${newBoard.boardId}`,
      },
    })

    expect(response.statusCode).toEqual(200)
    expect(response.json()).toEqual({
      board: expect.objectContaining({ boardId: newBoard.boardId }),
    })
    expect(getChessBoardSpy).toHaveBeenCalledTimes(1)
    expect(buildNewStandardChessBoardSpy).not.toHaveBeenCalled()
  })
})
