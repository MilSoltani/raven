import type { AuthPayload } from '@xenon/api/common/types'
import type { Config } from '@xenon/api/infrastructure/config/config'
import { HTTPException } from 'hono/http-exception'
import { sign, verify } from 'hono/jwt'

export function createJwtUtil(config: Config) {
	async function generateAccessToken(
		sub: number,
		email: string,
	): Promise<string> {
		const iat = Math.floor(Date.now() / 1000)
		const exp = iat + config.JWT_ACCESS_EXPIRY_SECONDS

		const payload = { sub, email, iat, exp }

		return await sign(payload, config.JWT_ACCESS_TOKEN_SECRET, 'HS256')
	}

	async function generateRefreshToken(
		sub: number,
		email: string,
	): Promise<string> {
		const iat = Math.floor(Date.now() / 1000)
		const exp = iat + config.JWT_REFRESH_EXPIRY_SECONDS

		const payload = { sub, email, iat, exp }

		return await sign(payload, config.JWT_REFRESH_TOKEN_SECRET, 'HS256')
	}

	async function verifyAccessToken(token: string): Promise<AuthPayload> {
		try {
			return (await verify(
				token,
				config.JWT_ACCESS_TOKEN_SECRET,
				'HS256',
			)) as AuthPayload
		} catch {
			throw new HTTPException(401, {
				message: 'auth.error.invalidExpiredToken',
			})
		}
	}

	async function verifyRefreshToken(token: string): Promise<AuthPayload> {
		try {
			return (await verify(
				token,
				config.JWT_REFRESH_TOKEN_SECRET,
				'HS256',
			)) as AuthPayload
		} catch {
			throw new HTTPException(401, {
				message: 'auth.error.invalidExpiredToken',
			})
		}
	}

	function getAccessTokenExpiresAt() {
		return Date.now() + config.JWT_ACCESS_EXPIRY_SECONDS * 1000
	}

	function getRefreshTokenExpiresAt() {
		return Date.now() + config.JWT_REFRESH_EXPIRY_SECONDS * 1000
	}

	return {
		generateAccessToken,
		generateRefreshToken,
		verifyAccessToken,
		verifyRefreshToken,
		getAccessTokenExpiresAt,
		getRefreshTokenExpiresAt,
	}
}

export type JwtUtil = ReturnType<typeof createJwtUtil>
