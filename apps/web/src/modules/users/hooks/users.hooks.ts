import type { CreateUserPayload, Criteria, UpdateUserPayload } from '@raven/api/exports'
import { usersClient } from '@raven/api/exports'
import { normalizeCriteria } from '@raven/web/utils/criteria-normalizer'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const usersKeys = {
  all: ['users'] as const,

  lists: () => [...usersKeys.all, 'list'] as const,

  list: (criteria?: Criteria) =>
    [...usersKeys.lists(), normalizeCriteria(criteria)] as const,

  details: () => [...usersKeys.all, 'detail'] as const,

  detail: (id: number | string) =>
    [...usersKeys.details(), String(id)] as const,
}

export function useUsers(query?: Criteria) {
  const normalizedQuery = normalizeCriteria(query)

  return useQuery({
    queryKey: usersKeys.list(normalizedQuery),

    queryFn: async () => {
      const res = await usersClient.index.$get({ query: normalizedQuery })

      if (!res.ok)
        throw new Error('Failed to fetch users')
      return res.json()
    },

    select: response => ({
      users: response.data,
      pagination: response.meta,
      apiCode: response.code,
      apiError: response.error,
    }),
  })
}

export function useUser(id: string | number) {
  return useQuery({
    queryKey: usersKeys.detail(id),

    queryFn: async () => {
      const res = await usersClient[':id'].$get({ param: { id: String(id) } })
      if (!res.ok)
        throw new Error('Failed to fetch user')
      return res.json()
    },

    select: response => ({
      user: response.data,
      apiCode: response.code,
      apiError: response.error,
    }),

    enabled: !!id,
  })
}

export function useCreateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateUserPayload) => {
      const res = await usersClient.index.$post({ json: data })
      if (!res.ok)
        throw new Error('Failed to create user')
      return res.json()
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: usersKeys.lists(),
      })
    },
  })
}

export function useUpdateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, data }: { id: string | number, data: UpdateUserPayload }) => {
      const res = await usersClient[':id'].$put({
        param: { id: String(id) },
        json: data,
      })
      if (!res.ok)
        throw new Error('Failed to update user')
      return res.json()
    },

    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({
        queryKey: usersKeys.lists(),
      })

      queryClient.setQueryData(
        usersKeys.detail(variables.id),
        response,
      )
    },
  })
}

export function useDeleteUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string | number) => {
      const res = await usersClient[':id'].$delete({ param: { id: String(id) } })
      if (!res.ok)
        throw new Error('Failed to delete user')
      return res.json()
    },

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: usersKeys.lists(),
      })

      queryClient.removeQueries({
        queryKey: usersKeys.detail(id),
      })
    },
  })
}
