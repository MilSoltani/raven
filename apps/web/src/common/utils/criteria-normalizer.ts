import type { Criteria } from '@xenon/api/exports'

export function normalizeCriteria(criteria: Criteria | undefined) {
	if (!criteria) return undefined

	return {
		...criteria,
		page: criteria.page ? String(criteria.page) : undefined,
		limit: criteria.limit ? String(criteria.limit) : undefined,
	}
}
