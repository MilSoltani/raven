import type { ContentfulStatusCode } from 'hono/utils/http-status'
import { HTTPException } from 'hono/http-exception'

export function appExceptionFactory(codesMap: Record<string, number>) {
  return function (code: keyof typeof codesMap) {
    return new HTTPException(
      codesMap[code] as ContentfulStatusCode,
      { message: code },
    )
  }
}
