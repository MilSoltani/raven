import type { User } from '@raven/api/exports'
import { usersClient } from '@raven/api/exports'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { usersKeys } from '../users.keys'

async function deleteUserRequest(id: number): Promise<void> {
  const res = await usersClient[':id'].$delete({ param: { id } })

  if (!res.ok) {
    const result: any = null

    throw new Error(result?.message ?? 'Delete failed')
  }
}

export function useDeleteUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteUserRequest,

    onSuccess: (_, id) => {
      queryClient.setQueriesData(
        { queryKey: ['users', 'list'] },
        (old: User[] | undefined) =>
          old?.filter(u => u.id !== id),
      )
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: usersKeys.all,
      })
    },
  })
}
