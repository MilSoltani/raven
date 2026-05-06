import type { SessionsRepository } from './sessions.repository'
import type { CreateSessionPayload } from './sessions.schema'
import {
  ExpiredException,
  InternalException,
  NotFoundException,
  ReuseDetectedException,
  RevokedException,
} from '@api/infrastructure/errors/exceptions'

export function createSessionsService(
  sessionsRepository: SessionsRepository,
) {
  const findSession = async (hash: string) => {
    const result = await sessionsRepository.findByHash(hash)

    if (!result)
      throw new NotFoundException('Session')

    return result
  }

  const createSession = async (data: CreateSessionPayload) => {
    const session = await sessionsRepository.create(data)

    if (!session)
      throw new InternalException('Session creation')

    return { session }
  }

  const rotateSession = async (
    refreshTokenHash: string,
    newRefreshTokenHash: string,
    expiresAt: Date,
  ) => {
    const session = await sessionsRepository.findByHash(refreshTokenHash)

    if (!session)
      throw new NotFoundException('Session')

    if (session.isRevoked)
      throw new RevokedException('Session')

    if (session.expiresAt.getTime() < Date.now()) {
      throw new ExpiredException('Session')
    }

    if (session.isUsed) {
      await sessionsRepository.revokeByFamily(session.familyId)
      throw new ReuseDetectedException('Session')
    }

    const updated = await sessionsRepository.markUsedIfUnused(session.id)

    if (!updated) {
      await sessionsRepository.revokeByFamily(session.familyId)
      throw new ReuseDetectedException('Session')
    }

    const newSession = await createSession({
      userId: session.userId,
      familyId: session.familyId,
      refreshTokenHash: newRefreshTokenHash,
      expiresAt,
    })

    return newSession
  }

  function revokeFamily(familyId: string) {
    return sessionsRepository.revokeByFamily(familyId)
  }

  function revokeAll(userId: number) {
    return sessionsRepository.revokeByUser(userId)
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
