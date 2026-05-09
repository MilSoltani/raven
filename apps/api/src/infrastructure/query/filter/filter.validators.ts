import { BadRequestException } from '@raven/api/infrastructure/errors/exceptions'

export function validateOperatorObject(obj: Record<string, unknown>) {
  if (obj.eq !== undefined && Object.keys(obj).length > 1) {
    throw new BadRequestException(`"eq" cannot be combined with other operators`)
  }
}

export function isFilterCondition(obj: any) {
  const OPERATORS = ['equals', 'contains', 'in', 'notIn', 'not', 'gt', 'gte', 'lt', 'lte']

  return Object.keys(obj)
    .every(key => OPERATORS.includes(key))
}
