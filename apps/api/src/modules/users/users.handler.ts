import type { UsersCode } from './users.codes'
import type { UsersService } from './users.service'
import { responseFactory } from '@raven/api/common/http'
import { honoApp } from '@raven/api/infrastructure/http'
import { UsersRoutes } from './users.routes'

export function createUsersHandler(usersService: UsersService) {
  const response = responseFactory<UsersCode>()

  return honoApp()

    .openapi(UsersRoutes.getAll, async (c) => {
      const result = await usersService.getAll(c.var.query)

      return c.json(response({
        code: 'USERS_FETCHED',
        data: result.data,
        meta: result.meta,
      }), 200)
    })

    .openapi(UsersRoutes.getById, async (c) => {
      const { id } = c.req.valid('param')

      const result = await usersService.getById(id)

      return c.json(response({
        code: 'USER_FETCHED',
        data: result,
      }), 200)
    })

    .openapi(UsersRoutes.create, async (c) => {
      const json = c.req.valid('json')

      const result = await usersService.create(json)

      return c.json(response({
        code: 'USER_CREATED',
        data: result,
      }), 201)
    })

    .openapi(UsersRoutes.update, async (c) => {
      const { id } = c.req.valid('param')
      const json = c.req.valid('json')

      const result = await usersService.update(id, json)

      return c.json(response({
        code: 'USER_UPDATED',
        data: result,
      }), 200)
    })

    .openapi(UsersRoutes.remove, async (c) => {
      const { id } = c.req.valid('param')

      const result = await usersService.delete(id)

      return c.json(response({
        code: 'USER_DELETED',
        data: result,
      }), 200)
    })
}

export type UsersHandler = ReturnType<typeof createUsersHandler>
