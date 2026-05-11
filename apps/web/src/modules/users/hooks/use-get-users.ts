import type { Criteria, User } from '@raven/api/exports'
import { usersClient } from '@raven/api/exports'
import { useQuery } from '@tanstack/react-query'
import { usersKeys } from '../users.keys'

const query: Criteria = {
  select: ['id', 'name', 'email'],
  limit: 25,
  page: 1,
}

async function getUsers(): Promise<User[]> {
  const res = await usersClient.index.$get({ query })

  if (!res.ok)
    throw new Error('Failed to fetch users')

  const data = await res.json()

  if (Array.isArray(data))
    return data

  return []
}

export function useUsers() {
  return useQuery({
    queryKey: usersKeys.all(query),
    queryFn: getUsers,
    retry: false,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  })
}
