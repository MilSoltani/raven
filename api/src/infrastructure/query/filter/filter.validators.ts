import { BadRequestException } from '@api/infrastructure/errors/exceptions'

export function validatePath(path: string[], maxDepth: number, allowedPaths: string[]) {
  if (path.length > maxDepth) {
    throw new BadRequestException(`Max depth is ${maxDepth}`)
  }

  const normalized = path.join('.')

  const isAllowed = allowedPaths.some(allowed =>
    allowed === normalized
    || allowed.startsWith(`${normalized}.`),
  )

  if (!isAllowed) {
    throw new BadRequestException(`Field "${normalized}" is not allowed`)
  }
}

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
