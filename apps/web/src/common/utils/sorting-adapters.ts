import type { SortingState } from '@tanstack/react-table'
import type { Sort } from '@xenon/api/exports'

export function sortToSorting(sort?: Sort): SortingState {
	if (!sort) return []

	return Object.entries(sort).map(([id, dir]) => ({
		id,
		desc: dir === 'desc',
	}))
}

export function sortingToSort(sorting: SortingState): Sort | undefined {
	if (!sorting.length) return undefined

	return {
		[sorting[0].id]: sorting[0].desc ? 'desc' : 'asc',
	}
}
