import { appExceptionFactory } from '@raven/api/common/http/app.exception'
import { queryCodesMap } from './query.codes'

const appException = appExceptionFactory(queryCodesMap)

export function isPlainObject(value: unknown): value is Record<string, unknown> {
  return (
    value !== null
    && typeof value === 'object'
    && !Array.isArray(value)
  )
}

export function validatePath(path: string[], maxDepth: number, allowedPaths: string[]) {
  if (path.length > maxDepth)
    throw appException('MAX_DEPTH_EXCEEDED')

  const normalized = path.join('.')

  const isAllowed = allowedPaths.some(allowed =>
    allowed === normalized
    || allowed.startsWith(`${normalized}.`),
  )

  if (!isAllowed) {
    throw appException('FIELD_NOT_ALLOWED')
  }
}
