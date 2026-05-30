import type { QueryResponseKeys } from '../query-response.keys'
import { appExceptionFactory } from '@raven/api/common/http/app.exception'
import { queryResponseKeys } from '../query-response.keys'

const appException = appExceptionFactory<QueryResponseKeys>()

export function validateOperatorObject(obj: Record<string, unknown>) {
  if (obj.eq !== undefined && Object.keys(obj).length > 1)
    throw appException(queryResponseKeys.error.operatorCombinationError, 400)
}

export function isFilterCondition(obj: any) {
  const OPERATORS = ['equals', 'contains', 'in', 'notIn', 'not', 'gt', 'gte', 'lt', 'lte']

  return Object.keys(obj)
    .every(key => OPERATORS.includes(key))
}
