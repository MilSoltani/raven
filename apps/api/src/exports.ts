import type { authModule, ticketsModule, usersModule } from '@raven/api/app'
import type { Criteria } from '@raven/api/infrastructure/query'
import { hc } from 'hono/client'
import qs from 'qs'

function buildSearchParams(query: Criteria) {
  const queryString = qs.stringify(query)
  return new URLSearchParams(queryString)
}

export const authClient = hc<typeof authModule.handler>(
  'http://localhost:3000/auth',
  { init: { credentials: 'include' } },
)
export const usersClient = hc<typeof usersModule.handler>(
  'http://localhost:3000/users',
  { init: { credentials: 'include' }, buildSearchParams },
)
export const ticketsClient = hc<typeof ticketsModule.handler>(
  'http://localhost:3000/tickets',
  { init: { credentials: 'include' }, buildSearchParams },
)

export * from '@raven/api/infrastructure/database/paginator/paginator.schema'
export { type Criteria, CriteriaSchema, type Sort } from '@raven/api/infrastructure/query'

export * from '@raven/api/modules/auth/auth.schema'
export * from '@raven/api/modules/tickets/tickets.schema'
export * from '@raven/api/modules/users/users.schema'
