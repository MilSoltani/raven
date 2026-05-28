import { extendZodWithOpenApi, z } from '@hono/zod-openapi'

extendZodWithOpenApi(z)

export const SessionSchema = z.object({
  id: z.number('SESSION_ID_REQUIRED')
    .int('SESSION_ID_INVALID'),

  userId: z.number('USER_ID_REQUIRED')
    .int('USER_ID_INVALID'),

  refreshTokenHash: z.string('REFRESH_TOKEN_HASH_REQUIRED')
    .min(1, 'REFRESH_TOKEN_HASH_REQUIRED'),

  isRevoked: z.boolean('IS_REVOKED_REQUIRED'),

  expiresAt: z.coerce.number('EXPIRES_AT_REQUIRED'),

  createdAt: z.coerce.number('CREATED_AT_REQUIRED'),
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
