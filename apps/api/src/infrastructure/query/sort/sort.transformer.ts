import { isPlainObject, validatePath } from '../shared.utils'
import { normalizeDirection } from './direction.normalizer'
import type { SortDirection, SortOptions } from './types'

export type SortTransformer<TOrderBy> = {
	transform: (value: unknown) => TOrderBy | undefined
}

export function createSortTransformer<TOrderBy>(
	options: SortOptions,
): SortTransformer<TOrderBy> {
	return {
		transform(rawSortData: unknown): TOrderBy | undefined {
			if (!isPlainObject(rawSortData)) return undefined

			return parseSortDataObject(rawSortData)
		},
	}

	function parseSortDataObject(
		obj: Record<string, unknown>,
		pathStack: string[] = [],
	): TOrderBy {
		const result: Record<string, unknown> = {}

		for (const key of Object.keys(obj)) {
			const newPath = [...pathStack, key]
			const val = obj[key]

			if (isPlainObject(val)) {
				result[key] = parseSortDataObject(val, newPath)
				continue
			}

			validatePath(newPath, options.maxDepth, options.allowedPaths)

			const direction: SortDirection = normalizeDirection(val)

			result[key] = direction
		}

		return result as TOrderBy
	}
}
