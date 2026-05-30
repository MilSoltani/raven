import type { QueryResponseKeys } from './query-response.keys'
import { appExceptionFactory } from '@raven/api/common/http/app.exception'
import { queryResponseKeys } from './query-response.keys'

const appException = appExceptionFactory<QueryResponseKeys>()

export function isPlainObject(value: unknown): value is Record<string, unknown> {
  return (
    value !== null
    && typeof value === 'object'
    && !Array.isArray(value)
  )
}

export function validatePath(path: string[], maxDepth: number, allowedPaths: string[]) {
  if (path.length > maxDepth)
    throw appException(queryResponseKeys.error.maxDepthExceeded, 400)

  const normalized = path.join('.')

  const isAllowed = allowedPaths.some(allowed =>
    allowed === normalized
    || allowed.startsWith(`${normalized}.`),
  )

  if (!isAllowed) {
    throw appException(queryResponseKeys.error.fieldNotAllowed, 400)
  }
}
