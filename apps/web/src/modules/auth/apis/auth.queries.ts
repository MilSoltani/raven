import type {
  AuthResponse,
  LoginPayload,
  SignupPayload,
} from '@raven/api/exports'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createAuthApis } from './auth.apis'

const auth = createAuthApis()

export const authKeys = {
  all: ['auth'] as const,
  me: () => [...authKeys.all, 'me'] as const,
}

export function useAuthRefresh() {
  return useQuery({
    queryKey: authKeys.me(),
    queryFn: () => auth.refresh(),
    retry: false,
  })
}

export function useLogin() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: LoginPayload) => auth.login(payload),
    onSuccess: (data: AuthResponse) => {
      queryClient.setQueryData(authKeys.me(), data)
    },
  })
}

export function useSignup() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: SignupPayload) => auth.signup(payload),
    onSuccess: (data: AuthResponse) => {
      queryClient.setQueryData(authKeys.me(), data)
    },
  })
}

export function useLogout() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => auth.logout(),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: authKeys.all })
    },
  })
}
