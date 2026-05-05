import type { CryptoUtil } from '../utils/crypto.util'
import type { PolicyUtil } from '../utils/policy.util'
import type { SessionsRepository } from './sessions.repository'
import {
  ExpiredException,
  InternalException,
  NotFoundException,
  ReuseDetectedException,
  RevokedException,
} from '@api/infrastructure/errors/exceptions'

export function createSessionsService(
  repo: SessionsRepository,
  cryptoUtil: CryptoUtil,
  policyUtil: PolicyUtil,
) {
  const findSession = async (hash: string) => {
    const result = await repo.findByHash(hash)

    if (!result)
      throw new NotFoundException('Session')

    return result
  }

  const createSession = async (userId: number, familyId: string) => {
    const refreshToken = cryptoUtil.random()
    const hash = cryptoUtil.hash(refreshToken)

    const result = await repo.create({
      userId,
      familyId,
      refreshTokenHash: hash,
      expiresAt: policyUtil.expiryDate(),
    })

    if (!result)
      throw new InternalException('Session creation')

    return { refreshToken }
  }

  const rotateSession = async (refreshToken: string) => {
    const hash = cryptoUtil.hash(refreshToken)
    const session = await repo.findByHash(hash)

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

    const newToken = await createSession(
      session.userId,
      session.familyId,
    )

    return {
      userId: session.userId,
      familyId: session.familyId,
      refreshToken: newToken.refreshToken,
    }
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
