import type { AppEnv } from '@raven/api/common/types'
import type { UsersService } from './users.service'
import { OpenAPIHono } from '@hono/zod-openapi'
import { UsersRoutes } from './users.routes'

export function createUsersHandler(usersService: UsersService) {
  return new OpenAPIHono<AppEnv>()

    .openapi(UsersRoutes.getAll, async (c) => {
      const data = await usersService.getAll(c.var.query)

      return c.json(data, 200)
    })

    .openapi(UsersRoutes.getById, async (c) => {
      const { id } = c.req.valid('param')

      const data = await usersService.getById(id)

      return c.json(data, 200)
    })

    .openapi(UsersRoutes.create, async (c) => {
      const json = c.req.valid('json')

      const data = await usersService.create(json)

      return c.json(data, 201)
    })

    .openapi(UsersRoutes.update, async (c) => {
      const { id } = c.req.valid('param')
      const json = c.req.valid('json')

      const data = await usersService.update(id, json)

      return c.json(data, 200)
    })

    .openapi(UsersRoutes.remove, async (c) => {
      const { id } = c.req.valid('param')

      const data = await usersService.delete(id)

      return c.json(data, 200)
    })
}

export type UsersHandler = ReturnType<typeof createUsersHandler>
