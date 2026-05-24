import { extendZodWithOpenApi, z } from '@hono/zod-openapi'
import { zodException } from '@raven/api/common/http'
import { usersResponseCode } from './users.events'

extendZodWithOpenApi(z)

export const UserSchema = z.object({
  id: z.number().int(),

  name: z.string(zodException(usersResponseCode('NAME_REQUIRED')))
    .min(1, zodException(usersResponseCode('NAME_REQUIRED')))
    .max(255, zodException(usersResponseCode('NAME_TOO_LONG'))),

  email: z.email(zodException(usersResponseCode('EMAIL_INVALID')))
    .min(5, zodException(usersResponseCode('EMAIL_REQUIRED')))
    .max(255, zodException(usersResponseCode('EMAIL_TOO_LONG'))),

  updatedAt: z.coerce.number(zodException('UPDATED_AT_INVALID')).nullable(),

  createdAt: z.coerce.number(zodException('CREATED_AT_REQUIRED')),
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
