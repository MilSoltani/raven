import type { AuthUser } from '@xenon/api/modules/auth'
import type { JWTPayload } from 'hono/utils/jwt/types'
import type { ParsedQs } from 'qs'
import z from 'zod'

export type AppEnv = {
  Variables: {
    user: AuthUser
    query: ParsedQs
  }
}

export type AuthPayload = JWTPayload & {
  sub: number
  email: string
}

export const IdParamSchema = z.object({
  id: z.coerce.number().int().positive(),
})
