import type { PrismaPagination } from '@raven/api/infrastructure/query'
import type { PaginatedResult } from './paginator.schema'

export async function paginatePrisma<T, W, O, S>(args: {
  model: {
    findMany: (args: any) => Promise<T[]>
    count: (args: any) => Promise<number>
  }
  where?: W
  orderBy?: O
  select?: S
  pagination: PrismaPagination
}): Promise<PaginatedResult<T>> {
  const { skip = 0, take = 10 } = args.pagination

  const page = Math.floor(skip / take) + 1
  const pageSize = take

  const [data, totalItems] = await Promise.all([
    args.model.findMany({
      where: args.where,
      orderBy: args.orderBy,
      select: args.select,
      skip,
      take,
    }),
    args.model.count({ where: args.where }),
  ])

  const totalPages = Math.ceil(totalItems / pageSize)

  return {
    data,
    meta: {
      page,
      pageSize,
      totalItems,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  }
}
