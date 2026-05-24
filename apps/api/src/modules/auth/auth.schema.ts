import { extendZodWithOpenApi, z } from '@hono/zod-openapi'
import { authResponseCode } from './auth.events'

extendZodWithOpenApi(z)

const emailSchema = z.email({ error: authResponseCode('EMAIL_INVALID') })
  .min(5, { error: authResponseCode('EMAIL_REQUIRED') })
  .max(255, { error: authResponseCode('EMAIL_TOO_LONG') })

const passwordSchema = z.string({ error: authResponseCode('PASSWORD_REQUIRED') })
  .min(8, { error: authResponseCode('PASSWORD_TOO_SHORT') })
  .max(255, { error: authResponseCode('PASSWORD_TOO_LONG') })

export const AuthUserSchema = z.object({
  id: z.number().int(),
  email: emailSchema,
}).openapi('AuthUser')

export const AuthUserInternalSchema = AuthUserSchema
  .extend({
    password: passwordSchema,
  })

export const SigninPayloadSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
}).openapi('SigninPayload')

export const SignupPayloadSchema = z.object({
  name: z.string()
    .min(1, { error: authResponseCode('NAME_REQUIRED') })
    .max(255, { error: authResponseCode('NAME_TOO_LONG') }),
  email: emailSchema,
  password: passwordSchema,
}).openapi('SignupPayload')

export type AuthUser = z.infer<typeof AuthUserSchema>
export type AuthUserInternal = z.infer<typeof AuthUserInternalSchema>
export type SigninPayload = z.infer<typeof SigninPayloadSchema>
export type SignupPayload = z.infer<typeof SignupPayloadSchema>
