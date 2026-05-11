export const authKeys = {
  all: ['auth'] as const,
  me: () => [...authKeys.all, 'me'] as const,
  login: () => [...authKeys.all, 'login'] as const,
  signup: () => [...authKeys.all, 'signup'] as const,
  refresh: () => [...authKeys.all, 'refresh'] as const,
  logout: () => [...authKeys.all, 'logout'] as const,
}
