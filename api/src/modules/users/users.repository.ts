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

  const create = async (
    data: CreateUserPayload,
  ): Promise<User> => {
    return prisma.user.create({
      data,
      omit: { password: true },
    })
  }

  const update = async (
    id: number,
    data: UpdateUserPayload,
  ): Promise<User | null> => {
    try {
      return await prisma.user.update({
        where: { id },
        data: {
          ...data,
          updatedAt: new Date(),
        },
        omit: { password: true },
      })
    }
    catch {
      return null
    }
  }

  const remove = async (id: number): Promise<User | null> => {
    try {
      return await prisma.user.delete({
        where: { id },
        omit: { password: true },
      })
    }
    catch {
      return null
    }
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
