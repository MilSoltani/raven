export type AllowedRelations = Record<string, readonly string[]>

export interface SelectOptions {
  allowedColumns: string[]
  allowedRelations: AllowedRelations
  requiredColumns?: string[]
}

export type PrismaSelect = Record<
  string,
  true | { select: Record<string, true> }
>
