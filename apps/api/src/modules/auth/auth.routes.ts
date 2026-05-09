import { createRoute } from '@hono/zod-openapi'
import { jsonContent, jsonError } from '@raven/api/common/routes.util'
import { AuthResponseSchema, LoginPayloadSchema, LogOutResponseSchema, SignupPayloadSchema } from '@raven/schemas'
import { z } from 'zod'

export const AuthRoutes = {
  login: createRoute({
    method: 'post',
    path: '/login',
    tags: ['Auth'],
    request: {
      body: jsonContent(LoginPayloadSchema, 'Login credentials'),
    },
    responses: {
      200: jsonContent(AuthResponseSchema, 'Authenticated user'),
      401: jsonError('Unauthorized'),
      422: jsonError('Validation error'),
      429: jsonError('Too many requests'),
      500: jsonError('Server error'),
    },
  }),

  signup: createRoute({
    method: 'post',
    path: '/signup',
    tags: ['Auth'],
    request: {
      body: jsonContent(SignupPayloadSchema, 'Signup data'),
    },
    responses: {
      201: jsonContent(AuthResponseSchema, 'User created and authenticated'),
      409: jsonError('Conflict'),
      422: jsonError('Validation error'),
      500: jsonError('Server error'),
    },
  }),

  refresh: createRoute({
    method: 'post',
    path: '/refresh',
    tags: ['Auth'],
    request: {
      headers: z.object({
        cookie: z.string().openapi({
          example: 'refreshToken=abc123',
          description: 'HTTP cookie containing refresh token',
        }),
      }),
    },
    responses: {
      200: jsonContent(AuthResponseSchema, 'Session refreshed'),
      401: jsonError('Unauthorized'),
      500: jsonError('Server error'),
    },
  }),

  logout: createRoute({
    method: 'post',
    path: '/logout',
    tags: ['Auth'],
    request: {
      headers: z.object({
        cookie: z.string().openapi({
          example: 'refreshToken=abc123',
          description: 'HTTP cookie containing refresh token',
        }),
      }),
    },
    responses: {
      200: jsonContent(LogOutResponseSchema, 'Logged out successfully'),
      401: jsonError('Unauthorized'),
      500: jsonError('Server error'),
    },
  }),
}
