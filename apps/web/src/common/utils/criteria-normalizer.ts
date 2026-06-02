import type { Criteria } from '@xenon/api/exports'

export function normalizeCriteria(criteria: Criteria | undefined) {
	if (!criteria) return {}

	return {
		...criteria,
		page: String(criteria.page),
		limit: String(criteria.limit),
	}
}
