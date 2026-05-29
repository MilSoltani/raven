export const authResponseKeys = {
  success: {
    signedIn: 'signedIn',
    refreshed: 'refreshed',
    signedOut: 'signedOut',
    me: 'me',
    signedUp: 'signedUp',
  },

  validation: {
    emailInvalid: 'emailInvalid',
    emailRequired: 'emailRequired',

    passwordRequired: 'passwordRequired',
    passwordTooShort: 'passwordTooShort',
    passwordTooLong: 'passwordTooLong',

    nameRequired: 'nameRequired',
    nameTooLong: 'nameTooLong',
  },

  error: {
    unauthenticated: 'unauthenticated',
    invalidCredentials: 'invalidCredentials',
    internalError: 'internalError',
  },
} as const

const _authResponseKeysFlat = {
  ...authResponseKeys.success,
  ...authResponseKeys.validation,
  ...authResponseKeys.error,
} as const

export type AuthResponseKeys = typeof _authResponseKeysFlat

export type AuthResponseKey
  = (typeof _authResponseKeysFlat)[keyof typeof _authResponseKeysFlat]

export const authCode = <T extends AuthResponseKey>(code: T) => code
