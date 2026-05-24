import { extendZodWithOpenApi, z } from '@hono/zod-openapi'
import { usersEvent } from './users.events'

extendZodWithOpenApi(z)

export const UserSchema = z.object({
  id: z.number().int(),

  name: z.string()
    .min(1, { error: usersEvent('NAME_REQUIRED') })
    .max(255, { error: usersEvent('NAME_TOO_LONG') }),

  email: z.email({ error: usersEvent('EMAIL_INVALID') })
    .min(5, { error: usersEvent('EMAIL_REQUIRED') })
    .max(255, { error: usersEvent('EMAIL_TOO_LONG') }),

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
