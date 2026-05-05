import { z } from 'zod'

export const UserSchema = z.object({
  id: z.number().int(),
  name: z.string().max(255),
  email: z.string().email().max(255),
  password: z.string().max(255).nullable().optional(),
  updatedAt: z.date(),
  createdAt: z.date(),
})

export const CreateUserPayloadSchema = UserSchema.omit({
  id: true,
  updatedAt: true,
  createdAt: true,
  password: true,
})

export const UpdateUserPayloadSchema = CreateUserPayloadSchema.partial()

export type User = z.infer<typeof UserSchema>
export type CreateUserPayload = z.infer<typeof CreateUserPayloadSchema>
export type UpdateUserPayload = z.infer<typeof UpdateUserPayloadSchema>
