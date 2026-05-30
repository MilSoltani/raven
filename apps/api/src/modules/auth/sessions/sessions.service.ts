import type { SessionsRepository } from './sessions.repository'
import type { CreateSessionPayload } from './sessions.schema'
import { apiException } from '@raven/api/common/http/api.exception'
import { sessionsResponseKeys } from './sessions-response.keys'

export function createSessionsService(
  sessionsRepository: SessionsRepository,
) {
  const findSession = async (hash: string) => {
    const result = await sessionsRepository.findByHash(hash)

    if (!result)
      throw apiException(sessionsResponseKeys.error.notFound, 404)

    return result
  }

  const createSession = async (data: CreateSessionPayload) => {
    const session = await sessionsRepository.create(data)

    if (!session)
      throw apiException(sessionsResponseKeys.error.internalError, 500)

    return { session }
  }

  const rotateSession = async (
    refreshTokenHash: string,
    newRefreshTokenHash: string,
    expiresAt: number,
    userId: number,
  ) => {
    const session = await sessionsRepository.findByHash(refreshTokenHash)

    if (!session || session.isRevoked) {
      await sessionsRepository.revokeAllForUser(userId)
      throw apiException(sessionsResponseKeys.error.revoked, 401)
    }

    if (session.expiresAt < Date.now())
      throw apiException(sessionsResponseKeys.error.expired, 401)

    const updatedSession = await sessionsRepository.update(session.id, {
      refreshTokenHash: newRefreshTokenHash,
      expiresAt,
    })

    return updatedSession
  }

  function revoke(refreshTokenHash: string) {
    const result = sessionsRepository.revoke(refreshTokenHash)

    if (!result)
      throw apiException(sessionsResponseKeys.error.notFound, 404)

    return result
  }

  return {
    findSession,
    createSession,
    rotateSession,
    revoke,
  }
}

export type SessionsService = ReturnType<typeof createSessionsService>
