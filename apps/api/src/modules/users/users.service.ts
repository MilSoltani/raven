import type { PaginatedResult } from '@raven/api/exports'
import type { UserOrderByWithRelationInput, UserSelect, UserWhereInput } from '@raven/api/infrastructure/database/generated/prisma/models'
import type { FilterTransformer, PaginationTransformer, SelectTransformer, SortTransformer } from '@raven/api/infrastructure/query'
import type { ParsedQs } from 'qs'
import type { UsersRepository } from './users.repository'
import type { CreateUserPayload, UpdateUserPayload, User } from './users.schema'
import { TranslatableException } from '@raven/api/infrastructure/errors'
import { InternalException } from '@raven/api/infrastructure/errors/exceptions'

export function createUsersService(
  usersRepository: UsersRepository,
  filterTransformer: FilterTransformer<UserWhereInput>,
  sortTransformer: SortTransformer<UserOrderByWithRelationInput>,
  paginationTransformer: PaginationTransformer,
  selectTransformer: SelectTransformer<UserSelect>,
) {
  return {
    async getAll(query: ParsedQs): Promise<PaginatedResult<User>> {
      const whereInput = filterTransformer.transform(query.filter)
      const orderByInput = sortTransformer.transform(query.sort)
      const paginationInput = paginationTransformer.transform(query.page, query.limit)
      const selectInput = selectTransformer.transform(query.select)

      return await usersRepository.getAll(
        whereInput,
        orderByInput,
        paginationInput,
        selectInput,
      )
    },

    async getById(id: number): Promise<User> {
      const result = await usersRepository.getById(id)

      if (!result)
        throw new TranslatableException(404, 'users', 'NOT_FOUND')

      return result
    },

    async create(data: CreateUserPayload): Promise<User> {
      const result = await usersRepository.create(data)

      if (!result)
        throw new InternalException('User creation')

      return result
    },

    async update(id: number, data: UpdateUserPayload): Promise<User> {
      const result = await usersRepository.update(id, data)

      if (!result)
        throw new TranslatableException(404, 'users', 'NOT_FOUND')

      return result
    },

    async delete(id: number): Promise<User> {
      const result = await usersRepository.delete(id)

      if (!result)
        throw new TranslatableException(404, 'users', 'NOT_FOUND')

      return result
    },
  }
}

export type UsersService = ReturnType<typeof createUsersService>
