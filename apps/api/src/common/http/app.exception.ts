import { HTTPException } from 'hono/http-exception'

export function throwException(message: string) {
  return {
    error() {
      throw new HTTPException(400, { message })
    },
  }
}
