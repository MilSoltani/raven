import type { AppEnv, AuthPayload } from './common/types'
import { config } from '@api/infrastructure/config/config'
import { createPrismaClient } from '@api/infrastructure/database/prisma'
import { createAuthModule } from '@api/modules/auth/auth.module'
import { createUsersModule } from '@api/modules/users'
import { serve } from '@hono/node-server'
import { OpenAPIHono } from '@hono/zod-openapi'
import { cors } from 'hono/cors'
import { jwt } from 'hono/jwt'
import { logger } from 'hono/logger'
import { createTicketsModule } from './modules/tickets/tickets.module'

const prisma = createPrismaClient(config)
const authModule = createAuthModule(prisma)
const usersModule = createUsersModule(prisma)
const ticketsModule = createTicketsModule(prisma)

const app = new OpenAPIHono<AppEnv>()
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
  .route('/users', usersModule.handler)
  .route('/tickets', ticketsModule.handler)

serve({
  fetch: app.fetch,
  port: 3000,
}, (info) => {
  // eslint-disable-next-line no-console
  console.log(`Server: http://localhost:${info.port}`)
})
