export const usersResponseCodes = {
  USERS_FETCHED: 200,
  USER_FETCHED: 200,
  USER_UPDATED: 200,
  USER_DELETED: 200,
  USER_CREATED: 201,

  NAME_TOO_LONG: 400,
  NAME_REQUIRED: 400,
  EMAIL_REQUIRED: 400,
  EMAIL_INVALID: 400,
  EMAIL_TOO_LONG: 400,
  UPDATED_AT_INVALID: 400,
  CREATED_AT_REQUIRED: 400,
  USER_NOT_FOUND: 404,
} as const

export type UsersResponseCode = keyof typeof usersResponseCodes
export const usersResponseCode = <T extends UsersResponseCode>(e: T) => e
