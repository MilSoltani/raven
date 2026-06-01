export const authKeys = {
	all: ['auth'] as const,
	me: () => [...authKeys.all, 'me'] as const,
	signin: () => [...authKeys.all, 'signin'] as const,
	signup: () => [...authKeys.all, 'signup'] as const,
	refresh: () => [...authKeys.all, 'refresh'] as const,
	signout: () => [...authKeys.all, 'signout'] as const,
}
