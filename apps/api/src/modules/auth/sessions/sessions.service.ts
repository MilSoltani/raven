import type { SessionsRepository } from './sessions.repository'
import type { CreateSessionPayload } from './sessions.schema'
import { HTTPException } from 'hono/http-exception'

export function createSessionsService(
  sessionsRepository: SessionsRepository,
) {
  const findSession = async (hash: string) => {
    const result = await sessionsRepository.findByHash(hash)

    if (!result)
      throw new HTTPException(404, { message: 'Session not found' })

    return result
  }

  const createSession = async (data: CreateSessionPayload) => {
    const session = await sessionsRepository.create(data)

    if (!session)
      throw new HTTPException(500, { message: 'Internal error creating session' })

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
      throw new HTTPException(401, { message: 'Session is revoked' })
    }

    if (session.expiresAt < Date.now())
      throw new HTTPException(401, { message: 'Session expired' })

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
