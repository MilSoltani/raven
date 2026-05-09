import { z } from 'zod'

const OperatorSchema = z.object({
  equals: z.union([z.string(), z.number(), z.boolean(), z.null()]).optional(),
  contains: z.string().optional(),

  in: z.union([
    z.array(z.union([z.string(), z.number(), z.boolean()])),
    z.string(),
  ]).optional(),

  notIn: z.union([
    z.array(z.union([z.string(), z.number(), z.boolean()])),
    z.string(),
  ]).optional(),

  not: z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.null(),
  ]).optional(),

  gt: z.union([z.string(), z.number()]).optional(),
  gte: z.union([z.string(), z.number()]).optional(),
  lt: z.union([z.string(), z.number()]).optional(),
  lte: z.union([z.string(), z.number()]).optional(),
}).strict().openapi('Operator')

type FilterNode
  = | z.infer<typeof OperatorSchema>
    | { [key: string]: FilterNode }

const FilterNodeSchema: z.ZodType<FilterNode> = z.lazy(() =>
  z.union([
    OperatorSchema.strict(),
    z.record(z.string(), FilterNodeSchema),
  ]),
).openapi('FilterNode')

const FilterSchema = z.record(z.string(), FilterNodeSchema).openapi('Filter')

const SortSchema = z.record(
  z.string(),
  z.enum(['asc', 'desc']),
).openapi('Sort')

const SelectSchema = z.union([
  z.string(),
  z.array(z.string()),
]).openapi('Select')

export const RestQuerySchema = z.object({
  select: SelectSchema.optional(),
  filter: FilterSchema.optional(),
  sort: SortSchema.optional(),
  q: z.string().trim().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
}).openapi('RestQuery')

export type RestQuery = z.infer<typeof RestQuerySchema>
export type Sort = z.infer<typeof SortSchema>
