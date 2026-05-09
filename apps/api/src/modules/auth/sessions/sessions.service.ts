import type { CreateSessionPayload } from '@raven/schemas'
import type { SessionsRepository } from './sessions.repository'
import {
  ExpiredException,
  InternalException,
  NotFoundException,
  RevokedException,
} from '@raven/api/infrastructure/errors/exceptions'

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
    userId: number,
  ) => {
    const session = await sessionsRepository.findByHash(refreshTokenHash)

    if (!session || session.isRevoked) {
      await sessionsRepository.revokeAllForUser(userId)
      throw new RevokedException('Security Alert: Session compromised')
    }

    if (session.expiresAt.getTime() < Date.now())
      throw new ExpiredException('Session')

    const updatedSession = await sessionsRepository.update(session.id, {
      refreshTokenHash: newRefreshTokenHash,
      expiresAt,
    })

    return updatedSession
  }

  function revoke(refreshTokenHash: string) {
    return sessionsRepository.revoke(refreshTokenHash)
  }

  return {
    findSession,
    createSession,
    rotateSession,
    revoke,
  }
}

export type SessionsService = ReturnType<typeof createSessionsService>
