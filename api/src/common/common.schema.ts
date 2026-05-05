import z from 'zod'

export const IdParamSchema = z.object({
  id: z.coerce.number().int().positive().openapi({
    param: { name: 'id', in: 'path' },
    example: 1,
  }),
})

export const ErrorSchema = z.object({
  success: z.boolean(),
  message: z.string(),
})
