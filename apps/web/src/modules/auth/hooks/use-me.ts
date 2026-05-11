import type { AuthUser } from '@raven/api/exports'
import { authClient } from '@raven/api/exports'
import { useQuery } from '@tanstack/react-query'
import { authKeys } from '../auth.keys'
import { refreshSession } from './use-refresh'

async function getMe(): Promise<AuthUser | null> {
  const res = await authClient.me.$get({})

  if (res.ok) {
    const data = await res.json()
    if ('message' in data)
      return null
    return data
  }

  // only attempt refresh on 401
  if (res.status === 401) {
    const refreshed = await refreshSession()

    if (!refreshed)
      return null

    const retry = await authClient.me.$get({})

    if (!retry.ok)
      return null

    const data = await retry.json()

    if ('message' in data)
      return null

    return data
  }

  return null
}

export function useMe() {
  return useQuery({
    queryKey: authKeys.me(),
    queryFn: getMe,

    retry: false,

    staleTime: 1000 * 60 * 5,

    refetchOnWindowFocus: false,
  })
}
