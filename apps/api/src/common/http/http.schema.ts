import { paginationMetaSchema } from '@raven/api/exports'
import { z } from 'zod'

export type ApiResponse<TData, TMeta = null, TError = null> = {
  messageKey: string
  data: TData
  meta: TMeta
  error: TError
}

export function ApiResponseSchema<T>(dataSchema: T) {
  return z.object({
    messageKey: z.string(),
    data: dataSchema,
    meta: paginationMetaSchema.nullable(),
    error: z.unknown().nullable().optional(),
  })
}

export const IdParamSchema = z.object({
  id: z.coerce.number().int().positive().openapi({
    param: { name: 'id', in: 'path' },
    example: 1,
  }),
})
