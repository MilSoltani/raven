import { extendZodWithOpenApi, z } from '@hono/zod-openapi'

extendZodWithOpenApi(z)

export const UserSchema = z.object({
  id: z.number().int(),
  name: z.string().min(1).max(255),
  email: z.email().max(255),
  password: z.string().min(8).max(255).nullable().optional(),
  updatedAt: z.string(),
  createdAt: z.string(),
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
