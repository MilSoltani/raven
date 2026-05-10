import { extendZodWithOpenApi, z } from '@hono/zod-openapi'

extendZodWithOpenApi(z)

export const AuthUserSchema = z.object({
  id: z.number().int(),
  name: z.string().min(1).max(255),
  email: z.email().max(255),
  password: z.string().min(8).max(255).nullable().optional(),
}).openapi('AuthUser')

export const LoginPayloadSchema = z.object({
  email: z.email().max(255),
  password: z.string().min(8).max(255),
}).openapi('LoginPayload')

export const SignupPayloadSchema = z.object({
  name: z.string().min(1).max(255),
  email: z.email().max(255),
  password: z.string().min(8).max(255),
}).openapi('SignupPayload')

export const AuthResponseSchema = z.object({
  id: z.number(),
  email: z.email(),
}).openapi('AuthResponse')

export const LogOutResponseSchema = z.object({
  message: z.string(),
}).openapi('LogOutResponse')

export type AuthUser = z.infer<typeof AuthUserSchema>
export type LoginPayload = z.infer<typeof LoginPayloadSchema>
export type SignupPayload = z.infer<typeof SignupPayloadSchema>
export type AuthResponse = z.infer<typeof AuthResponseSchema>
