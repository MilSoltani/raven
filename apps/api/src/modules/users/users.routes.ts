import { createRoute } from '@hono/zod-openapi'
import { ApiResponseSchema, IdParamSchema } from '@raven/api/common/http/http.schema'
import { CriteriaSchema } from '@raven/api/infrastructure/query/criteria.schema'
import { z } from 'zod'
import { CreateUserPayloadSchema, UpdateUserPayloadSchema, UserSchema } from './users.schema'

export const UsersRoutes = {
  getAll: createRoute({
    method: 'get',
    path: '/',
    request: { query: CriteriaSchema },
    tags: ['User'],
    responses: {
      200: {
        content: {
          'application/json': {
            schema: ApiResponseSchema(z.array(UserSchema)),
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
            schema: ApiResponseSchema(UserSchema),
          },
        },
        description: 'The requested user',
      },
      404: {
        content: {
          'application/json': {
            schema: ApiResponseSchema(
              z.object({
                message: z.string(),
              }),
            ),
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
            schema: ApiResponseSchema(UserSchema),
          },
        },
        description: 'User created',
      },
      400: {
        content: {
          'application/json': {
            schema: ApiResponseSchema(
              z.object({ message: z.string() }),
            ),
          },
        },
        description: 'Invalid data',
      },
      409: {
        content: {
          'application/json': {
            schema: ApiResponseSchema(
              z.object({ message: z.string() }),
            ),
          },
        },
        description: 'User already exists',
      },
      500: {
        content: {
          'application/json': {
            schema: ApiResponseSchema(
              z.object({ message: z.string() }),
            ),
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
            schema: ApiResponseSchema(UserSchema),
          },
        },
        description: 'User updated',
      },
      400: {
        content: {
          'application/json': {
            schema: ApiResponseSchema(
              z.object({ message: z.string() }),
            ),
          },
        },
        description: 'Invalid data',
      },
      404: {
        content: {
          'application/json': {
            schema: ApiResponseSchema(
              z.object({ message: z.string() }),
            ),
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
      200: {
        content: {
          'application/json': {
            schema: ApiResponseSchema(UserSchema),
          },
        },
        description: 'User deleted',
      },
      404: {
        content: {
          'application/json': {
            schema: ApiResponseSchema(
              z.object({ message: z.string() }),
            ),
          },
        },
        description: 'User not found',
      },
    },
  }),
}
