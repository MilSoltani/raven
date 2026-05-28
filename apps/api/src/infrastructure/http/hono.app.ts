import type { AppEnv } from '../common/types'
import { OpenAPIHono } from '@hono/zod-openapi'
import { HTTPException } from 'hono/http-exception'
import { ZodError } from 'zod'

export function honoApp() {
  return new OpenAPIHono<AppEnv>({
    defaultHook: (result) => {
      if (result.success)
        return

      if (result.error instanceof ZodError) {
        throw new HTTPException(400, {
          message: result.error.issues[0]?.message ?? 'VALIDATION_ERROR',
        })
      }
    },
  })
}
