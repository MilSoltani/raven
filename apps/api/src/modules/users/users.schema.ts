import { extendZodWithOpenApi, z } from '@hono/zod-openapi'
import { usersResponseCode } from './users.events'

extendZodWithOpenApi(z)

export const UserSchema = z.object({
  id: z.number().int(),

  name: z.string()
    .min(1, { error: usersResponseCode('NAME_REQUIRED') })
    .max(255, { error: usersResponseCode('NAME_TOO_LONG') }),

  email: z.email({ error: usersResponseCode('EMAIL_INVALID') })
    .min(5, { error: usersResponseCode('EMAIL_REQUIRED') })
    .max(255, { error: usersResponseCode('EMAIL_TOO_LONG') }),

  updatedAt: z.coerce.number({ error: 'UPDATED_AT_INVALID' }).nullable(),
  createdAt: z.coerce.number({ error: 'CREATED_AT_REQUIRED' }),
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
