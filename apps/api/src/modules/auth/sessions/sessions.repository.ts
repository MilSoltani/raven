import type { PrismaClient } from '@raven/api/infrastructure/database/prisma'
import type { Session, UpdateSessionPayload } from './sessions.schema'

export function createSessionsRepository(prisma: PrismaClient) {
  const findByHash = async (hash: string): Promise<Session | null> => {
    return prisma.session.findUnique({
      where: { refreshTokenHash: hash },
    })
  }

  const create = async (data: {
    userId: number
    refreshTokenHash: string
    expiresAt: Date
  }): Promise<Session> => {
    return prisma.session.create({ data })
  }

  const update = async (
    id: number,
    data: UpdateSessionPayload,
  ): Promise<Session> => {
    return prisma.session.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    })
  }

  const revoke = async (refreshTokenHash: string): Promise<Session | null> => {
    const session = await prisma.session.findUnique({
      where: { refreshTokenHash },
    })

    if (!session || session.isRevoked)
      return null

    return await prisma.session.update({
      where: { refreshTokenHash },
      data: { isRevoked: true },
    })
  }

  const revokeAllForUser = async (userId: number): Promise<void> => {
    await prisma.session.updateMany({
      where: { userId },
      data: { isRevoked: true },
    })
  }

  return {
    findByHash,
    create,
    update,
    revoke,
    revokeAllForUser,
  }
}

export type SessionsRepository = ReturnType<typeof createSessionsRepository>
