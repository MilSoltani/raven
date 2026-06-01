import { config } from '@xenon/api/infrastructure/config/config'
import { createPrismaClient } from '@xenon/api/infrastructure/database/prisma'
import { createAuthModule } from '@xenon/api/modules/auth/auth.module'
import { createTicketsModule } from '@xenon/api/modules/tickets'
import { createUsersModule } from '@xenon/api/modules/users'

export const prisma = createPrismaClient(config)
export const authModule = createAuthModule(prisma)
export const usersModule = createUsersModule(prisma)
export const ticketsModule = createTicketsModule(prisma)
