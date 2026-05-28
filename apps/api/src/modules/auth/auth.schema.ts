import { extendZodWithOpenApi, z } from '@hono/zod-openapi'

extendZodWithOpenApi(z)

const emailSchema = z
  .email('EMAIL_INVALID')
  .min(5, 'EMAIL_REQUIRED')
  .max(255, 'EMAIL_TOO_LONG')

const passwordSchema = z
  .string('PASSWORD_REQUIRED')
  .min(8, 'PASSWORD_TOO_SHORT')
  .max(255, 'PASSWORD_TOO_LONG')

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
    .min(1, 'NAME_REQUIRED')
    .max(255, 'NAME_TOO_LONG'),
  email: emailSchema,
  password: passwordSchema,
}).openapi('SignupPayload')

export type AuthUser = z.infer<typeof AuthUserSchema>
export type AuthUserInternal = z.infer<typeof AuthUserInternalSchema>
export type SigninPayload = z.infer<typeof SigninPayloadSchema>
export type SignupPayload = z.infer<typeof SignupPayloadSchema>
