import { z } from 'zod'

export const SessionSchema = z.object({
  id: z.number().int(),
  userId: z.number().int(),

  familyId: z.string().uuid(),
  refreshTokenHash: z.string(),

  isUsed: z.boolean(),
  isRevoked: z.boolean(),

  expiresAt: z.date(),
  createdAt: z.date(),
})

export const CreateSessionPayloadSchema = SessionSchema.omit({
  id: true,
  createdAt: true,
  isUsed: true,
  isRevoked: true,
})

export const UpdateSessionPayloadSchema = SessionSchema
  .pick({
    isUsed: true,
    isRevoked: true,
    expiresAt: true,
  })
  .partial()

export type Session = z.infer<typeof SessionSchema>
export type CreateSessionPayload = z.infer<typeof CreateSessionPayloadSchema>
export type UpdateSessionPayload = z.infer<typeof UpdateSessionPayloadSchema>
