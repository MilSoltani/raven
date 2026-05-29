import { extendZodWithOpenApi, z } from '@hono/zod-openapi'
import { authResponseKeys } from './auth-response.keys'

extendZodWithOpenApi(z)

const emailSchema = z
  .email(authResponseKeys.validation.emailInvalid)
  .min(5, authResponseKeys.validation.emailInvalid)
  .max(255, authResponseKeys.validation.emailInvalid)

const passwordSchema = z
  .string(authResponseKeys.validation.passwordRequired)
  .min(8, authResponseKeys.validation.passwordTooShort)
  .max(255, authResponseKeys.validation.passwordTooLong)

export const AuthUserSchema = z.object({
  id: z.number().int(),
  email: emailSchema,
}).openapi('AuthUser')

export const AuthUserInternalSchema = AuthUserSchema.extend({
  password: passwordSchema.nullable(),
})

export const SigninPayloadSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
}).openapi('SigninPayload')

export const SignupPayloadSchema = z.object({
  name: z.string()
    .min(1, authResponseKeys.validation.nameRequired)
    .max(255, authResponseKeys.validation.nameTooLong),
  email: emailSchema,
  password: passwordSchema,
}).openapi('SignupPayload')

export type AuthUser = z.infer<typeof AuthUserSchema>
export type AuthUserInternal = z.infer<typeof AuthUserInternalSchema>
export type SigninPayload = z.infer<typeof SigninPayloadSchema>
export type SignupPayload = z.infer<typeof SignupPayloadSchema>
