import { HTTPException } from 'hono/http-exception'
import type { SessionsRepository } from './sessions.repository'
import type { CreateSessionPayload } from './sessions.schema'

export function createSessionsService(sessionsRepository: SessionsRepository) {
	const findSession = async (hash: string) => {
		const result = await sessionsRepository.findByHash(hash)

		if (!result)
			throw new HTTPException(404, { message: 'session.error.notFound' })

		return result
	}

	const createSession = async (data: CreateSessionPayload) => {
		const session = await sessionsRepository.create(data)

		if (!session)
			throw new HTTPException(500, { message: 'session.error.internalError' })

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
			throw new HTTPException(401, { message: 'session.error.revoked' })
		}

		if (session.expiresAt < new Date())
			throw new HTTPException(401, { message: 'session.error.expired' })

		const updatedSession = await sessionsRepository.update(session.id, {
			refreshTokenHash: newRefreshTokenHash,
			expiresAt,
		})

		return updatedSession
	}

	function revoke(refreshTokenHash: string) {
		const result = sessionsRepository.revoke(refreshTokenHash)

		if (!result)
			throw new HTTPException(404, { message: 'session.error.notFound' })

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
