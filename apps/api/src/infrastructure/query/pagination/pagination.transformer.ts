import type { PaginationOptions, PrismaPagination } from './types'
import { BadRequestException } from '@raven/api/infrastructure/errors/exceptions'

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
      const parsedPage = parseNumber(page, 1, 'page')
      const parsedLimit = parseNumber(limit, defaultLimit, 'limit')

      if (parsedLimit > maxLimit) {
        throw new BadRequestException(
          `Limit cannot exceed ${maxLimit}`,
        )
      }

      return {
        skip: (parsedPage - 1) * parsedLimit,
        take: parsedLimit,
      }
    },
  }

  function parseNumber(
    value: unknown,
    fallback: number,
    name: string,
  ): number {
    if (value === undefined || value === null || value === '') {
      return fallback
    }

    const n = Number(value)

    if (!Number.isInteger(n) || n < 1) {
      throw new BadRequestException(
        `${name} must be a positive integer`,
      )
    }

    return n
  }
}
