import type { UserOrderByWithRelationInput, UserSelect, UserWhereInput } from '@raven/api/infrastructure/database/generated/prisma/models'
import type { PrismaClient } from '@raven/api/infrastructure/database/prisma'
import type { PrismaPagination } from '@raven/api/infrastructure/query'
import type { CreateUserPayload, UpdateUserPayload, User } from '@raven/schemas'

export function createUsersRepository(prisma: PrismaClient) {
  const getAll = async (
    whereInput: UserWhereInput | undefined,
    orderByInput: UserOrderByWithRelationInput | undefined,
    paginationInput: PrismaPagination,
    selectInput: UserSelect | undefined,
  ): Promise<User[]> => {
    return prisma.user.findMany({
      select: selectInput,
      where: whereInput,
      orderBy: orderByInput,
      ...paginationInput,
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
      data,
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
