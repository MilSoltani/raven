import type { PrismaClient } from '@api/infrastructure/database/generated/prisma/internal/class'
import type { User } from '../users/users.schema'
import type { SignupPayload } from './auth.schema'

export function createAuthRepository(prisma: PrismaClient) {
  const getUserByEmail = async (email: string): Promise<User | null> => {
    return prisma.user.findUnique({
      where: { email },
    })
  }

  const signup = async (data: SignupPayload): Promise<User | null> => {
    return prisma.user.create({
      data,
      omit: { password: true },
    })
  }

  return { getUserByEmail, signup }
}

export type AuthRepository = ReturnType<typeof createAuthRepository>
