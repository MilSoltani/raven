export const usersKeys = {
  all: (query?: Record<string, unknown>) =>
    ['all', query ?? {}] as const,
  create: () => ['all'],
}
