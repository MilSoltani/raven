import type { ContentfulStatusCode } from 'hono/utils/http-status'
import { HTTPException } from 'hono/http-exception'

export function zodExceptionFactory(messages: Record<string, number>) {
  return function (message: keyof typeof messages) {
    return {
      error() {
        throw new HTTPException(
          messages[message] as ContentfulStatusCode,
          { message },
        )
      },
    }
  }
}
