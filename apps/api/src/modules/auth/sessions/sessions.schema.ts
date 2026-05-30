import { extendZodWithOpenApi, z } from '@hono/zod-openapi'

extendZodWithOpenApi(z)

export const SessionSchema = z.object({
  id: z.number(sessionsResponseKeys.validation.idRequired)
    .int(sessionsResponseKeys.validation.idInvalid),

  userId: z.number(sessionsResponseKeys.validation.userIdRequired)
    .int(sessionsResponseKeys.validation.userIdInvalid),

  refreshTokenHash: z.string(sessionsResponseKeys.validation.refreshTokenHashRequired),

  isRevoked: z.boolean(sessionsResponseKeys.validation.isRevokedRequired),

  expiresAt: z.coerce.number(sessionsResponseKeys.validation.expiresAtRequired),

  createdAt: z.coerce.number(sessionsResponseKeys.validation.createdAtRequired),
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
