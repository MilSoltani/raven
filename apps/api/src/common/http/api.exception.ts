import type { ContentfulStatusCode } from 'hono/utils/http-status'
import { HTTPException } from 'hono/http-exception'

export function apiException(
  translationKey: string,
  status: ContentfulStatusCode,
) {
  return new HTTPException(
    status,
    { message: translationKey },
  )
}
