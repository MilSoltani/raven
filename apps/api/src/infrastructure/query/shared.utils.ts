import { HTTPException } from 'hono/http-exception'

export function isPlainObject(value: unknown): value is Record<string, unknown> {
  return (
    value !== null
    && typeof value === 'object'
    && !Array.isArray(value)
  )
}

export function validatePath(path: string[], maxDepth: number, allowedPaths: string[]) {
  if (path.length > maxDepth) {
    throw new HTTPException(401, { message: `Max depth is ${maxDepth}` })
  }

  const normalized = path.join('.')

  const isAllowed = allowedPaths.some(allowed =>
    allowed === normalized
    || allowed.startsWith(`${normalized}.`),
  )

  if (!isAllowed) {
    throw new HTTPException(401, { message: `Field "${normalized}" is not allowed` })
  }
}
