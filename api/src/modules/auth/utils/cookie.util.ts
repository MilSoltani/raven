import type { Config } from '@api/infrastructure/config/config'
import type { Context } from 'hono'
import { InvalidOrExpiredTokenException } from '@api/infrastructure/errors/exceptions'
import { getCookie, setCookie } from 'hono/cookie'

export function createCookieUtil(config: Config) {
  const secure = config.NODE_ENV === 'production'
  const sameSite = secure ? 'Strict' : 'Lax'

  async function createAccessToken(c: Context, token: string) {
    setCookie(c, 'accessToken', token, {
      httpOnly: true,
      secure,
      sameSite,
      path: '/',
      maxAge: config.JWT_ACCESS_EXPIRY_SECONDS,
    })
  }

  async function createRefreshToken(c: Context, token: string) {
    setCookie(c, 'refreshToken', token, {
      httpOnly: true,
      secure,
      sameSite,
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
      throw new InvalidOrExpiredTokenException()
    }

    return refreshToken
  }

  function clearTokens(c: Context) {
    setCookie(c, 'accessToken', '', {
      httpOnly: true,
      secure,
      sameSite,
      path: '/',
      maxAge: 0,
    })

    setCookie(c, 'refreshToken', '', {
      httpOnly: true,
      secure,
      sameSite,
      path: '/auth',
      maxAge: 0,
    })
  }

  return {
    createAccessToken,
    createRefreshToken,
    getAccessToken,
    getRefreshToken,
    clearTokens,
  }
}

export type CookieUtil = ReturnType<typeof createCookieUtil>
