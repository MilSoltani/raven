import type { PrismaSelect, SelectOptions } from './types'
import { BadRequestException } from '@api/infrastructure/errors/exceptions'

export interface SelectTransformer<TSelect> {
  transform: (value: unknown) => TSelect | undefined
}

export function createSelectTransformer<TSelect>(
  options: SelectOptions,
): SelectTransformer<TSelect> {
  const allowedColumns = new Set(options.allowedColumns)
  const requiredColumns = new Set(options.requiredColumns ?? [])

  const allowedRelations = options.allowedRelations

  return {
    transform(rawSelectData: unknown): TSelect | undefined {
      const fields = parseFields(rawSelectData)
      return processFields(fields) as TSelect
    },
  }

  function parseFields(value: unknown): string[] {
    if (typeof value === 'string')
      return value.split(',').map(v => v.trim()).filter(Boolean)

    if (Array.isArray(value))
      return value

    return []
  }

  function processFields(fields: string[]): PrismaSelect | undefined {
    const select: PrismaSelect = {}

    for (const field of fields) {
      if (allowedColumns.has(field)) {
        select[field] = true
        continue
      }

      const relationFields = allowedRelations[field]

      if (relationFields) {
        select[field] = {
          select: buildRelationSelect(relationFields),
        }

        continue
      }

      throw new BadRequestException(
        `Field "${field}" is not allowed`,
      )
    }

    for (const field of requiredColumns) {
      select[field] = true
    }

    return Object.keys(select).length ? select : undefined
  }

  function buildRelationSelect(fields: readonly string[]) {
    const result: Record<string, true> = {}

    for (const field of fields) {
      const normalized = field.split(',').map(v => v.trim()).filter(Boolean)

      for (const f of normalized) {
        result[f] = true
      }
    }

    return result
  }
}
