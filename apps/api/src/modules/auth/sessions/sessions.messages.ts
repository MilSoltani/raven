export const sessionsMessages = {
  SESSION_NOT_FOUND: 404,
  SESSION_REVOKED: 401,
  SESSION_EXPIRED: 401,
  INTERNAL_ERROR: 500,
} as const

export type SessionsMessage = keyof typeof sessionsMessages
export const sessionsMessage = <T extends SessionsMessage>(e: T) => e
