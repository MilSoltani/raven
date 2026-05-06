import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { config } from './infrastructure/config/config'
import { createPrismaClient } from './infrastructure/database/prisma'
import { createAuthModule } from './modules/auth/auth.module'

const prisma = createPrismaClient(config.DATABASE_URL)
const authModule = createAuthModule(prisma)

const app = new Hono()
  .use('/*', cors())
  .use(logger())
  .route('/auth', authModule.authHandler)

serve({
  fetch: app.fetch,
  port: 3000,
}, (info) => {
  // eslint-disable-next-line no-console
  console.log(`Server: http://localhost:${info.port}`)
})
