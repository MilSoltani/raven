import { extendZodWithOpenApi, z } from '@hono/zod-openapi'
import { usersResponseKeys } from './users-response.keys'

extendZodWithOpenApi(z)

export const UserSchema = z.object({
  id: z.number().int(),

  name: z.string(usersResponseKeys.validation.nameRequired)
    .min(1, usersResponseKeys.validation.nameRequired)
    .max(255, usersResponseKeys.validation.nameTooLong),

  email: z.email(usersResponseKeys.validation.emailInvalid)
    .min(5, usersResponseKeys.validation.emailInvalid)
    .max(255, usersResponseKeys.validation.emailInvalid),

  updatedAt: z.coerce.number(usersResponseKeys.validation.updatedAtInvalid).nullable(),

  createdAt: z.coerce.number(usersResponseKeys.validation.createdAtInvalid),
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
