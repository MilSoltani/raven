import type { Context } from 'hono'
import { createMiddleware } from 'hono/factory'
import qs from 'qs'

export const qsParser = createMiddleware(async (c: Context, next) => {
  const url = new URL(c.req.url)
  const parsedQuery = qs.parse(url.search, { ignoreQueryPrefix: true })

  c.set('query', parsedQuery)

  await next()
})
