import { createMiddleware } from 'hono/factory'
import qs from 'qs'

export const qsParser = createMiddleware(async (c, next) => {
  const raw = new URL(c.req.url).search

  const query = qs.parse(raw, {
    ignoreQueryPrefix: true,
  })

  c.set('query', query)

  await next()
})
