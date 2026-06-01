import { PrismaPg } from '@prisma/adapter-pg'
import type { Config } from '../config/config'
import { PrismaClient } from './generated/prisma/client'

export function createPrismaClient(config: Config) {
	const adapter = new PrismaPg({ connectionString: config.DATABASE_URL })

	return new PrismaClient({ adapter })
}

export type { PrismaClient }
