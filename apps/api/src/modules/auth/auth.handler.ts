import type { AppEnv } from '@raven/api/common/types'
import type { AuthService } from './auth.service'
import type { CookieUtil } from './utils/cookie.util'
import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { SigninPayloadSchema, SignupPayloadSchema } from './auth.schema'

export function createAuthHandler(
  authService: AuthService,
  cookieUtil: CookieUtil,
) {
  return new Hono<AppEnv>()

    .post('/signin', zValidator('json', SigninPayloadSchema), async (c) => {
      const { email, password } = c.req.valid('json')

      const { user, accessToken, refreshToken }
        = await authService.signin(email, password)

      cookieUtil.createAccessToken(c, accessToken)
      cookieUtil.createRefreshToken(c, refreshToken)

      return c.json(user, 200)
    })

    .post('/signup', zValidator('json', SignupPayloadSchema), async (c) => {
      const data = c.req.valid('json')

      const { user, accessToken, refreshToken } = await authService.signup(data)

      cookieUtil.createAccessToken(c, accessToken)
      cookieUtil.createRefreshToken(c, refreshToken)

      return c.json(user, 201)
    })

    .post('/refresh', async (c) => {
      const tokenToRefresh = cookieUtil.getRefreshToken(c)

      const { user, accessToken, refreshToken } = await authService.refresh(tokenToRefresh)

      cookieUtil.createAccessToken(c, accessToken)
      cookieUtil.createRefreshToken(c, refreshToken)

      return c.json(user, 200)
    })

    .post('/signout', async (c) => {
      const user = c.var.user

      const refreshToken = cookieUtil.getRefreshToken(c)

      await authService.signout(refreshToken)

      cookieUtil.clearTokens(c)

      return c.json(user, 200)
    })

    .get('/me', (c) => {
      const user = c.var.user

      if (!user) {
        throw new HTTPException(401, { message: 'auth.error.unauthenticated' })
      }

      return c.json(user, 200)
    })
}

export type AuthHandler = ReturnType<typeof createAuthHandler>
