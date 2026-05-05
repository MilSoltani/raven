import type { AuthRepository } from './auth.repository'
import { InternalException, InvalidCredentialsException } from '@api/infrastructure/errors/exceptions'
import { OpenAPIHono } from '@hono/zod-openapi'
import bcrypt from 'bcrypt'
import { AuthRoutes } from './auth.routes'

export function createAuthHandler(
  authRepository: AuthRepository,
) {
  return new OpenAPIHono()

    .openapi(AuthRoutes.login, async (c) => {
      const { email, password } = c.req.valid('json')

      const user = await authRepository.getUserByEmail(email)

      if (!user) {
        throw new InvalidCredentialsException('User')
      }

      if (!user.password) {
        throw new InvalidCredentialsException('User')
      }

      const validated = await bcrypt.compare(password, user.password)

      if (!validated) {
        throw new InvalidCredentialsException('User')
      }

      const response = {
        id: user.id,
        email: user.email,
      }

      return c.json(response, 200)
    })

    .openapi(AuthRoutes.signup, async (c) => {
      const { password, ...validated } = c.req.valid('json')

      const hashedPassword = await bcrypt.hash(password, 12)

      const user = await authRepository.signup({
        password: hashedPassword,
        ...validated,
      })

      if (!user) {
        throw new InternalException('User')
      }

      const response = {
        id: user.id,
        name: user.name,
        email: user.email,
      }

      return c.json(response, 201)
    })

    .openapi(AuthRoutes.refresh, async (c) => {
      const data = {
        id: 1,
        email: 'test@test.de',
      }

      return c.json(data, 200)
    })

    .openapi(AuthRoutes.logout, async (c) => {
      return c.json({ message: 'Logged out successfully' }, 200)
    })
}

export type AuthHandler = ReturnType<typeof createAuthHandler>
