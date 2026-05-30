import type { CreateUserPayload, Criteria, UpdateUserPayload } from '@raven/api/exports'
import { usersClient } from '@raven/api/exports'
import { normalizeCriteria } from '@raven/web/common/utils/criteria-normalizer'
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

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

    placeholderData: keepPreviousData,

    select: response => ({
      users: response.data,
      pagination: response.meta,
      responseMessage: response.messageKey,
      apiError: response.error,
    }),

  })
}

export function useUser(id: number, enabled: boolean = true) {
  return useQuery({
    queryKey: usersKeys.detail(id),

    queryFn: async () => {
      const res = await usersClient[':id'].$get({ param: { id } })
      if (!res.ok)
        throw new Error('Failed to fetch user')
      return res.json()
    },

    select: response => ({
      user: response.data,
      responseMessage: response.messageKey,
      apiError: response.error,
    }),

    enabled: !!id && enabled,
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
    mutationFn: async ({ id, data }: { id: number, data: UpdateUserPayload }) => {
      const res = await usersClient[':id'].$put({
        param: { id },
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
    mutationFn: async (id: number) => {
      const res = await usersClient[':id'].$delete({ param: { id } })
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
