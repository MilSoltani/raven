import type { AuthUser } from '@xenon/api/exports'
import { authClient } from '@xenon/api/exports'
import { queryClient } from '@xenon/web/common/lib/query-client'
import { authKeys } from '../auth.keys'

let refreshPromise: Promise<AuthUser | null> | null = null

async function refreshRequest(): Promise<AuthUser | null> {
	const res = await authClient.refresh.$post({})

	if (!res.ok) return null

	const data = await res.json()

	if ('message' in data) return null

	return data
}

export async function refreshSession() {
	if (refreshPromise) return refreshPromise

	refreshPromise = refreshRequest().finally(() => {
		refreshPromise = null
	})

	const user = await refreshPromise

	if (user) {
		queryClient.setQueryData(authKeys.me(), user)
	}

	return user
}
