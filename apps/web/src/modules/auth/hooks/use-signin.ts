import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { AuthUser, SigninPayload } from '@xenon/api/exports'
import { authClient } from '@xenon/api/exports'
import { authKeys } from '../auth.keys'

async function signinRequest(payload: SigninPayload): Promise<AuthUser> {
	const res = await authClient.signin.$post({ json: payload })

	const data = await res.json()

	if (!res.ok) {
		const message = 'message' in data ? data.message : 'Signin failed'

		throw new Error(message)
	}

	if ('message' in data) throw new Error(data.message)

	return data
}

export function useSignin() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: authKeys.signin(),

		mutationFn: signinRequest,

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
