import { z } from 'zod'

const schema = z.object({
	VITE_ENV: z.enum(['development', 'production', 'test']),
	VITE_API_URL: z.url(),
})

const parsed = schema.safeParse(import.meta.env)

if (!parsed.success) {
	throw new Error('Invalid env variables')
}

export const env = parsed.data
