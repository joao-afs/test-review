import dotenv from 'dotenv'
import createServer from './createServer'

const start = async () => {
  dotenv.config()

  const server = await createServer({ logger: {} }).catch((err) => {
    console.error('Failed to createServer!', { error: err })
    process.exit(2)
  })

  try {
    await server.listen({ port: +(process.env?.PORT ?? 8080) })
  } catch (err) {
    server.log.error({ err })
    process.exit(1)
  }
}

void start()
