import type { AppEnv } from '@raven/api/common/types'
import type { UsersService } from './users.service'
import { zValidator } from '@hono/zod-validator'
import { IdParamSchema } from '@raven/api/common/types'
import { CreateUserPayloadSchema, CriteriaSchema, UpdateUserPayloadSchema } from '@raven/api/exports'
import { Hono } from 'hono'

export function createUsersHandler(usersService: UsersService) {
  return new Hono<AppEnv>()

    .get(
      '/',
      zValidator('query', CriteriaSchema),
      async (c) => {
        const result = await usersService.getAll(c.var.query)

        return c.json({
          items: result.data,
          meta: result.meta,
        }, 200)
      },
    )

    .get(
      '/:id',
      zValidator('param', IdParamSchema),
      async (c) => {
        const { id } = c.req.valid('param')

        const result = await usersService.getById(id)

        return c.json(result, 200)
      },
    )

    .post(
      '/',
      zValidator('json', CreateUserPayloadSchema),
      async (c) => {
        const json = c.req.valid('json')

        const result = await usersService.create(json)

        return c.json(result, 201)
      },
    )

    .put(
      '/:id',
      zValidator('param', IdParamSchema),
      zValidator('json', UpdateUserPayloadSchema),
      async (c) => {
        const { id } = c.req.valid('param')
        const json = c.req.valid('json')

        const result = await usersService.update(id, json)

        return c.json(result, 200)
      },
    )

    .delete(
      '/:id',
      zValidator('param', IdParamSchema),
      async (c) => {
        const { id } = c.req.valid('param')

        const result = await usersService.delete(id)

        return c.json(result, 200)
      },
    )
}

export type UsersHandler = ReturnType<typeof createUsersHandler>
