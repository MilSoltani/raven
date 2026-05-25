import type { Criteria } from '@raven/api/exports'

export function normalizeCriteria(criteria?: Criteria): Criteria {
  if (!criteria)
    return { page: 1, limit: 10 }

  const normalized: Criteria = {
    ...criteria,
    page: criteria.page ?? 1,
    limit: criteria.limit ?? 10,
  }

  return JSON.parse(JSON.stringify(normalized))
}
