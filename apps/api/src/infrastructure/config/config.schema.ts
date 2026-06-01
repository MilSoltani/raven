import { z } from 'zod'

export const ConfigSchema = z.object({
	DATABASE_URL: z.string().min(1),
	NODE_ENV: z.enum(['development', 'production', 'test']),
	JWT_REFRESH_TOKEN_SECRET: z.string().min(1),
	JWT_ACCESS_TOKEN_SECRET: z.string().min(1),
	JWT_ACCESS_EXPIRY_SECONDS: z.coerce.number(),
	JWT_REFRESH_EXPIRY_SECONDS: z.coerce.number(),
})
