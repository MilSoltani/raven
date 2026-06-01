import type { AuthUser } from '@xenon/api/modules/auth'
import type { AppEnv, AuthPayload } from './common/types'
import { serve } from '@hono/node-server'
import { config } from '@xenon/api/infrastructure/config/config'
import { qsParser } from '@xenon/api/infrastructure/query'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { HTTPException } from 'hono/http-exception'
import { jwt } from 'hono/jwt'
import { languageDetector } from 'hono/language'
import { logger } from 'hono/logger'
import { authModule, ticketsModule, usersModule } from './app'
import { ValidationException } from './common/zvalidator-wrapper'

const publicRoutes = [
  '/auth/signin',
  '/auth/signup',
  '/auth/refresh',
  '/auth/signout',
]

const app = new Hono<AppEnv>()
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
  .use(
    languageDetector({
      supportedLanguages: ['en', 'de', 'fr', 'sp'],
      fallbackLanguage: 'en',
    }),
  )
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
      return c.json({ message: err.message }, err.status)
    }

    if (err instanceof ValidationException) {
      return c.json({
        message: 'validationError',
        issues: err.issues,
      }, 400)
    }

    console.error(err)
    return c.text('Internal Server Error', 500)
  })

serve({
  fetch: app.fetch,
  port: 3000,
}, (info) => {
  console.log(`Server: http://localhost:${info.port}`)
})
