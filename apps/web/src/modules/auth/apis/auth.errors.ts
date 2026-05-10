import type { ApiError } from '@raven/web/errors/api-errors'

export function mapAuthError(err: ApiError): Record<string, string> {
  if (err.status === 401) {
    return { root: 'Invalid email or password' }
  }

  if (err.status === 429) {
    return { root: 'Too many attempts. Try again later.' }
  }

  if (err.status === 409) {
    return { root: 'Account already exists' }
  }

  if (err.status === 422 && err.fields) {
    return err.fields
  }

  return {
    root: err.message ?? 'Unexpected error',
  }
}
