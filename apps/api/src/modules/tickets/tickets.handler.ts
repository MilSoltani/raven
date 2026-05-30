import type { TicketsService } from './tickets.service'
import { responseFactory } from '@raven/api/common/http'
import { honoApp } from '@raven/api/infrastructure/http'
import { ticketsResponseKeys } from './tickets-response.keys'
import { TicketsRoutes } from './tickets.routes'

export function createTicketsHandler(ticketsService: TicketsService) {
  const response = responseFactory()

  return honoApp()

    .openapi(TicketsRoutes.getAll, async (c) => {
      const result = await ticketsService.getAll(c.var.query)

      return c.json(response({
        code: ticketsResponseKeys.success.fetched,
        data: result.data,
        meta: result.meta,
      }), 200)
    })

    .openapi(TicketsRoutes.getById, async (c) => {
      const { id } = c.req.valid('param')

      const result = await ticketsService.getById(id)

      return c.json(response({
        code: ticketsResponseKeys.success.fetched,
        data: result,
      }), 200)
    })

    .openapi(TicketsRoutes.create, async (c) => {
      const json = c.req.valid('json')

      const result = await ticketsService.create(json, c.var.user.id)

      return c.json(response({
        code: ticketsResponseKeys.success.created,
        data: result,
      }), 201)
    })

    .openapi(TicketsRoutes.update, async (c) => {
      const { id } = c.req.valid('param')
      const json = c.req.valid('json')

      const result = await ticketsService.update(id, json)

      return c.json(response({
        code: ticketsResponseKeys.success.updated,
        data: result,
      }), 200)
    })

    .openapi(TicketsRoutes.remove, async (c) => {
      const { id } = c.req.valid('param')

      const result = await ticketsService.delete(id)

      return c.json(response({
        code: ticketsResponseKeys.success.deleted,
        data: result,
      }), 200)
    })
}

export type TicketsHandler = ReturnType<typeof createTicketsHandler>
