import type { PrismaClient } from '@xenon/api/infrastructure/database/prisma'
import { config } from '@xenon/api/infrastructure/config/config'
import { createAuthHandler } from './auth.handler'
import { createAuthRepository } from './auth.repository'
import { createAuthService } from './auth.service'
import { createSessionsRepository } from './sessions/sessions.repository'
import { createSessionsService } from './sessions/sessions.service'
import { createCookieUtil } from './utils/cookie.util'
import { createCryptoUtil } from './utils/crypto.util'
import { createJwtUtil } from './utils/jwt.util'

const cryptoUtil = createCryptoUtil(config.JWT_REFRESH_TOKEN_SECRET)
const cookieUtil = createCookieUtil(config)
const jwtUtil = createJwtUtil(config)

export function createAuthModule(prisma: PrismaClient) {
  const sessionRepository = createSessionsRepository(prisma)
  const sessionService = createSessionsService(sessionRepository)

  const authRepository = createAuthRepository(prisma)
  const authService = createAuthService(
    authRepository,
    sessionService,
    cryptoUtil,
    jwtUtil,
  )
  const handler = createAuthHandler(authService, cookieUtil)

  return { handler }
}

export type AuthModule = ReturnType<typeof createAuthModule>
