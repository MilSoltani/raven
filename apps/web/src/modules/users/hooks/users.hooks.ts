import type { CreateUserPayload, Criteria, UpdateUserPayload } from '@raven/api/exports'
import { usersClient } from '@raven/api/exports'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const usersKeys = {
  all: ['users'] as const,

  lists: () => [...usersKeys.all, 'list'] as const,

  list: (query: unknown) =>
    [...usersKeys.lists(), query] as const,

  details: () => [...usersKeys.all, 'detail'] as const,

  detail: (id: number) =>
    [...usersKeys.details(), id] as const,
}

export function useUsers(query: Criteria) {
  return useQuery({
    queryKey: usersKeys.list(query),

    queryFn: async () => {
      const res = await usersClient.index.$get({ query })

      if (!res.ok)
        throw new Error('Failed to fetch users')

      return res.json()
    },
  })
}

export function useUser(id: number) {
  return useQuery({
    queryKey: usersKeys.detail(id),

    queryFn: async () => {
      const res = await usersClient[':id'].$get({ param: { id } })

      if (!res.ok)
        throw new Error('Failed to fetch user')

      return res.json()
    },

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
    mutationFn: async ({ id, data }: { id: number, data: UpdateUserPayload }) => {
      const res = await usersClient[':id'].$put({ param: { id }, json: data })

      if (!res.ok)
        throw new Error('Failed to update user')

      return res.json()
    },

    onSuccess: (updatedUser, variables) => {
      queryClient.invalidateQueries({
        queryKey: usersKeys.lists(),
      })

      queryClient.setQueryData(
        usersKeys.detail(variables.id),
        updatedUser,
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
