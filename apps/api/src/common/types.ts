import type { Translator } from '@raven/api/infrastructure/i18n'
import type { AuthUser } from '@raven/api/modules/auth'
import type { JWTPayload } from 'hono/utils/jwt/types'
import type { ParsedQs } from 'qs'

export type AppEnv = {
  Variables: {
    user: AuthUser
    query: ParsedQs
    t: Translator
  }
}

export type AuthPayload = JWTPayload & {
  sub: number
  email: string
}
