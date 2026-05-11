import type { AuthUser } from '@raven/api/modules/auth'
import type { AppEnv, AuthPayload } from './common/types'
import { serve } from '@hono/node-server'
import { swaggerUI } from '@hono/swagger-ui'
import { OpenAPIHono } from '@hono/zod-openapi'
import { config } from '@raven/api/infrastructure/config/config'
import { qsParser } from '@raven/api/infrastructure/middlewares'
import { cors } from 'hono/cors'
import { HTTPException } from 'hono/http-exception'
import { jwt } from 'hono/jwt'
import { logger } from 'hono/logger'
import { authModule, ticketsModule, usersModule } from './app'

const publicRoutes = [
  '/auth/signin',
  '/auth/signup',
  '/auth/refresh',
  '/auth/logout',
]

const app = new OpenAPIHono<AppEnv>()
  .doc('/doc', {
    openapi: '3.0.0',
    info: {
      title: 'Raven API',
      version: '1.0.0',
    },
  })
  .get('/ui', swaggerUI({ url: '/doc' }))
  .use(
    '/*',
    cors({
      origin: ['http://localhost:5173'],
      credentials: true,
      allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowHeaders: ['Content-Type', 'Authorization'],
      exposeHeaders: ['Content-Length'],
      maxAge: 600,
    }),
  )
  .use(logger())
  .use('*', async (c, next) => {
    const path = c.req.path

    if (publicRoutes.includes(path)) {
      return next()
    }

    return jwt({
      secret: config.JWT_ACCESS_TOKEN_SECRET,
      cookie: 'accessToken',
      alg: 'HS256',
    })(c, next)
  })
  .use(async (c, next) => {
    const payload = c.get('jwtPayload') as AuthPayload
    if (payload?.sub) {
      const user: AuthUser = {
        id: payload.sub,
        email: payload.email,
      }

      c.set('user', user)
    }
    await next()
  })
  .use(qsParser)
  .route('/auth', authModule.handler)
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
