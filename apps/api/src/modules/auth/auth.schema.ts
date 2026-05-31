import z from 'zod'

const emailSchema = z
  .email('auth.validation.emailInvalid')
  .min(5, 'auth.validation.emailInvalid')
  .max(255, 'auth.validation.emailInvalid')

const passwordSchema = z
  .string('auth.validation.passwordRequired')
  .min(8, 'auth.validation.passwordTooShort')
  .max(255, 'auth.validation.passwordTooLong')

export const AuthUserSchema = z.object({
  id: z.number().int(),
  email: emailSchema,
})

export const AuthUserInternalSchema = AuthUserSchema.extend({
  password: passwordSchema.nullable(),
})

export const SigninPayloadSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
})

export const SignupPayloadSchema = z.object({
  name: z.string()
    .min(1, 'auth.validation.nameRequired')
    .max(255, 'auth.validation.nameTooLong'),
  email: emailSchema,
  password: passwordSchema,
})

export type AuthUser = z.infer<typeof AuthUserSchema>
export type AuthUserInternal = z.infer<typeof AuthUserInternalSchema>
export type SigninPayload = z.infer<typeof SigninPayloadSchema>
export type SignupPayload = z.infer<typeof SignupPayloadSchema>
