import type { PrismaClient } from '@raven/api/infrastructure/database/prisma'
import type { AuthUser, SignupPayload } from '@raven/schemas'

export function createAuthRepository(prisma: PrismaClient) {
  const getUserByEmail = async (email: string): Promise<AuthUser | null> => {
    return prisma.user.findUnique({
      select: { id: true, name: true, email: true, password: true },
      where: { email },
    })
  }

  const signup = async (data: SignupPayload): Promise<AuthUser | null> => {
    return prisma.user.create({
      data,
      omit: { password: true },
    })
  }

  return { getUserByEmail, signup }
}

export type AuthRepository = ReturnType<typeof createAuthRepository>
