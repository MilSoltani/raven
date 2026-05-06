import type { SessionsRepository } from './sessions.repository'
import type { CreateSessionPayload } from './sessions.schema'
import {
  ExpiredException,
  InternalException,
  NotFoundException,
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

    if (session.expiresAt.getTime() < Date.now())
      throw new ExpiredException('Session')

    if (session.isRevoked)
      throw new RevokedException('Session')

    const updatedSession = await sessionsRepository.update(session.id, {
      refreshTokenHash: newRefreshTokenHash,
      expiresAt,
    })

    return updatedSession
  }

  function revokeAll(userId: number) {
    return sessionsRepository.revokeByUser(userId)
  }

  return {
    findSession,
    createSession,
    rotateSession,
    revokeAll,
  }
}

export type SessionsService = ReturnType<typeof createSessionsService>
