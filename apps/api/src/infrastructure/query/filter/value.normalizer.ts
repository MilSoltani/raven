const CASE_INSENSITIVE_OPERATORS = new Set([
	'contains',
	'startsWith',
	'endsWith',
])

export function normalizeOperatorObject(obj: Record<string, unknown>) {
	const result: Record<string, unknown> = {}

	for (const key of Object.keys(obj)) {
		const val = obj[key]

		if (['in', 'notIn'].includes(key) && typeof val === 'string') {
			result[key] = val.split(',').map((v) => normalizeValue(v.trim()))

			continue
		}

		result[key] = normalizeValue(val)
	}

	const hasInsensitiveOperator = Object.keys(result).some((key) =>
		CASE_INSENSITIVE_OPERATORS.has(key),
	)

	if (hasInsensitiveOperator) {
		result.mode = 'insensitive'
	}

	return result
}

export function normalizeValue(val: unknown): unknown {
	if (val === 'true') return true
	if (val === 'false') return false
	if (val === 'null') return null

	if (typeof val === 'string') {
		let trimmed = val.trim()

		if (
			(trimmed.startsWith('"') && trimmed.endsWith('"')) ||
			(trimmed.startsWith("'") && trimmed.endsWith("'"))
		) {
			trimmed = trimmed.slice(1, -1)
		}

		const isStrictNumber = /^-?\d+(?:\.\d+)?$/.test(trimmed)

		if (isStrictNumber) {
			return Number(trimmed)
		}

		return trimmed
	}

	return val
}
