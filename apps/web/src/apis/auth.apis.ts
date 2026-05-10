import type {
  AuthResponse,
  LoginPayload,
  SignupPayload,
} from '@raven/api/exports'

import { authClient } from '@raven/api/exports'

export function createAuthApis() {
  const opts = {
    init: {
      credentials: 'include' as const,
    },
  }

  return {
    async login(payload: LoginPayload): Promise<AuthResponse> {
      const res = await authClient.login.$post(
        { json: payload },
        opts,
      )

      if (!res.ok) {
        throw new Error(res.statusText)
      }

      return res.json()
    },

    async signup(payload: SignupPayload): Promise<AuthResponse> {
      const res = await authClient.signup.$post(
        { json: payload },
        opts,
      )

      if (!res.ok) {
        throw new Error(res.statusText)
      }

      return res.json()
    },

    async refresh(): Promise<AuthResponse> {
      const res = await authClient.refresh.$post(
        {},
        opts,
      )

      if (!res.ok) {
        throw new Error(res.statusText)
      }

      return res.json()
    },

    async logout(): Promise<{ message: string }> {
      const res = await authClient.logout.$post(
        {},
        opts,
      )

      if (!res.ok) {
        throw new Error(res.statusText)
      }

      return res.json()
    },
  }
}
