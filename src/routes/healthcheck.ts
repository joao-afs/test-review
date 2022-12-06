import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteHandler,
  RouteOptions,
} from 'fastify'

// TODO: add version number to Reply
type Reply = {
  status: 'online'
}
type HealthcheckRoute = { Reply: Reply }

export const handler: RouteHandler<HealthcheckRoute> = async (
  request,
  reply
) => {
  return reply.status(200).send({ status: 'online' })
}

export const healthcheck: RouteOptions<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  HealthcheckRoute
> = {
  method: 'GET',
  url: '/',
  handler,
  schema: {
    response: {
      200: {
        type: 'object',
        required: ['status'],
        properties: {
          status: { type: 'string', enum: ['online'] },
        },
      },
    },
  },
}

export default healthcheck
