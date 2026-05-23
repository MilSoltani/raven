import { createRoute } from '@hono/zod-openapi'
import { ErrorSchema, IdParamSchema } from '@raven/api/common/openapi/openapi.schema'
import { createPaginatedSchema } from '@raven/api/exports'
import { CriteriaSchema } from '@raven/api/infrastructure/query/criteria.schema'
import { CreateUserPayloadSchema, UpdateUserPayloadSchema, UserSchema } from './users.schema'

export const UsersRoutes = {
  getAll: createRoute({
    method: 'get',
    path: '/',
    request: {
      query: CriteriaSchema,
    },
    tags: ['User'],
    responses: {
      200: {
        content: {
          'application/json': {
            schema: createPaginatedSchema(UserSchema),
          },
        },
        description: 'List of all users',
      },
    },
  }),

  getById: createRoute({
    method: 'get',
    path: '/{id}',
    tags: ['User'],
    request: { params: IdParamSchema },
    responses: {
      200: {
        content: {
          'application/json': {
            schema: UserSchema,
          },
        },
        description: 'The requested user',
      },
      404: {
        content: {
          'application/json': {
            schema: ErrorSchema,
          },
        },
        description: 'User not found',
      },
    },
  }),

  create: createRoute({
    method: 'post',
    path: '/',
    tags: ['User'],
    request: {
      body: {
        content: {
          'application/json': {
            schema: CreateUserPayloadSchema,
          },
        },
        description: 'User data',
      },
    },
    responses: {
      201: {
        content: {
          'application/json': {
            schema: UserSchema,
          },
        },
        description: 'User created',
      },
      400: {
        content: {
          'application/json': {
            schema: ErrorSchema,
          },
        },
        description: 'Invalid data',
      },
      409: {
        content: {
          'application/json': {
            schema: ErrorSchema,
          },
        },
        description: 'User already exists',
      },
      500: {
        content: {
          'application/json': {
            schema: ErrorSchema,
          },
        },
        description: 'User creation failed',
      },
    },
  }),

  update: createRoute({
    method: 'put',
    path: '/{id}',
    tags: ['User'],
    request: {
      params: IdParamSchema,
      body: {
        content: {
          'application/json': {
            schema: UpdateUserPayloadSchema,
          },
        },
        description: 'Updated user data',
      },
    },
    responses: {
      200: {
        content: {
          'application/json': {
            schema: UserSchema,
          },
        },
        description: 'User updated',
      },
      400: {
        content: {
          'application/json': {
            schema: ErrorSchema,
          },
        },
        description: 'Invalid data',
      },
      404: {
        content: {
          'application/json': {
            schema: ErrorSchema,
          },
        },
        description: 'User not found',
      },
    },
  }),

  remove: createRoute({
    method: 'delete',
    path: '/{id}',
    tags: ['User'],
    request: { params: IdParamSchema },
    responses: {
      204: { description: 'User deleted' },
      404: {
        content: {
          'application/json': {
            schema: ErrorSchema,
          },
        },
        description: 'User not found',
      },
    },
  }),
}
