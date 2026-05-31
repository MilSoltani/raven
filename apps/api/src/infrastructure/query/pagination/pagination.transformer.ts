import type { PaginationOptions, PrismaPagination } from './types'
import { HTTPException } from 'hono/http-exception'

export type PaginationTransformer = {
  transform: (page: unknown, limit: unknown) => PrismaPagination
}

export function createPaginationTransformer(
  options: PaginationOptions = {},
): PaginationTransformer {
  const defaultLimit = options.defaultLimit ?? 25
  const maxLimit = options.maxLimit ?? 100

  return {
    transform(page: unknown, limit: unknown): PrismaPagination {
      const parsedPage = parseNumber(page, 1)
      const parsedLimit = parseNumber(limit, defaultLimit)

      if (parsedLimit > maxLimit)
        throw new HTTPException(400, { message: 'query.error.maxLimitExceeded' })

      return {
        skip: (parsedPage - 1) * parsedLimit,
        take: parsedLimit,
      }
    },
  }

  function parseNumber(
    value: unknown,
    fallback: number,
  ): number {
    if (value === undefined || value === null || value === '') {
      return fallback
    }

    const n = Number(value)

    if (!Number.isInteger(n) || n < 1)
      throw new HTTPException(400, { message: 'query.error.nonNumberPageLimit' })

    return n
  }
}
