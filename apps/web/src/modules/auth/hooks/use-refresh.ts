import type { AuthUser } from '@raven/api/exports'
import type { QueryClient } from '@tanstack/react-query'
import { authClient } from '@raven/api/exports'
import { authKeys } from '../auth.keys'

let refreshPromise: Promise<AuthUser | null> | null = null

async function refreshRequest(): Promise<AuthUser | null> {
  const res = await authClient.refresh.$post({})

  if (!res.ok)
    return null

  const data = await res.json()

  if ('message' in data)
    return null

  return data
}

export async function refreshSession(queryClient: QueryClient) {
  if (refreshPromise)
    return refreshPromise

  refreshPromise = refreshRequest()
    .finally(() => {
      refreshPromise = null
    })

  const user = await refreshPromise

  if (user)
    queryClient.setQueryData(authKeys.me(), user)

  return user
}
