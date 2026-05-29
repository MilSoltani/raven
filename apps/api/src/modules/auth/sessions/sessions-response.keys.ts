export const sessionsResponseKeys = {
  success: {
    created: 'created',
    updated: 'updated',
    deleted: 'deleted',
  },

  validation: {
    idRequired: 'idRequired',
    idInvalid: 'idInvalid',

    userIdRequired: 'userIdRequired',
    userIdInvalid: 'userIdInvalid',

    refreshTokenHashRequired: 'refreshTokenHashRequired',

    isRevokedRequired: 'isRevokedRequired',

    expiresAtRequired: 'expiresAtRequired',
    createdAtRequired: 'createdAtRequired',
  },

  error: {
    notFound: 'notFound',
    revoked: 'revoked',
    expired: 'expired',
    internalError: 'internalError',
  },
} as const

const _sessionsResponseKeysFlat = {
  ...sessionsResponseKeys.success,
  ...sessionsResponseKeys.validation,
  ...sessionsResponseKeys.error,
} as const

export type SessionsResponseKeys = typeof _sessionsResponseKeysFlat

export type SessionsResponseKey
  = (typeof _sessionsResponseKeysFlat)[keyof typeof _sessionsResponseKeysFlat]

export const sessionsCode = <T extends SessionsResponseKey>(code: T) => code
