export const queryResponseKeys = {
  error: {
    operatorCombinationError: 'OPERATOR_COMBINATION_ERROR',
    fieldNotAllowed: 'FIELD_NOT_ALLOWED',
    maxDepthExceeded: 'MAX_DEPTH_EXCEEDED',
    maxLimitExceeded: 'MAX_LIMIT_EXCEEDED',
    nonNumberLimitPage: 'NON_NUMBER_LIMIT_PAGE',
    invalidExpiredToken: 'INVALID_EXPIRED_TOKEN',
  },
} as const

const _queryResponseKeysFlat = {
  ...queryResponseKeys.error,
} as const

export type QueryResponseKeys = typeof _queryResponseKeysFlat

export type QueryResponseKey
  = (typeof _queryResponseKeysFlat)[keyof typeof _queryResponseKeysFlat]

export const queryCode = <T extends QueryResponseKey>(code: T) => code
