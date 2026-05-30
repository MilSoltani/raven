import type { AuthService } from './auth.service'
import type { CookieUtil } from './utils/cookie.util'
import { responseFactory } from '@raven/api/common/http'
import { apiException } from '@raven/api/common/http/api.exception'
import { honoApp } from '@raven/api/infrastructure/http'
import { AuthRoutes } from './auth.routes'

export function createAuthHandler(
  authService: AuthService,
  cookieUtil: CookieUtil,
) {
  const response = responseFactory()

  return honoApp()

    .openapi(AuthRoutes.signin, async (c) => {
      const { email, password } = c.req.valid('json')

      const { user, accessToken, refreshToken }
        = await authService.signin(email, password)

      cookieUtil.createAccessToken(c, accessToken)
      cookieUtil.createRefreshToken(c, refreshToken)

      return c.json(response({
        messageKey: 'auth.success.signedIn',
        data: user,
      }), 200)
    })

    .openapi(AuthRoutes.signup, async (c) => {
      const data = c.req.valid('json')

      const { user, accessToken, refreshToken } = await authService.signup(data)

      cookieUtil.createAccessToken(c, accessToken)
      cookieUtil.createRefreshToken(c, refreshToken)

      return c.json(response({
        messageKey: 'auth.success.signedUp',
        data: user,
      }), 201)
    })

    .openapi(AuthRoutes.refresh, async (c) => {
      const tokenToRefresh = cookieUtil.getRefreshToken(c)

      const { user, accessToken, refreshToken } = await authService.refresh(tokenToRefresh)

      cookieUtil.createAccessToken(c, accessToken)
      cookieUtil.createRefreshToken(c, refreshToken)

      return c.json(response({
        messageKey: 'auth.success.refreshed',
        data: user,
      }), 200)
    })

    .openapi(AuthRoutes.signout, async (c) => {
      const refreshToken = cookieUtil.getRefreshToken(c)

      await authService.signout(refreshToken)

      cookieUtil.clearTokens(c)

      return c.json(response({
        messageKey: 'auth.success.signedOut',
        data: c.var.user,
      }), 200)
    })

    .openapi(AuthRoutes.me, async (c) => {
      const user = c.var.user

      if (!user) {
        throw apiException('auth.error.unauthenticated', 401)
      }

      return c.json(response({
        messageKey: 'auth.success.me',
        data: user,
      }), 200)
    })
}

export type AuthHandler = ReturnType<typeof createAuthHandler>
