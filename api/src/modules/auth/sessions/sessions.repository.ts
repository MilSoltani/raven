import type { PrismaClient } from '@api/infrastructure/database/generated/prisma/internal/class'
import type { Session } from './sessions.schema'

export function createSessionsRepository(prisma: PrismaClient) {
  const findByHash = async (hash: string): Promise<Session | null> => {
    return prisma.session.findUnique({
      where: { refreshTokenHash: hash },
    })
  }

  const create = async (data: {
    userId: number
    familyId: string
    refreshTokenHash: string
    expiresAt: Date
  }): Promise<Session> => {
    return prisma.session.create({ data })
  }

  const markUsedIfUnused = async (id: number): Promise<boolean> => {
    const res = await prisma.session.updateMany({
      where: { id, isUsed: false },
      data: { isUsed: true },
    })

    return res.count === 1
  }

  const revokeByFamily = async (familyId: string): Promise<void> => {
    await prisma.session.updateMany({
      where: { familyId, isRevoked: false },
      data: { isRevoked: true },
    })
  }

  const revokeByUser = async (userId: number): Promise<void> => {
    await prisma.session.updateMany({
      where: { userId, isRevoked: false },
      data: { isRevoked: true },
    })
  }

  return {
    findByHash,
    create,
    markUsedIfUnused,
    revokeByFamily,
    revokeByUser,
  }
}

export type SessionsRepository = ReturnType<typeof createSessionsRepository>
