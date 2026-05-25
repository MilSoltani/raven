import type { ContentfulStatusCode } from 'hono/utils/http-status'
import { HTTPException } from 'hono/http-exception'

export function zodExceptionFactory(codesMap: Record<string, number>) {
  return function (code: keyof typeof codesMap) {
    return {
      error() {
        throw new HTTPException(
          codesMap[code] as ContentfulStatusCode,
          { message: code },
        )
      },
    }
  }
}
