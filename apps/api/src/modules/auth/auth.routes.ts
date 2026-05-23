import { createRoute } from '@hono/zod-openapi'
import { ErrorSchema } from '@raven/api/common/openapi/openapi.schema'
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
            schema: AuthUserSchema,
          },
        },
        description: 'Authenticated user',
      },
      401: {
        content: {
          'application/json': {
            schema: ErrorSchema,
          },
        },
        description: 'Unauthorized',
      },
      422: {
        content: {
          'application/json': {
            schema: ErrorSchema,
          },
        },
        description: 'Validation error',
      },
      429: {
        content: {
          'application/json': {
            schema: ErrorSchema,
          },
        },
        description: 'Too many requests',
      },
      500: {
        content: {
          'application/json': {
            schema: ErrorSchema,
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
            schema: AuthUserSchema,
          },
        },
        description: 'User created and authenticated',
      },
      409: {
        content: {
          'application/json': {
            schema: ErrorSchema,
          },
        },
        description: 'Conflict',
      },
      422: {
        content: {
          'application/json': {
            schema: ErrorSchema,
          },
        },
        description: 'Validation error',
      },
      500: {
        content: {
          'application/json': {
            schema: ErrorSchema,
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
            schema: AuthUserSchema,
          },
        },
        description: 'Session refreshed',
      },
      401: {
        content: {
          'application/json': {
            schema: ErrorSchema,
          },
        },
        description: 'Unauthorized',
      },
      500: {
        content: {
          'application/json': {
            schema: ErrorSchema,
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
            schema: AuthUserSchema,
          },
        },
        description: 'Logged out successfully',
      },
      401: {
        content: {
          'application/json': {
            schema: ErrorSchema,
          },
        },
        description: 'Unauthorized',
      },
      500: {
        content: {
          'application/json': {
            schema: ErrorSchema,
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
            schema: AuthUserSchema,
          },
        },
        description: 'Current authenticated user',
      },
      401: {
        content: {
          'application/json': {
            schema: ErrorSchema,
          },
        },
        description: 'Unauthorized',
      },
      500: {
        content: {
          'application/json': {
            schema: ErrorSchema,
          },
        },
        description: 'Server error',
      },
    },
  }),
}
