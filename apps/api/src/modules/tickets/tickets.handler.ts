import type { AppEnv } from '@raven/api/common/types'
import type { TicketsEvent } from './tickets.events'
import type { TicketsService } from './tickets.service'
import { OpenAPIHono } from '@hono/zod-openapi'
import { responseFactory } from '@raven/api/common/http'
import { TicketsRoutes } from './tickets.routes'

export function createTicketsHandler(ticketsService: TicketsService) {
  const response = responseFactory<TicketsEvent>()

  return new OpenAPIHono<AppEnv>()

    .openapi(TicketsRoutes.getAll, async (c) => {
      const result = await ticketsService.getAll(c.var.query)

      return c.json(response({
        event: 'TICKETS_FETCHED',
        data: result.data,
        meta: result.meta,
      }), 200)
    })

    .openapi(TicketsRoutes.getById, async (c) => {
      const { id } = c.req.valid('param')

      const result = await ticketsService.getById(id)

      return c.json(response({
        event: 'TICKET_FETCHED',
        data: result,
      }), 200)
    })

    .openapi(TicketsRoutes.create, async (c) => {
      const json = c.req.valid('json')

      const result = await ticketsService.create(json, c.var.user.id)

      return c.json(response({
        event: 'TICKET_CREATED',
        data: result,
      }), 201)
    })

    .openapi(TicketsRoutes.update, async (c) => {
      const { id } = c.req.valid('param')
      const json = c.req.valid('json')

      const result = await ticketsService.update(id, json)

      return c.json(response({
        event: 'TICKET_UPDATED',
        data: result,
      }), 200)
    })

    .openapi(TicketsRoutes.remove, async (c) => {
      const { id } = c.req.valid('param')

      const result = await ticketsService.delete(id)

      return c.json(response({
        event: 'TICKET_DELETED',
        data: result,
      }), 200)
    })
}

export type TicketsHandler = ReturnType<typeof createTicketsHandler>
