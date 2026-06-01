import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { AuthUser, SignupPayload } from '@xenon/api/exports'
import { authClient } from '@xenon/api/exports'
import { authKeys } from '../auth.keys'

async function signupRequest(payload: SignupPayload): Promise<AuthUser> {
	const res = await authClient.signup.$post({ json: payload })

	const data = await res.json()

	if (!res.ok) {
		const message = 'message' in data ? data.message : 'Signup failed'

		throw new Error(message)
	}

	if ('message' in data) throw new Error(data.message)

	return data
}

export function useSignup() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: authKeys.signup(),

		mutationFn: signupRequest,

		onSuccess: (data) => {
			queryClient.setQueryData(authKeys.me(), data)
		},

		onSettled: async () => {
			await queryClient.invalidateQueries({
				queryKey: authKeys.me(),
			})
		},
	})
}
