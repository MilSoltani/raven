import type { AppEnv } from '@raven/api/common/types'
import type { TicketsService } from './tickets.service'
import { OpenAPIHono } from '@hono/zod-openapi'
import { TicketsRoutes } from './tickets.routes'

export function createTicketsHandler(ticketsService: TicketsService) {
  return new OpenAPIHono<AppEnv>()

    .openapi(TicketsRoutes.getAll, async (c) => {
      const data = await ticketsService.getAll(c.var.query)

      return c.json(data, 200)
    })

    .openapi(TicketsRoutes.getById, async (c) => {
      const { id } = c.req.valid('param')

      const data = await ticketsService.getById(id)

      return c.json(data, 200)
    })

    .openapi(TicketsRoutes.create, async (c) => {
      const json = c.req.valid('json')

      const data = await ticketsService.create(json, c.var.user.id)

      return c.json(data, 201)
    })

    .openapi(TicketsRoutes.update, async (c) => {
      const { id } = c.req.valid('param')
      const json = c.req.valid('json')

      const data = await ticketsService.update(id, json)

      return c.json(data, 200)
    })

    .openapi(TicketsRoutes.remove, async (c) => {
      const { id } = c.req.valid('param')

      const data = await ticketsService.delete(id)

      return c.json(data, 200)
    })
}

export type TicketsHandler = ReturnType<typeof createTicketsHandler>
