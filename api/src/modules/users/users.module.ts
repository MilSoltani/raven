import type { UserOrderByWithRelationInput, UserWhereInput } from '@api/infrastructure/database/generated/prisma/models'
import type { PrismaClient } from '@api/infrastructure/database/prisma'
import { createFilterTransformer, createPaginationTransformer, createSortTransformer } from '@api/infrastructure/query'
import { createUsersHandler } from './users.handler'
import { createUsersRepository } from './users.repository'
import { createUsersService } from './users.service'

export function createUsersModule(prisma: PrismaClient) {
  const filterTransformer = createFilterTransformer<UserWhereInput>({
    allowedPaths: ['name'],
    maxDepth: 3,
  })

  const sortTransformer = createSortTransformer<UserOrderByWithRelationInput>({
    allowedPaths: ['name'],
    maxDepth: 2,
  })

  const paginationTransformer = createPaginationTransformer()

  const repository = createUsersRepository(prisma)
  const service = createUsersService(repository, filterTransformer, sortTransformer, paginationTransformer)
  const handler = createUsersHandler(service)

  return { service, handler }
}

export type UsersModule = ReturnType<typeof createUsersModule>
