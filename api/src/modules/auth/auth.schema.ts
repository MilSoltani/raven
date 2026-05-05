import z from 'zod'

export const LoginPayloadSchema = z.object({
  email: z.email().max(255),
  password: z.string().min(8).max(255),
})

export const SignupPayloadSchema = z.object({
  name: z.string().min(1).max(255),
  email: z.email().max(255),
  password: z.string().min(8).max(255),
})

export const AuthResponseSchema = z.object({
  id: z.number(),
  email: z.email(),
})

export const LogOutResponseSchema = z.object({
  message: z.string(),
})

export type LoginPayload = z.infer<typeof LoginPayloadSchema>
export type SignupPayload = z.infer<typeof SignupPayloadSchema>
