import { zValidator as zv } from '@hono/zod-validator'
import type { ValidationTargets } from 'hono'
import type * as z from 'zod'

export class ValidationException extends Error {
	constructor(public readonly issues: string[]) {
		super('validationError')
	}
}

export function zValidator<
	T extends z.ZodSchema,
	Target extends keyof ValidationTargets,
>(target: Target, schema: T) {
	return zv(target, schema, (result) => {
		if (result.success) return

		throw new ValidationException(
			result.error.issues.map((issue) => issue.message),
		)
	})
}
