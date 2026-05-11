import type { AuthUser } from '@raven/api/exports'
import { authClient } from '@raven/api/exports'
import { useQuery } from '@tanstack/react-query'
import { authKeys } from '../auth.keys'

async function getMe(): Promise<AuthUser | null> {
  const res = await authClient.me.$get()

  if (res.status === 401)
    return null

  const data = await res.json()

  if (!res.ok || 'message' in data)
    return null

  return data
}

export function useMe() {
  return useQuery({
    queryKey: authKeys.me(),
    queryFn: getMe,

    retry: false,

    staleTime: 1000 * 60 * 5, // 5 min

    refetchOnWindowFocus: true,
  })
}
