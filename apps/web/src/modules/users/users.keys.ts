export const usersKeys = {
  users: (query?: Record<string, unknown>) =>
    ['users', query ?? {}] as const,
}
