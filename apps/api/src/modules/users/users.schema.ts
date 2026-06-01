import z from 'zod'

export const UserSchema = z.object({
  id: z.number().int(),

  name: z.string('users.validation.nameRequired')
    .min(1, 'users.validation.nameRequired')
    .max(255, 'users.validation.nameTooLong'),

  email: z.email('users.validation.emailInvalid')
    .min(5, 'users.validation.emailInvalid')
    .max(255, 'users.validation.emailInvalid'),

  createdAt: z.date(),
  updatedAt: z.date().nullable(),
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
