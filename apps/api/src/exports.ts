import type { authModule, ticketsModule, usersModule } from '@raven/api/app'
import { hc } from 'hono/client'

// PRC Clients

export const authClient = hc<typeof authModule.handler>(
  'http://localhost:3000/auth',
  { init: { credentials: 'include' } },
)
export const usersClient = hc<typeof usersModule.handler>(
  'http://localhost:3000/users',
  { init: { credentials: 'include' } },
)
export const ticketsClient = hc<typeof ticketsModule.handler>(
  'http://localhost:3000/tickets',
  { init: { credentials: 'include' } },
)

// Types

export * from '@raven/api/infrastructure/database/paginator/paginator.schema'
export { type Criteria, CriteriaSchema } from '@raven/api/infrastructure/query'
export * from '@raven/api/modules/auth/auth.schema'
export * from '@raven/api/modules/tickets/tickets.schema'
export * from '@raven/api/modules/users/users.schema'
