import type { QueryResponseKeys } from '../query-response.keys'
import type { PaginationOptions, PrismaPagination } from './types'
import { appExceptionFactory } from '@raven/api/common/http/app.exception'
import { queryResponseKeys } from '../query-response.keys'

const appException = appExceptionFactory<QueryResponseKeys>()

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
        throw appException(queryResponseKeys.error.maxLimitExceeded, 400)

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
      throw appException(queryResponseKeys.error.nonNumberPageLimit, 400)

    return n
  }
}
