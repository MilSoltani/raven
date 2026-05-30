import { apiException } from '@raven/api/common/http/api.exception'
import { queryResponseKeys } from './query-response.keys'

export function isPlainObject(value: unknown): value is Record<string, unknown> {
  return (
    value !== null
    && typeof value === 'object'
    && !Array.isArray(value)
  )
}

export function validatePath(path: string[], maxDepth: number, allowedPaths: string[]) {
  if (path.length > maxDepth)
    throw apiException(queryResponseKeys.error.maxDepthExceeded, 400)

  const normalized = path.join('.')

  const isAllowed = allowedPaths.some(allowed =>
    allowed === normalized
    || allowed.startsWith(`${normalized}.`),
  )

  if (!isAllowed) {
    throw apiException(queryResponseKeys.error.fieldNotAllowed, 400)
  }
}
