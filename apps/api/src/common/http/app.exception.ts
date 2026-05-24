import type { ContentfulStatusCode } from 'hono/utils/http-status'
import { HTTPException } from 'hono/http-exception'

export function appExceptionFactory(messages: Record<string, number>) {
  return function (message: keyof typeof messages) {
    return new HTTPException(
      messages[message] as ContentfulStatusCode,
      { message },
    )
  }
}
