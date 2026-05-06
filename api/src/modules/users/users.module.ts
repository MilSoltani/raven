import type { PrismaClient } from '@api/infrastructure/database/prisma'
import { createUsersHandler } from './users.handler'
import { createUsersRepository } from './users.repository'
import { createUsersService } from './users.service'

export function createUsersModule(prisma: PrismaClient) {
  const repository = createUsersRepository(prisma)
  const service = createUsersService(repository)
  const handler = createUsersHandler(service)

  return { service, handler }
}

export type UsersModule = ReturnType<typeof createUsersModule>
