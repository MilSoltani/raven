import { z } from 'zod'

export const paginationMetaSchema = z.object({
  page: z.number(),
  pageSize: z.number(),
  totalItems: z.number(),
  totalPages: z.number(),
  hasNextPage: z.boolean(),
  hasPreviousPage: z.boolean(),
})

export type PaginationMeta = z.infer<typeof paginationMetaSchema>

export type PaginatedResult<T> = {
  data: T[]
  meta: PaginationMeta
}

export function createPaginatedSchema<T extends z.ZodTypeAny>(itemSchema: T) {
  return z.object({
    data: z.array(itemSchema),
    meta: paginationMetaSchema,
  })
}
