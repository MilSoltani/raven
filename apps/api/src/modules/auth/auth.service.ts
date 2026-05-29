import type { AuthResponseKeys } from './auth-response.keys'
import type { AuthRepository } from './auth.repository'
import type { SessionsService } from './sessions/sessions.service'
import type { CryptoUtil } from './utils/crypto.util'
import type { JwtUtil } from './utils/jwt.util'
import { appExceptionFactory } from '@raven/api/common/http/app.exception'
import bcrypt from 'bcrypt'
import { authResponseKeys } from './auth-response.keys'

const appException = appExceptionFactory<AuthResponseKeys>()

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
      throw appException(authResponseKeys.error.internalError, 500)

    return session
  }

  const verifyPassword = async (plain: string, hash: string) => {
    const ok = await bcrypt.compare(plain, hash)

    if (!ok)
      throw appException(authResponseKeys.error.invalidCredentials, 401)
  }

  const signin = async (email: string, pass: string) => {
    const authUserInternal = await authRepository.getUserByEmail(email)

    if (!authUserInternal)
      throw appException(authResponseKeys.error.invalidCredentials, 401)

    if (!authUserInternal.password)
      throw appException(authResponseKeys.error.invalidCredentials, 401)

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
      throw appException(authResponseKeys.error.internalError, 500)

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
    await sessionsService.revoke(refreshTokenHash)
  }

  return { signin, signup, refresh, signout }
}

export type AuthService = ReturnType<typeof createAuthService>
