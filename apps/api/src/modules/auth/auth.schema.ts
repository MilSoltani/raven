import { extendZodWithOpenApi, z } from '@hono/zod-openapi'

extendZodWithOpenApi(z)

const emailSchema = z.email({ error: 'EMAIL_INVALID' })
  .min(5, { error: 'EMAIL_REQUIRED' })
  .max(255, { error: 'EMAIL_TOO_LONG' })

const passwordSchema = z.string({ error: 'PASSWORD_REQUIRED' })
  .min(8, { error: 'PASSWORD_TOO_SHORT' })
  .max(255, { error: 'PASSWORD_TOO_LONG' })

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
  name: z.string().min(1).max(255),
  email: emailSchema,
  password: passwordSchema,
}).openapi('SignupPayload')

export type AuthUser = z.infer<typeof AuthUserSchema>
export type AuthUserInternal = z.infer<typeof AuthUserInternalSchema>
export type SigninPayload = z.infer<typeof SigninPayloadSchema>
export type SignupPayload = z.infer<typeof SignupPayloadSchema>
