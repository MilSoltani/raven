import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authClient } from '@xenon/api/exports'
import { authKeys } from '../auth.keys'

async function signoutRequest(): Promise<void> {
  const res = await authClient.signout.$post({})

  if (!res.ok)
    throw new Error('Signout failed')
}

export function useSignout() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: authKeys.signout(),

    mutationFn: signoutRequest,

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
