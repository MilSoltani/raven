import { appExceptionFactory } from '@raven/api/common/http/app.exception'
import { queryCodesMap } from '../query.codes'

const appException = appExceptionFactory(queryCodesMap)

export function validateOperatorObject(obj: Record<string, unknown>) {
  if (obj.eq !== undefined && Object.keys(obj).length > 1)
    throw appException('OPERATOR_COMBINATION_ERROR')
}

export function isFilterCondition(obj: any) {
  const OPERATORS = ['equals', 'contains', 'in', 'notIn', 'not', 'gt', 'gte', 'lt', 'lte']

  return Object.keys(obj)
    .every(key => OPERATORS.includes(key))
}
