import type { SessionsRepository } from './sessions.repository'
import type { CreateSessionPayload } from './sessions.schema'
import { appExceptionFactory } from '@raven/api/common/http/app.exception'
import { sessionsCodesMap } from './sessions.codes'

const appException = appExceptionFactory(sessionsCodesMap)

export function createSessionsService(
  sessionsRepository: SessionsRepository,
) {
  const findSession = async (hash: string) => {
    const result = await sessionsRepository.findByHash(hash)

    if (!result)
      throw appException('SESSION_NOT_FOUND')

    return result
  }

  const createSession = async (data: CreateSessionPayload) => {
    const session = await sessionsRepository.create(data)

    if (!session)
      throw appException('INTERNAL_ERROR')

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
      throw appException('SESSION_REVOKED')
    }

    if (session.expiresAt < Date.now())
      throw appException('SESSION_EXPIRED')

    const updatedSession = await sessionsRepository.update(session.id, {
      refreshTokenHash: newRefreshTokenHash,
      expiresAt,
    })

    return updatedSession
  }

  function revoke(refreshTokenHash: string) {
    const result = sessionsRepository.revoke(refreshTokenHash)

    if (!result)
      throw appException('SESSION_NOT_FOUND')

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
