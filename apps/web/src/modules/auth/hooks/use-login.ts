import type {
  AuthUser,

  LoginPayload,
} from '@raven/api/exports'

import { authClient } from '@raven/api/exports'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const authKeys = {
  all: ['auth'] as const,
  me: () => [...authKeys.all, 'me'] as const,
}

const REQUEST_OPTS = {
  init: {
    credentials: 'include' as const,
  },
}

async function loginRequest(
  payload: LoginPayload,
): Promise<AuthUser> {
  const res = await authClient.login.$post(
    { json: payload },
    REQUEST_OPTS,
  )

  const data = await res.json()

  if (!res.ok) {
    const message
      = 'message' in data
        ? data.message
        : 'Login failed'

    throw new Error(message)
  }

  if ('message' in data) {
    throw new Error(data.message)
  }

  return data
}

export function useLogin() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [...authKeys.all, 'login'],
    mutationFn: loginRequest,

    onSuccess: (data) => {
      queryClient.setQueryData(
        authKeys.me(),
        { id: data.id, email: data.email },
      )
    },
  })
}
