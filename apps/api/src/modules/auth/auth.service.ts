import type { AuthRepository } from './auth.repository'
import type { SessionsService } from './sessions/sessions.service'
import type { CryptoUtil } from './utils/crypto.util'
import type { JwtUtil } from './utils/jwt.util'
import {
  InternalException,
  InvalidCredentialsException,
  NotFoundException,
} from '@raven/api/infrastructure/errors/exceptions'
import bcrypt from 'bcrypt'

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
      throw new InternalException('Session')

    return session
  }

  const verifyPassword = async (plain: string, hash: string) => {
    const ok = await bcrypt.compare(plain, hash)

    if (!ok)
      throw new InvalidCredentialsException('User')
  }

  const login = async (email: string, pass: string) => {
    const authUser = await authRepository.getUserByEmail(email)

    if (!authUser)
      throw new InvalidCredentialsException('User')

    if (!authUser.password)
      throw new InvalidCredentialsException('User')

    await verifyPassword(pass, authUser.password)

    const tokens = await issueTokens(authUser.id, authUser.email)

    await persistSession(authUser.id, tokens.refreshToken)

    const { password, ...user } = authUser

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

  const logout = async (refreshToken: string) => {
    const refreshTokenHash = cryptoUtil.hash(refreshToken)
    const session = await sessionsService.revoke(refreshTokenHash)

    if (!session)
      throw new NotFoundException('Session')
  }

  return { login, signup, refresh, logout }
}

export type AuthService = ReturnType<typeof createAuthService>
