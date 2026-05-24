import { extendZodWithOpenApi, z } from '@hono/zod-openapi'
import { zodException } from '@raven/api/common/http'
import { authMessage } from './auth.messages'

extendZodWithOpenApi(z)

const emailSchema = z
  .email(zodException(authMessage('EMAIL_INVALID')))
  .min(5, zodException(authMessage('EMAIL_REQUIRED')))
  .max(255, zodException(authMessage('EMAIL_TOO_LONG')))

const passwordSchema = z
  .string(zodException(authMessage('PASSWORD_REQUIRED')))
  .min(8, zodException(authMessage('PASSWORD_TOO_SHORT')))
  .max(255, zodException(authMessage('PASSWORD_TOO_LONG')))

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
    .min(1, zodException(authMessage('NAME_REQUIRED')))
    .max(255, zodException(authMessage('NAME_TOO_LONG'))),
  email: emailSchema,
  password: passwordSchema,
}).openapi('SignupPayload')

export type AuthUser = z.infer<typeof AuthUserSchema>
export type AuthUserInternal = z.infer<typeof AuthUserInternalSchema>
export type SigninPayload = z.infer<typeof SigninPayloadSchema>
export type SignupPayload = z.infer<typeof SignupPayloadSchema>
