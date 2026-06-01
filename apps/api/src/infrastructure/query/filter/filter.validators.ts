import { HTTPException } from 'hono/http-exception'

export function validateOperatorObject(obj: Record<string, unknown>) {
	if (obj.eq !== undefined && Object.keys(obj).length > 1)
		throw new HTTPException(400, {
			message: 'query.error.operatorCombinationError',
		})
}

export function isFilterCondition(obj: unknown) {
	const OPERATORS = [
		'equals',
		'contains',
		'in',
		'notIn',
		'not',
		'gt',
		'gte',
		'lt',
		'lte',
	]

	return Object.keys(obj).every((key) => OPERATORS.includes(key))
}
