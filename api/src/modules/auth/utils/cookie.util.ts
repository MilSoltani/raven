import type { Config } from '@api/infrastructure/config/config'
import type { Context } from 'hono'
import { InvalidOrExpiredTokenException } from '@api/infrastructure/errors/exceptions'
import { getCookie, setCookie } from 'hono/cookie'

export function createCookieUtil(config: Config) {
  async function createAccessToken(c: Context, token: string) {
    const secure = config.NODE_ENV === 'production'

    setCookie(c, 'accessToken', token, {
      httpOnly: true,
      secure,
      sameSite: secure ? 'Strict' : 'Lax',
      path: '/',
      maxAge: config.JWT_ACCESS_EXPIRY_SECONDS,
    })
  }

  async function createRefreshToken(c: Context, token: string) {
    const secure = config.NODE_ENV === 'production'

    setCookie(c, 'refreshToken', token, {
      httpOnly: true,
      secure,
      sameSite: secure ? 'Strict' : 'Lax',
      path: '/auth',
      maxAge: config.JWT_REFRESH_EXPIRY_SECONDS,
    })
  }

  function getAccessToken(c: Context): string {
    const accessToken = getCookie(c, 'accessToken')

    if (!accessToken) {
      throw new InvalidOrExpiredTokenException()
    }

    return accessToken
  }

  function getRefreshToken(c: Context): string {
    const refreshToken = getCookie(c, 'refreshToken')

    if (!refreshToken) {
      throw new Error('Invalid or expired refresh token')
    }

    return refreshToken
  }

  return {
    createAccessToken,
    createRefreshToken,
    getAccessToken,
    getRefreshToken,
  }
}

export type CookieUtil = ReturnType<typeof createCookieUtil>
