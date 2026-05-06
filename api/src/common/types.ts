import type { JWTPayload } from 'hono/utils/jwt/types'

export interface AppEnv {
  Variables: {
    userId: number
  }
}

export type AuthPayload = JWTPayload & {
  sub: number
  email: string
}
