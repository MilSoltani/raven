import type { AppEnv } from '@raven/api/common/types'
import type { AuthService } from './auth.service'
import type { CookieUtil } from './utils/cookie.util'
import { OpenAPIHono } from '@hono/zod-openapi'
import { AuthRoutes } from './auth.routes'

export function createAuthHandler(
  authService: AuthService,
  cookieUtil: CookieUtil,
) {
  return new OpenAPIHono<AppEnv>()

    .openapi(AuthRoutes.login, async (c) => {
      const { email, password } = c.req.valid('json')

      const { user, accessToken, refreshToken }
        = await authService.login(email, password)

      cookieUtil.createAccessToken(c, accessToken)
      cookieUtil.createRefreshToken(c, refreshToken)

      return c.json(user, 200)
    })

    .openapi(AuthRoutes.signup, async (c) => {
      const data = c.req.valid('json')

      const { user, accessToken, refreshToken } = await authService.signup(data)

      cookieUtil.createAccessToken(c, accessToken)
      cookieUtil.createRefreshToken(c, refreshToken)

      return c.json(user, 201)
    })

    .openapi(AuthRoutes.refresh, async (c) => {
      const tokenToRefresh = cookieUtil.getRefreshToken(c)

      const { user, accessToken, refreshToken } = await authService.refresh(tokenToRefresh)

      cookieUtil.createAccessToken(c, accessToken)
      cookieUtil.createRefreshToken(c, refreshToken)

      return c.json(user, 200)
    })

    .openapi(AuthRoutes.logout, async (c) => {
      const refreshToken = cookieUtil.getRefreshToken(c)

      await authService.logout(refreshToken)

      cookieUtil.clearTokens(c)

      return c.json(c.var.user, 200)
    })
}
