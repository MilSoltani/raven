import { extendZodWithOpenApi, z } from '@hono/zod-openapi'

extendZodWithOpenApi(z)

export const UserSchema = z.object({
  id: z.number().int(),
  name: z.string()
    .min(1, { error: 'NAME_REQUIRED' })
    .max(255, { error: 'NAME_TOO_LONG' }),
  email: z.email({ error: 'EMAIL_INVALID' })
    .min(5, { error: 'EMAIL_REQUIRED' })
    .max(255, { error: 'EMAIL_TOO_LONG' }),
  updatedAt: z.coerce.number().nullable(),
  createdAt: z.coerce.number(),
})

export const CreateUserPayloadSchema = UserSchema.omit({
  id: true,
  updatedAt: true,
  createdAt: true,
})

export const UpdateUserPayloadSchema = CreateUserPayloadSchema.partial()

export type User = z.infer<typeof UserSchema>
export type CreateUserPayload = z.infer<typeof CreateUserPayloadSchema>
export type UpdateUserPayload = z.infer<typeof UpdateUserPayloadSchema>
