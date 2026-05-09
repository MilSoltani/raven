import type { JWTPayload } from 'hono/utils/jwt/types'
import type { ParsedQs } from 'qs'

export type AppEnv = {
  Variables: {
    userId: number
    query: ParsedQs

  }
}

export type AuthPayload = JWTPayload & {
  sub: number
  email: string
}
