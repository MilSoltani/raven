import { extendZodWithOpenApi, z } from '@hono/zod-openapi'
import { zodExceptionFactory } from '@raven/api/common/http'
import { sessionsCodesMap } from './sessions.codes'

const throwException = zodExceptionFactory(sessionsCodesMap)

extendZodWithOpenApi(z)

export const SessionSchema = z.object({
  id: z.number(throwException('SESSION_ID_REQUIRED'))
    .int(throwException('SESSION_ID_INVALID')),

  userId: z.number(throwException('USER_ID_REQUIRED'))
    .int(throwException('USER_ID_INVALID')),

  refreshTokenHash: z.string(throwException('REFRESH_TOKEN_HASH_REQUIRED'))
    .min(1, throwException('REFRESH_TOKEN_HASH_REQUIRED')),

  isRevoked: z.boolean(throwException('IS_REVOKED_REQUIRED')),

  expiresAt: z.coerce.number(throwException('EXPIRES_AT_REQUIRED')),

  createdAt: z.coerce.number(throwException('CREATED_AT_REQUIRED')),
}).openapi('Session')

export const CreateSessionPayloadSchema = SessionSchema.omit({
  id: true,
  createdAt: true,
  isRevoked: true,
}).openapi('CreateSession')

export const UpdateSessionPayloadSchema = SessionSchema.pick({
  refreshTokenHash: true,
  isRevoked: true,
  expiresAt: true,
})
  .partial()
  .openapi('UpdateSession')

export type Session = z.infer<typeof SessionSchema>
export type CreateSessionPayload = z.infer<typeof CreateSessionPayloadSchema>
export type UpdateSessionPayload = z.infer<typeof UpdateSessionPayloadSchema>
