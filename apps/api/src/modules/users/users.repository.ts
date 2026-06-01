import type { PaginatedResult } from '@xenon/api/infrastructure/database'
import type { UserOrderByWithRelationInput, UserSelect, UserWhereInput } from '@xenon/api/infrastructure/database/generated/prisma/models'
import type { PrismaClient } from '@xenon/api/infrastructure/database/prisma'
import type { PrismaPagination } from '@xenon/api/infrastructure/query'
import type { CreateUserPayload, UpdateUserPayload, User } from './users.schema'
import { paginatePrisma } from '@xenon/api/infrastructure/database'

export function createUsersRepository(prisma: PrismaClient) {
  const getAll = async (
    whereInput: UserWhereInput | undefined,
    orderByInput: UserOrderByWithRelationInput | undefined,
    paginationInput: PrismaPagination,
    selectInput: UserSelect | undefined,
  ): Promise<PaginatedResult<User>> => {
    return paginatePrisma({
      model: prisma.user,
      where: whereInput,
      orderBy: orderByInput,
      select: selectInput,
      pagination: paginationInput,
    })
  }

  const getById = async (id: number): Promise<User | null> => {
    return prisma.user.findUnique({
      where: { id },
      omit: { password: true },
    })
  }

  const create = async (data: CreateUserPayload): Promise<User> => {
    return prisma.user.create({
      data: {
        ...data,
        createdAt: new Date(),
      },
      omit: { password: true },
    })
  }

  const update = async (
    id: number,
    data: UpdateUserPayload,
  ): Promise<User> => {
    return prisma.user.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
      omit: { password: true },
    })
  }

  const remove = async (id: number): Promise<User> => {
    return prisma.user.delete({
      where: { id },
      omit: { password: true },
    })
  }

  return {
    getAll,
    getById,
    create,
    update,
    delete: remove,
  }
}

export type UsersRepository = ReturnType<typeof createUsersRepository>
