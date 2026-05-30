export const usersUiKeys = {
  entity: {
    name: 'name',
    email: 'email',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
  form: {
    create: 'create',
    creating: 'creating',
    update: 'update',
    updating: 'updating',
  },
  ui: {
    loading: 'loading',
    loadingError: 'loadingError',
    details: 'details',
    invalidUserId: 'invalidUserId',
    drawerDescription: 'drawerDescription',
    openDrawerNotice: 'openDrawerNotice',
  },
} as const

const _usersUiKeysFlat = {
  ...usersUiKeys.entity,
  ...usersUiKeys.form,
  ...usersUiKeys.ui,
} as const

export type UsersUiKeys = typeof _usersUiKeysFlat
export type UsersUiKey
  = (typeof _usersUiKeysFlat)[keyof typeof _usersUiKeysFlat]

export const usersCode = <T extends UsersUiKey>(code: T) => code
