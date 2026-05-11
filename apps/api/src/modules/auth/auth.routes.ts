import { createRoute } from '@hono/zod-openapi'
import { jsonContent, jsonError } from '@raven/api/common/routes.util'
import { AuthUserSchema, SigninPayloadSchema, SignupPayloadSchema } from './auth.schema'

export const AuthRoutes = {
  signin: createRoute({
    method: 'post',
    path: '/signin',
    tags: ['Auth'],
    request: {
      body: jsonContent(SigninPayloadSchema, 'Signin credentials'),
    },
    responses: {
      200: jsonContent(AuthUserSchema, 'Authenticated user'),
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
      201: jsonContent(AuthUserSchema, 'User created and authenticated'),
      409: jsonError('Conflict'),
      422: jsonError('Validation error'),
      500: jsonError('Server error'),
    },
  }),

  refresh: createRoute({
    method: 'post',
    path: '/refresh',
    tags: ['Auth'],
    responses: {
      200: jsonContent(AuthUserSchema, 'Session refreshed'),
      401: jsonError('Unauthorized'),
      500: jsonError('Server error'),
    },
  }),

  logout: createRoute({
    method: 'post',
    path: '/logout',
    tags: ['Auth'],
    responses: {
      200: jsonContent(AuthUserSchema, 'Logged out successfully'),
      401: jsonError('Unauthorized'),
      500: jsonError('Server error'),
    },
  }),

  me: createRoute({
    method: 'get',
    path: '/me',
    tags: ['Auth'],
    responses: {
      200: jsonContent(AuthUserSchema, 'Current authenticated user'),
      401: jsonError('Unauthorized'),
      500: jsonError('Server error'),
    },
  }),
}
