export const queryResponseKeys = {
  error: {
    operatorCombinationError: 'operatorCombinationError',
    maxDepthExceeded: 'maxDepthExceeded',
    maxLimitExceeded: 'maxLimitExceeded',
    nonNumberLimitPage: 'nonNumberLimitPage',
    fieldNotAllowed: 'fieldNotAllowed',
    nonNumberPageLimit: 'nonNumberPageLimit',
  },
} as const

const _queryResponseKeysFlat = {
  ...queryResponseKeys.error,
} as const

export type QueryResponseKeys = typeof _queryResponseKeysFlat

export type QueryResponseKey
  = (typeof _queryResponseKeysFlat)[keyof typeof _queryResponseKeysFlat]

export const queryCode = <T extends QueryResponseKey>(code: T) => code
