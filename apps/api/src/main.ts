import type { AppEnv, AuthPayload } from './common/types'
import { serve } from '@hono/node-server'
import { swaggerUI } from '@hono/swagger-ui'
import { OpenAPIHono } from '@hono/zod-openapi'
import { config } from '@raven/api/infrastructure/config/config'
import { createPrismaClient } from '@raven/api/infrastructure/database/prisma'
import { qsParser } from '@raven/api/infrastructure/middlewares'
import { createAuthModule } from '@raven/api/modules/auth/auth.module'
import { createTicketsModule } from '@raven/api/modules/tickets/tickets.module'
import { createUsersModule } from '@raven/api/modules/users'
import { cors } from 'hono/cors'
import { HTTPException } from 'hono/http-exception'
import { jwt } from 'hono/jwt'
import { logger } from 'hono/logger'

const prisma = createPrismaClient(config)
const authModule = createAuthModule(prisma)
const usersModule = createUsersModule(prisma)
const ticketsModule = createTicketsModule(prisma)

const app = new OpenAPIHono<AppEnv>()
  .doc('/doc', {
    openapi: '3.0.0',
    info: {
      title: 'Raven API',
      version: '1.0.0',
    },
  })
  .get('/ui', swaggerUI({ url: '/doc' }))
  .use('/*', cors())
  .use(logger())
  .route('/auth', authModule.handler)
  .use(jwt({
    secret: config.JWT_ACCESS_TOKEN_SECRET,
    cookie: 'accessToken',
    alg: 'HS256',
  }))
  .use(async (c, next) => {
    const payload = c.get('jwtPayload') as AuthPayload
    if (payload?.sub) {
      c.set('userId', payload.sub)
    }
    await next()
  })
  .use(qsParser)
  .route('/users', usersModule.handler)
  .route('/tickets', ticketsModule.handler)
  .notFound(c => c.json({ error: 'Not Found!' }, 404))
  .onError((err, c) => {
    if (err instanceof HTTPException) {
      return err.getResponse()
    }
    console.error(err)
    return c.text('Internal Server Error', 500)
  })

serve({
  fetch: app.fetch,
  port: 3000,
}, (info) => {
  // eslint-disable-next-line no-console
  console.log(`Server: http://localhost:${info.port}`)
})
