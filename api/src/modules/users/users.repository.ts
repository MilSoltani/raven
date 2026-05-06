import type { PrismaClient } from '@api/infrastructure/database/generated/prisma/internal/class'
import type { CreateUserPayload, UpdateUserPayload, User } from './users.schema'

export function createUsersRepository(prisma: PrismaClient) {
  const getAll = async (): Promise<User[]> => {
    return prisma.user.findMany({
      omit: { password: true },
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
