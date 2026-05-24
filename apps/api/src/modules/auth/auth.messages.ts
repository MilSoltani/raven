export const authMessages = {
  AUTH_SIGNIN: 200,
  AUTH_REFRESHED: 200,
  AUTH_SIGNOUT: 200,
  AUTH_ME: 200,
  AUTH_SIGNUP: 201,

  EMAIL_INVALID: 400,
  EMAIL_REQUIRED: 400,
  EMAIL_TOO_LONG: 400,
  PASSWORD_REQUIRED: 400,
  PASSWORD_TOO_SHORT: 400,
  PASSWORD_TOO_LONG: 400,
  NAME_REQUIRED: 400,
  NAME_TOO_LONG: 400,
} as const

export type AuthMessage = keyof typeof authMessages
export const authMessage = <T extends AuthMessage>(e: T) => e
