import type { Config } from '@api/infrastructure/config/config'
import type { JWTPayload } from 'hono/utils/jwt/types'
import { InvalidOrExpiredTokenException } from '@api/infrastructure/errors/exceptions'
import { sign, verify } from 'hono/jwt'

type AuthPayload = JWTPayload & {
  sub: number
  email: string
}

export function createJwtUtil(config: Config) {
  async function generateAccessToken(sub: number, email: string): Promise<string> {
    const iat = Math.floor(Date.now() / 1000)
    const exp = iat + config.JWT_ACCESS_EXPIRY_SECONDS

    const payload = { sub, email, iat, exp }

    return await sign(
      payload,
      config.JWT_ACCESS_TOKEN_SECRET,
      'HS256',
    )
  }

  async function generateRefreshToken(sub: number, email: string): Promise<string> {
    const iat = Math.floor(Date.now() / 1000)
    const exp = iat + config.JWT_REFRESH_EXPIRY_SECONDS

    const payload = { sub, email, iat, exp }

    return await sign(
      payload,
      config.JWT_REFRESH_TOKEN_SECRET,
      'HS256',
    )
  }

  async function verifyAccessToken(token: string): Promise<AuthPayload> {
    try {
      return await verify(
        token,
        config.JWT_ACCESS_TOKEN_SECRET,
        'HS256',
      ) as AuthPayload
    }
    catch {
      throw new InvalidOrExpiredTokenException()
    }
  }

  async function verifyRefreshToken(token: string): Promise<AuthPayload> {
    try {
      return await verify(
        token,
        config.JWT_REFRESH_TOKEN_SECRET,
        'HS256',
      ) as AuthPayload
    }
    catch {
      throw new InvalidOrExpiredTokenException()
    }
  }

  function getAccessTokenExpiresAt() {
    return new Date(Date.now() + config.JWT_ACCESS_EXPIRY_SECONDS * 1000)
  }

  function getRefreshTokenExpiresAt() {
    return new Date(Date.now() + config.JWT_REFRESH_EXPIRY_SECONDS * 1000)
  }

  return {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
    getAccessTokenExpiresAt,
    getRefreshTokenExpiresAt,
  }
}

export type JwtUtil = ReturnType<typeof createJwtUtil>
