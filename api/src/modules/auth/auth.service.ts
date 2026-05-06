import type { AuthRepository } from './auth.repository'
import type { SessionsService } from './sessions/sessions.service'
import type { CryptoUtil } from './utils/crypto.util'
import type { JwtUtil } from './utils/jwt.util'
import {
  InternalException,
  InvalidCredentialsException,
} from '@api/infrastructure/errors/exceptions'
import bcrypt from 'bcrypt'

export function createAuthService(
  authRepository: AuthRepository,
  sessionsService: SessionsService,
  cryptoUtil: CryptoUtil,
  jwtUtil: JwtUtil,
) {
  const findUserByEmail = async (email: string) => {
    const user = await authRepository.getUserByEmail(email)

    if (!user || !user.password)
      throw new InvalidCredentialsException('User')

    return user
  }

  const verifyPassword = async (plain: string, hash: string) => {
    const ok = await bcrypt.compare(plain, hash)

    if (!ok)
      throw new InvalidCredentialsException('User')
  }

  const issueTokens = async (userId: number, email: string) => {
    const accessToken = await jwtUtil.generateAccessToken(userId, email)
    const refreshToken = await jwtUtil.generateRefreshToken(userId, email)

    return { accessToken, refreshToken }
  }

  const persistSession = async (userId: number, refreshToken: string) => {
    const { session } = await sessionsService.createSession({
      userId,
      familyId: cryptoUtil.uuid(),
      expiresAt: jwtUtil.getRefreshTokenExpiresAt(),
      refreshTokenHash: cryptoUtil.hash(refreshToken),
    })

    if (!session)
      throw new InternalException('Session')

    return session
  }

  const login = async (email: string, password: string) => {
    const user = await findUserByEmail(email)

    if (!user) {
      throw new InvalidCredentialsException('User')
    }

    if (!user.password) {
      throw new InvalidCredentialsException('User')
    }

    await verifyPassword(password, user.password)

    const tokens = await issueTokens(user.id, user.email)

    await persistSession(user.id, tokens.refreshToken)

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
      throw new InternalException('User')

    const tokens = await issueTokens(user.id, user.email)

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
    )

    return { user, ...newTokens }
  }

  return {
    login,
    signup,
    refresh,
  }
}

export type AuthService = ReturnType<typeof createAuthService>
