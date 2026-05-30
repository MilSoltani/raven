import { apiException } from '@raven/api/common/http/api.exception'
import { queryResponseKeys } from '../query-response.keys'

export function validateOperatorObject(obj: Record<string, unknown>) {
  if (obj.eq !== undefined && Object.keys(obj).length > 1)
    throw apiException(queryResponseKeys.error.operatorCombinationError, 400)
}

export function isFilterCondition(obj: any) {
  const OPERATORS = ['equals', 'contains', 'in', 'notIn', 'not', 'gt', 'gte', 'lt', 'lte']

  return Object.keys(obj)
    .every(key => OPERATORS.includes(key))
}
