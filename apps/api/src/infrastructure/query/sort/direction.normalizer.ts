import type { SortDirection } from './types'

export function normalizeDirection(value: unknown): SortDirection {
	if (typeof value !== 'string') {
		throw new TypeError('Sort must be "asc" or "desc"')
	}

	const normalized = value.toLowerCase()

	if (normalized !== 'asc' && normalized !== 'desc') {
		throw new Error('Sort must be "asc" or "desc"')
	}

	return normalized
}
