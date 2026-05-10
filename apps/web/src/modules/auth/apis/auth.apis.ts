import type {
  AuthResponse,
  LoginPayload,
  SignupPayload,
} from '@raven/api/exports'

import { authClient } from '@raven/api/exports'
import { parseApiError } from '@raven/web/errors/api-errors'
import { mapAuthError } from './auth.errors'

const opts = {
  init: {
    credentials: 'include' as const,
  },
}

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const apiError = await parseApiError(res)
    throw mapAuthError(apiError)
  }

  return res.json()
}

export function createAuthApis() {
  return {
    async login(payload: LoginPayload): Promise<AuthResponse> {
      const res = await authClient.login.$post(
        { json: payload },
        opts,
      )

      return handle<AuthResponse>(res)
    },

    async signup(payload: SignupPayload): Promise<AuthResponse> {
      const res = await authClient.signup.$post(
        { json: payload },
        opts,
      )

      return handle<AuthResponse>(res)
    },

    async refresh(): Promise<AuthResponse> {
      const res = await authClient.refresh.$post(
        {},
        opts,
      )

      return handle<AuthResponse>(res)
    },

    async logout(): Promise<{ message: string }> {
      const res = await authClient.logout.$post(
        {},
        opts,
      )

      return handle<{ message: string }>(res)
    },
  }
}
