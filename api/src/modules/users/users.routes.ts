import { IdParamSchema } from '@api/common/common.schema'
import { jsonContent, jsonError } from '@api/common/routes.util'
import { RestQuerySchema } from '@api/infrastructure/query/query.schema'
import { createRoute } from '@hono/zod-openapi'
import z from 'zod'
import { CreateUserPayloadSchema, UpdateUserPayloadSchema, UserSchema } from './users.schema'

export const UsersRoutes = {
  getAll: createRoute({
    method: 'get',
    path: '/',
    request: {
      query: RestQuerySchema,
    },
    tags: ['User'],
    responses: {
      200: jsonContent(z.array(UserSchema), 'List of all users'),
    },
  }),

  getById: createRoute({
    method: 'get',
    path: '/{id}',
    tags: ['User'],
    request: { params: IdParamSchema },
    responses: {
      200: jsonContent(UserSchema, 'The requested user'),
      404: jsonError('User not found'),
    },
  }),

  create: createRoute({
    method: 'post',
    path: '/',
    tags: ['User'],
    request: {
      body: jsonContent(CreateUserPayloadSchema, 'User data'),
    },
    responses: {
      201: jsonContent(UserSchema, 'User created'),
      400: jsonError('Invalid data'),
      409: jsonError('User already exists'),
      500: jsonError('User creation failed'),
    },
  }),

  update: createRoute({
    method: 'put',
    path: '/{id}',
    tags: ['User'],
    request: {
      params: IdParamSchema,
      body: jsonContent(UpdateUserPayloadSchema, 'Updated user data'),
    },
    responses: {
      200: jsonContent(UserSchema, 'User updated'),
      400: jsonError('Invalid data'),
      404: jsonError('User not found'),
    },
  }),

  remove: createRoute({
    method: 'delete',
    path: '/{id}',
    tags: ['User'],
    request: { params: IdParamSchema },
    responses: {
      200: jsonContent(UserSchema, 'User deleted'),
      404: jsonError('User not found'),
    },
  }),
}
