import type { CreateUserPayload, User } from '@raven/api/exports'
import { usersClient } from '@raven/api/exports'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { usersKeys } from '../users.keys'

async function createUserRequest(
  payload: CreateUserPayload,
): Promise<User> {
  const res = await usersClient.index.$post({ json: payload })

  const data = await res.json()

  if (!res.ok) {
    const message
      = 'message' in data
        ? data.message
        : 'Signup failed'

    throw new Error(message)
  }

  if ('message' in data)
    throw new Error(data.message)

  return data
}

export function useCreateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: usersKeys.create(),

    mutationFn: createUserRequest,

    onSuccess: (data) => {
      queryClient.setQueryData(usersKeys.create(), data)
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: usersKeys.all(),
      })
    },
  })
}
