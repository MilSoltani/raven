import type { ContentfulStatusCode } from 'hono/utils/http-status'
import { HTTPException } from 'hono/http-exception'

export function appExceptionFactory<TMap extends Record<string, string>>() {
  return function (
    code: keyof TMap,
    status: ContentfulStatusCode,
  ) {
    return new HTTPException(
      status,
      { message: String(code) },
    )
  }
}
