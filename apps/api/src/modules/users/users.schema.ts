import { extendZodWithOpenApi, z } from '@hono/zod-openapi'
import { zodExceptionFactory } from '@raven/api/common/http'
import { usersMessages } from './users.messages'

const throwException = zodExceptionFactory(usersMessages)

extendZodWithOpenApi(z)

export const UserSchema = z.object({
  id: z.number().int(),

  name: z.string(throwException('NAME_REQUIRED'))
    .min(1, throwException('NAME_REQUIRED'))
    .max(255, throwException('NAME_TOO_LONG')),

  email: z.email(throwException('EMAIL_INVALID'))
    .min(5, throwException('EMAIL_REQUIRED'))
    .max(255, throwException('EMAIL_TOO_LONG')),

  updatedAt: z.coerce.number(throwException('UPDATED_AT_INVALID')).nullable(),

  createdAt: z.coerce.number(throwException('CREATED_AT_REQUIRED')),
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
