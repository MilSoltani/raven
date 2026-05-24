import { extendZodWithOpenApi, z } from '@hono/zod-openapi'
import { zodExceptionFactory } from '@raven/api/common/http'
import { authMessages } from './auth.messages'

const throwException = zodExceptionFactory(authMessages)

extendZodWithOpenApi(z)

const emailSchema = z
  .email(throwException('EMAIL_INVALID'))
  .min(5, throwException('EMAIL_REQUIRED'))
  .max(255, throwException('EMAIL_TOO_LONG'))

const passwordSchema = z
  .string(throwException('PASSWORD_REQUIRED'))
  .min(8, throwException('PASSWORD_TOO_SHORT'))
  .max(255, throwException('PASSWORD_TOO_LONG'))

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
    .min(1, throwException('NAME_REQUIRED'))
    .max(255, throwException('NAME_TOO_LONG')),
  email: emailSchema,
  password: passwordSchema,
}).openapi('SignupPayload')

export type AuthUser = z.infer<typeof AuthUserSchema>
export type AuthUserInternal = z.infer<typeof AuthUserInternalSchema>
export type SigninPayload = z.infer<typeof SigninPayloadSchema>
export type SignupPayload = z.infer<typeof SignupPayloadSchema>
