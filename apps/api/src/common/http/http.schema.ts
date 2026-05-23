import { paginationMetaSchema } from '@raven/api/exports'
import { z } from 'zod'

export function ApiResponseSchema<T>(dataSchema: T) {
  return z.object({
    event: z.string(),
    data: dataSchema,
    meta: paginationMetaSchema.nullable().optional(),
  })
}

export type ApiResponse<TData> = {
  event: string
  data: TData
  meta?: unknown | null
}

export const IdParamSchema = z.object({
  id: z.coerce.number().int().positive().openapi({
    param: { name: 'id', in: 'path' },
    example: 1,
  }),
})
