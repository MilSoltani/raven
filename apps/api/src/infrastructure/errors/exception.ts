import type { ContentfulStatusCode } from 'hono/utils/http-status'
import { HTTPException } from 'hono/http-exception'

export class TranslatableException extends HTTPException {
  constructor(
    status: ContentfulStatusCode,
    public module: string,
    public translationKey: string,
  ) {
    super(status)
  }
}

export function exception(
  status: ContentfulStatusCode,
  translationKey: string,
): TranslatableException {
  const err = new HTTPException(status) as TranslatableException
  err.translationKey = translationKey

  return err
}
