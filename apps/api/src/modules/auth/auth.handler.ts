import type { AppEnv } from '@raven/api/common/types'
import type { AuthService } from './auth.service'
import type { CookieUtil } from './utils/cookie.util'
import { OpenAPIHono } from '@hono/zod-openapi'
import { response } from '@raven/api/common/http'
import { HTTPException } from 'hono/http-exception'
import { AuthRoutes } from './auth.routes'

export function createAuthHandler(
  authService: AuthService,
  cookieUtil: CookieUtil,
) {
  return new OpenAPIHono<AppEnv>()

    .openapi(AuthRoutes.signin, async (c) => {
      const { email, password } = c.req.valid('json')

      const { user, accessToken, refreshToken }
        = await authService.signin(email, password)

      cookieUtil.createAccessToken(c, accessToken)
      cookieUtil.createRefreshToken(c, refreshToken)

      return c.json(response({
        success: true,
        event: 'AUTH_SIGNIN',
        data: user,
      }), 200)
    })

    .openapi(AuthRoutes.signup, async (c) => {
      const data = c.req.valid('json')

      const { user, accessToken, refreshToken } = await authService.signup(data)

      cookieUtil.createAccessToken(c, accessToken)
      cookieUtil.createRefreshToken(c, refreshToken)

      return c.json(response({
        success: true,
        event: 'AUTH_SIGNUP',
        data: user,
      }), 201)
    })

    .openapi(AuthRoutes.refresh, async (c) => {
      const tokenToRefresh = cookieUtil.getRefreshToken(c)

      const { user, accessToken, refreshToken } = await authService.refresh(tokenToRefresh)

      cookieUtil.createAccessToken(c, accessToken)
      cookieUtil.createRefreshToken(c, refreshToken)

      return c.json(response({
        success: true,
        event: 'AUTH_REFRESHED',
        data: user,
      }), 200)
    })

    .openapi(AuthRoutes.signout, async (c) => {
      const refreshToken = cookieUtil.getRefreshToken(c)

      await authService.signout(refreshToken)

      cookieUtil.clearTokens(c)

      return c.json(response({
        success: true,
        event: 'AUTH_SIGNOUT',
        data: c.var.user,
      }), 200)
    })

    .openapi(AuthRoutes.me, async (c) => {
      const user = c.var.user

      if (!user) {
        throw new HTTPException(401, { message: 'Unauthenticated' })
      }

      return c.json(response({
        success: true,
        event: 'AUTH_ME',
        data: user,
      }), 200)
    })
}

export type AuthHandler = ReturnType<typeof createAuthHandler>
