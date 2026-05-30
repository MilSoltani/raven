import { apiException } from '@raven/api/common/http/api.exception'

export function isPlainObject(value: unknown): value is Record<string, unknown> {
  return (
    value !== null
    && typeof value === 'object'
    && !Array.isArray(value)
  )
}

export function validatePath(path: string[], maxDepth: number, allowedPaths: string[]) {
  if (path.length > maxDepth)
    throw apiException('query.error.maxDepthExceeded', 400)

  const normalized = path.join('.')

  const isAllowed = allowedPaths.some(allowed =>
    allowed === normalized
    || allowed.startsWith(`${normalized}.`),
  )

  if (!isAllowed) {
    throw apiException('query.error.fieldNotAllowed', 400)
  }
}
