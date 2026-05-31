export function normalizeCriteria(criteria: any) {
  if (!criteria)
    return undefined

  return {
    ...criteria,
    page: criteria.page ? String(criteria.page) : undefined,
    limit: criteria.limit ? String(criteria.limit) : undefined,
  }
}
