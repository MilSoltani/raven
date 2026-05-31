import type { AppEnv } from '@raven/api/common/types'
import type { TicketsService } from './tickets.service'
import { zValidator } from '@hono/zod-validator'
import { IdParamSchema, responseFactory } from '@raven/api/common/http'
import { CreateTicketSchema, CriteriaSchema, UpdateTicketSchema } from '@raven/api/exports'
import { Hono } from 'hono'

export function createTicketsHandler(ticketsService: TicketsService) {
  const response = responseFactory()

  return new Hono<AppEnv>()

    .get(
      '/',
      zValidator('query', CriteriaSchema),
      async (c) => {
        const result = await ticketsService.getAll(c.var.query)

        return c.json(response({
          messageKey: 'tickets.success.fetched',
          data: result.data,
          meta: result.meta,
        }), 200)
      },
    )

    .get(
      '/:id',
      zValidator('param', IdParamSchema),
      async (c) => {
        const { id } = c.req.valid('param')

        const result = await ticketsService.getById(id)

        return c.json(response({
          messageKey: 'tickets.success.fetched',
          data: result,
        }), 200)
      },
    )

    .post(
      '/',
      zValidator('json', CreateTicketSchema),
      async (c) => {
        const json = c.req.valid('json')

        const result = await ticketsService.create(json, c.var.user.id)

        return c.json(response({
          messageKey: 'tickets.success.created',
          data: result,
        }), 201)
      },
    )

    .put(
      '/:id',
      zValidator('param', IdParamSchema),
      zValidator('json', UpdateTicketSchema),
      async (c) => {
        const { id } = c.req.valid('param')
        const json = c.req.valid('json')

        const result = await ticketsService.update(id, json)

        return c.json(response({
          messageKey: 'tickets.success.updated',
          data: result,
        }), 200)
      },
    )

    .delete(
      '/:id',
      zValidator('param', IdParamSchema),
      async (c) => {
        const { id } = c.req.valid('param')

        const result = await ticketsService.delete(id)

        return c.json(response({
          messageKey: 'tickets.success.deleted',
          data: result,
        }), 200)
      },
    )
}

export type TicketsHandler = ReturnType<typeof createTicketsHandler>
