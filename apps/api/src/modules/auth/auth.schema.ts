import { extendZodWithOpenApi, z } from '@hono/zod-openapi'

extendZodWithOpenApi(z)

export const AuthUserSchema = z.object({
  id: z.number().int(),
  email: z.email().max(255),
}).openapi('AuthUser')

export const AuthUserInternalSchema = AuthUserSchema
  .extend({
    password: z.string().min(8).max(255).nullable(),
  })

export const LoginPayloadSchema = z.object({
  email: z.email().max(255),
  password: z.string().min(8).max(255),
}).openapi('LoginPayload')

export const SignupPayloadSchema = z.object({
  name: z.string().min(1).max(255),
  email: z.email().max(255),
  password: z.string().min(8).max(255),
}).openapi('SignupPayload')

export type AuthUser = z.infer<typeof AuthUserSchema>
export type AuthUserInternal = z.infer<typeof AuthUserInternalSchema>
export type LoginPayload = z.infer<typeof LoginPayloadSchema>
export type SignupPayload = z.infer<typeof SignupPayloadSchema>
