import { createRoute } from '@hono/zod-openapi'
import { ApiResponseSchema } from '@raven/api/common/http/http.schema'
import { z } from 'zod'
import { AuthUserSchema, SigninPayloadSchema, SignupPayloadSchema } from './auth.schema'

export const AuthRoutes = {
  signin: createRoute({
    method: 'post',
    path: '/signin',
    tags: ['Auth'],
    request: {
      body: {
        content: {
          'application/json': {
            schema: SigninPayloadSchema,
          },
        },
        description: 'Signin credentials',
      },
    },
    responses: {
      200: {
        content: {
          'application/json': {
            schema: ApiResponseSchema(AuthUserSchema),
          },
        },
        description: 'Authenticated user',
      },
      401: {
        content: {
          'application/json': {
            schema: ApiResponseSchema(
              z.object({ message: z.string() }),
            ),
          },
        },
        description: 'Unauthorized',
      },
      422: {
        content: {
          'application/json': {
            schema: ApiResponseSchema(
              z.object({ message: z.string() }),
            ),
          },
        },
        description: 'Validation error',
      },
      429: {
        content: {
          'application/json': {
            schema: ApiResponseSchema(
              z.object({ message: z.string() }),
            ),
          },
        },
        description: 'Too many requests',
      },
      500: {
        content: {
          'application/json': {
            schema: ApiResponseSchema(
              z.object({ message: z.string() }),
            ),
          },
        },
        description: 'Server error',
      },
    },
  }),

  signup: createRoute({
    method: 'post',
    path: '/signup',
    tags: ['Auth'],
    request: {
      body: {
        content: {
          'application/json': {
            schema: SignupPayloadSchema,
          },
        },
        description: 'Signup data',
      },
    },
    responses: {
      201: {
        content: {
          'application/json': {
            schema: ApiResponseSchema(AuthUserSchema),
          },
        },
        description: 'User created and authenticated',
      },
      409: {
        content: {
          'application/json': {
            schema: ApiResponseSchema(
              z.object({ message: z.string() }),
            ),
          },
        },
        description: 'Conflict',
      },
      422: {
        content: {
          'application/json': {
            schema: ApiResponseSchema(
              z.object({ message: z.string() }),
            ),
          },
        },
        description: 'Validation error',
      },
      500: {
        content: {
          'application/json': {
            schema: ApiResponseSchema(
              z.object({ message: z.string() }),
            ),
          },
        },
        description: 'Server error',
      },
    },
  }),

  refresh: createRoute({
    method: 'post',
    path: '/refresh',
    tags: ['Auth'],
    responses: {
      200: {
        content: {
          'application/json': {
            schema: ApiResponseSchema(AuthUserSchema),
          },
        },
        description: 'Session refreshed',
      },
      401: {
        content: {
          'application/json': {
            schema: ApiResponseSchema(
              z.object({ message: z.string() }),
            ),
          },
        },
        description: 'Unauthorized',
      },
      500: {
        content: {
          'application/json': {
            schema: ApiResponseSchema(
              z.object({ message: z.string() }),
            ),
          },
        },
        description: 'Server error',
      },
    },
  }),

  signout: createRoute({
    method: 'post',
    path: '/signout',
    tags: ['Auth'],
    responses: {
      200: {
        content: {
          'application/json': {
            schema: ApiResponseSchema(AuthUserSchema),
          },
        },
        description: 'Logged out successfully',
      },
      401: {
        content: {
          'application/json': {
            schema: ApiResponseSchema(
              z.object({ message: z.string() }),
            ),
          },
        },
        description: 'Unauthorized',
      },
      500: {
        content: {
          'application/json': {
            schema: ApiResponseSchema(
              z.object({ message: z.string() }),
            ),
          },
        },
        description: 'Server error',
      },
    },
  }),

  me: createRoute({
    method: 'get',
    path: '/me',
    tags: ['Auth'],
    responses: {
      200: {
        content: {
          'application/json': {
            schema: ApiResponseSchema(AuthUserSchema),
          },
        },
        description: 'Current authenticated user',
      },
      401: {
        content: {
          'application/json': {
            schema: ApiResponseSchema(
              z.object({ message: z.string() }),
            ),
          },
        },
        description: 'Unauthorized',
      },
      500: {
        content: {
          'application/json': {
            schema: ApiResponseSchema(
              z.object({ message: z.string() }),
            ),
          },
        },
        description: 'Server error',
      },
    },
  }),
}
