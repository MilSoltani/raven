export const queryCodesMap = {
  OPERATOR_COMBINATION_ERROR: 401,
  FIELD_NOT_ALLOWED: 401,
  MAX_DEPTH_EXCEEDED: 401,
  MAX_LIMIT_EXCEEDED: 401,
  NON_NUMBER_LIMIT_PAGE: 401,
  INVALID_EXPIRED_TOKEN: 401,
} as const

export type QueryCode = keyof typeof queryCodesMap
export const queryCode = <T extends QueryCode>(e: T) => e
