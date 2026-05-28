import { extendZodWithOpenApi, z } from '@hono/zod-openapi'

extendZodWithOpenApi(z)

export const UserSchema = z.object({
  id: z.number().int(),

  name: z.string('NAME_REQUIRED')
    .min(1, 'NAME_REQUIRED')
    .max(255, 'NAME_TOO_LONG'),

  email: z.email('EMAIL_INVALID')
    .min(5, 'EMAIL_REQUIRED')
    .max(255, 'EMAIL_TOO_LONG'),

  updatedAt: z.coerce.number('UPDATED_AT_INVALID').nullable(),

  createdAt: z.coerce.number('CREATED_AT_REQUIRED'),
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
