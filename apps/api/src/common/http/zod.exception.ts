import { HTTPException } from 'hono/http-exception'

export function zodException(code: string) {
  return {
    error() {
      throw new HTTPException(400, {
        message: code,
      })
    },
  }
}
