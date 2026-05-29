export const usersResponseKeys = {
  success: {
    fetched: 'fetched',
    created: 'created',
    updated: 'updated',
    deleted: 'deleted',
  },

  validation: {
    nameRequired: 'nameRequired',
    nameTooLong: 'nameTooLong',

    emailInvalid: 'emailInvalid',

    createdAtInvalid: 'createdAtInvalid',
    updatedAtInvalid: 'updatedAtInvalid',
  },

  error: {
    notFound: 'notFound',
    internalError: 'internalError',
  },
} as const

const _usersResponseKeysFlat = {
  ...usersResponseKeys.success,
  ...usersResponseKeys.validation,
  ...usersResponseKeys.error,
} as const

export type UsersResponseKeys = typeof _usersResponseKeysFlat
export type UsersResponseKey
  = (typeof _usersResponseKeysFlat)[keyof typeof _usersResponseKeysFlat]

export const usersCode = <T extends UsersResponseKey>(code: T) => code
