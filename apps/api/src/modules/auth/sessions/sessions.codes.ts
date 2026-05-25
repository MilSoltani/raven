export const sessionsCodesMap = {
  SESSION_NOT_FOUND: 404,
  SESSION_REVOKED: 401,
  SESSION_EXPIRED: 401,
  INTERNAL_ERROR: 500,
} as const

export type SessionsCode = keyof typeof sessionsCodesMap
export const sessionsCode = <T extends SessionsCode>(e: T) => e
