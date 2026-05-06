import type { SessionsRepository } from './sessions.repository'
import type { CreateSessionPayload } from './sessions.schema'
import {
  ExpiredException,
  InternalException,
  NotFoundException,
  ReuseDetectedException,
  RevokedException,
} from '@api/infrastructure/errors/exceptions'

export function createSessionsService(repo: SessionsRepository) {
  const findSession = async (hash: string) => {
    const result = await repo.findByHash(hash)

    if (!result)
      throw new NotFoundException('Session')

    return result
  }

  const createSession = async (data: CreateSessionPayload) => {
    const session = await repo.create(data)

    if (!session)
      throw new InternalException('Session creation')

    return { session }
  }

  const rotateSession = async (refreshTokenHash: string) => {
    const session = await repo.findByHash(refreshTokenHash)

    if (!session)
      throw new NotFoundException('Session')

    if (session.isRevoked)
      throw new RevokedException('Session')

    if (session.expiresAt.getTime() < Date.now()) {
      throw new ExpiredException('Session')
    }

    if (session.isUsed) {
      await repo.revokeByFamily(session.familyId)
      throw new ReuseDetectedException('Session')
    }

    const updated = await repo.markUsedIfUnused(session.id)

    if (!updated) {
      await repo.revokeByFamily(session.familyId)
      throw new ReuseDetectedException('Session')
    }

    // const newToken = await createSession(
    //   session.userId,
    //   session.familyId,
    // )

    // return {
    //   userId: session.userId,
    //   familyId: session.familyId,
    //   refreshToken: newToken.refreshToken,
    // }
  }

  function revokeFamily(familyId: string) {
    return repo.revokeByFamily(familyId)
  }

  function revokeAll(userId: number) {
    return repo.revokeByUser(userId)
  }

  return {
    findSession,
    createSession,
    rotateSession,
    revokeFamily,
    revokeAll,
  }
}

export type SessionsService = ReturnType<typeof createSessionsService>
