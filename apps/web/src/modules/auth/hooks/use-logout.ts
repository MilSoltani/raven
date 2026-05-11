import { authClient } from '@raven/api/exports'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authKeys } from '../auth.keys'

async function logoutRequest(): Promise<void> {
  const res = await authClient.logout.$post({})

  if (!res.ok)
    throw new Error('Logout failed')
}

export function useLogout() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: authKeys.logout(),

    mutationFn: logoutRequest,

    onSuccess: async () => {
      await queryClient.cancelQueries({
        queryKey: authKeys.all,
      })

      queryClient.setQueryData(authKeys.me(), null)

      queryClient.removeQueries({
        queryKey: authKeys.all,
      })
    },
  })
}
