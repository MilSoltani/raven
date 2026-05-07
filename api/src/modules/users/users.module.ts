import type { UserWhereInput } from '@api/infrastructure/database/generated/prisma/models'
import type { PrismaClient } from '@api/infrastructure/database/prisma'
import { createFilterTransformer } from '@api/infrastructure/query'
import { createUsersHandler } from './users.handler'
import { createUsersRepository } from './users.repository'
import { createUsersService } from './users.service'

export function createUsersModule(prisma: PrismaClient) {
  const filterTransformer = createFilterTransformer<UserWhereInput>({
    allowedPaths: ['name'],
    maxDepth: 3,
  })

  const repository = createUsersRepository(prisma)
  const service = createUsersService(repository, filterTransformer)
  const handler = createUsersHandler(service)

  return { service, handler }
}

export type UsersModule = ReturnType<typeof createUsersModule>
