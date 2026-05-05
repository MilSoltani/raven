import { z } from 'zod'

export const ConfigSchema = z.object({
  DATABASE_URL: z.string().min(1),
  NODE_ENV: z.enum(['development', 'production', 'test']),
  REFRESH_TOKEN_EXPIRY: z.coerce.number(),
})
