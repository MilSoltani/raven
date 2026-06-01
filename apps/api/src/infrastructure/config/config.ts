import type z from 'zod'
import { dirname, join } from 'node:path'
import { loadEnvFile } from 'node:process'
import { fileURLToPath } from 'node:url'
import { ConfigSchema } from './config.schema'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const envPath = join(__dirname, '../../../.env')

loadEnvFile(envPath)

export const config = ConfigSchema.parse(process.env)
export type Config = z.infer<typeof ConfigSchema>
