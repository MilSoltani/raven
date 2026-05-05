import type { PrismaClient } from '@api/infrastructure/database/generated/prisma/internal/class'
import { config } from '@api/infrastructure/config/config'
import { createSessionsRepository } from './sessions/sessions.repository'
import { createSessionsService } from './sessions/sessions.service'
import { createCryptoUtil } from './utils/crypto.util'
import { createPolicyUtil } from './utils/policy.util'

const cryptoUtil = createCryptoUtil(config.JWT_REFRESH_TOKEN_SECRET)
const policyUtil = createPolicyUtil(config.JWT_REFRESH_EXPIRY_SECONDS)

export function createAuthModule(prisma: PrismaClient) {
  const sessionRepository = createSessionsRepository(prisma)
  const _sessionService = createSessionsService(sessionRepository, cryptoUtil, policyUtil)

  return {}
}

export type AuthModule = ReturnType<typeof createAuthModule>
