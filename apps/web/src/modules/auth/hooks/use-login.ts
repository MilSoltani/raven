import type { AuthUser, LoginPayload } from '@raven/api/exports'
import { authClient } from '@raven/api/exports'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authKeys } from '../auth.keys'

async function loginRequest(
  payload: LoginPayload,
): Promise<AuthUser> {
  const res = await authClient.login.$post({ json: payload })

  const data = await res.json()

  if (!res.ok) {
    const message = 'message' in data
      ? data.message
      : 'Login failed'

    throw new Error(message)
  }

  if ('message' in data)
    throw new Error(data.message)

  return data
}

export function useLogin() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: authKeys.login(),

    mutationFn: loginRequest,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: authKeys.me(),
      })
    },

    onError: () => {
      queryClient.setQueryData(authKeys.me(), null)
    },
  })
}
