import { config } from '@raven/api/infrastructure/config/config'
import { createPrismaClient } from '@raven/api/infrastructure/database/prisma'
import { createAuthModule } from '@raven/api/modules/auth/auth.module'
import { createTicketsModule } from '@raven/api/modules/tickets'
import { createUsersModule } from '@raven/api/modules/users'

export const prisma = createPrismaClient(config)
export const authModule = createAuthModule(prisma)
export const usersModule = createUsersModule(prisma)
export const ticketsModule = createTicketsModule(prisma)
