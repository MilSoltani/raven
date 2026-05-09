import type { UserOrderByWithRelationInput, UserSelect, UserWhereInput } from '@raven/api/infrastructure/database/generated/prisma/models'
import type { PrismaClient } from '@raven/api/infrastructure/database/prisma'
import { createFilterTransformer, createPaginationTransformer, createSelectTransformer, createSortTransformer } from '@raven/api/infrastructure/query'
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

  const selectTransformer = createSelectTransformer<UserSelect>({
    allowedColumns: [
      'id',
      'name',
      'email',
      'createdAt',
      'updatedAt',
    ],
    allowedRelations: {},
    requiredColumns: ['id'],
  })

  const repository = createUsersRepository(prisma)
  const service = createUsersService(
    repository,
    filterTransformer,
    sortTransformer,
    paginationTransformer,
    selectTransformer,
  )
  const handler = createUsersHandler(service)

  return { service, handler }
}

export type UsersModule = ReturnType<typeof createUsersModule>
