import { z } from '@hono/zod-openapi'

export const SessionSchema = z.object({
  id: z.number().int(),
  userId: z.number().int(),
  refreshTokenHash: z.string(),
  isRevoked: z.boolean(),
  expiresAt: z.coerce.number(),
  createdAt: z.coerce.number(),
})

export const CreateSessionPayloadSchema = SessionSchema.omit({
  id: true,
  createdAt: true,
  isRevoked: true,
})

export const UpdateSessionPayloadSchema = SessionSchema
  .pick({
    refreshTokenHash: true,
    isRevoked: true,
    expiresAt: true,
  })
  .partial()

export type Session = z.infer<typeof SessionSchema>
export type CreateSessionPayload = z.infer<typeof CreateSessionPayloadSchema>
export type UpdateSessionPayload = z.infer<typeof UpdateSessionPayloadSchema>
