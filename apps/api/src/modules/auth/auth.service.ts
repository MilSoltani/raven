import type { AuthRepository } from './auth.repository'
import type { SessionsService } from './sessions/sessions.service'
import type { CryptoUtil } from './utils/crypto.util'
import type { JwtUtil } from './utils/jwt.util'
import bcrypt from 'bcrypt'
import { HTTPException } from 'hono/http-exception'

export function createAuthService(
  authRepository: AuthRepository,
  sessionsService: SessionsService,
  cryptoUtil: CryptoUtil,
  jwtUtil: JwtUtil,
) {
  const issueTokens = async (userId: number, email: string) => {
    const accessToken = await jwtUtil.generateAccessToken(userId, email)
    const refreshToken = await jwtUtil.generateRefreshToken(userId, email)

    return { accessToken, refreshToken }
  }

  const persistSession = async (userId: number, refreshToken: string) => {
    const { session } = await sessionsService.createSession({
      userId,
      expiresAt: jwtUtil.getRefreshTokenExpiresAt(),
      refreshTokenHash: cryptoUtil.hash(refreshToken),
    })

    if (!session)
      throw new HTTPException(500, { message: 'Internal error processing session' })

    return session
  }

  const verifyPassword = async (plain: string, hash: string) => {
    const ok = await bcrypt.compare(plain, hash)

    if (!ok)
      throw new HTTPException(401, { message: 'Invalid credentials' })
  }

  const signin = async (email: string, pass: string) => {
    const authUserInternal = await authRepository.getUserByEmail(email)

    if (!authUserInternal)
      throw new HTTPException(401, { message: 'Invalid credentials' })

    if (!authUserInternal.password)
      throw new HTTPException(401, { message: 'Invalid credentials' })

    await verifyPassword(pass, authUserInternal.password)

    const tokens = await issueTokens(authUserInternal.id, authUserInternal.email)

    await persistSession(authUserInternal.id, tokens.refreshToken)

    const { password, ...user } = authUserInternal

    return { user, ...tokens }
  }

  const signup = async (data: {
    email: string
    name: string
    password: string
  }) => {
    const hashed = await bcrypt.hash(data.password, 12)

    const user = await authRepository.signup({
      ...data,
      password: hashed,
    })

    if (!user)
      throw new HTTPException(500, { message: 'Internal error processing user' })

    const tokens = await issueTokens(user.id, user.email)
    await persistSession(user.id, tokens.refreshToken)

    return { user, ...tokens }
  }

  const refresh = async (refreshToken: string) => {
    const payload = await jwtUtil.verifyRefreshToken(refreshToken)
    const user = { id: payload.sub, email: payload.email }

    const newTokens = await issueTokens(user.id, user.email)
    const newRefreshTokenHash = cryptoUtil.hash(newTokens.refreshToken)
    const newExpireAt = jwtUtil.getRefreshTokenExpiresAt()

    const refreshTokenHash = cryptoUtil.hash(refreshToken)
    await sessionsService.rotateSession(
      refreshTokenHash,
      newRefreshTokenHash,
      newExpireAt,
      user.id,
    )

    return { user, ...newTokens }
  }

  const signout = async (refreshToken: string) => {
    const refreshTokenHash = cryptoUtil.hash(refreshToken)
    const session = await sessionsService.revoke(refreshTokenHash)

    if (!session)
      throw new HTTPException(404, { message: 'Session not found' })
  }

  return { signin, signup, refresh, signout }
}

export type AuthService = ReturnType<typeof createAuthService>
