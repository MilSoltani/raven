import { HTTPException } from 'hono/http-exception'

export function validateOperatorObject(obj: Record<string, unknown>) {
  if (obj.eq !== undefined && Object.keys(obj).length > 1) {
    throw new HTTPException(401, { message: `"eq" cannot be combined with other operators` })
  }
}

export function isFilterCondition(obj: any) {
  const OPERATORS = ['equals', 'contains', 'in', 'notIn', 'not', 'gt', 'gte', 'lt', 'lte']

  return Object.keys(obj)
    .every(key => OPERATORS.includes(key))
}
