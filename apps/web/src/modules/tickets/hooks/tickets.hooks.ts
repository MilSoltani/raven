import {
	keepPreviousData,
	useMutation,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query'
import type {
	CreateTicketPayload,
	Criteria,
	UpdateTicketPayload,
} from '@xenon/api/exports'
import { TicketSchema, ticketsClient } from '@xenon/api/exports'
import { normalizeCriteria } from '@xenon/web/common/utils/criteria-normalizer'

export const ticketsKeys = {
	all: ['tickets'] as const,
	lists: () => [...ticketsKeys.all, 'list'] as const,
	list: (criteria?: Criteria) =>
		[...ticketsKeys.lists(), normalizeCriteria(criteria)] as const,
	details: () => [...ticketsKeys.all, 'detail'] as const,
	detail: (id: number | string) =>
		[...ticketsKeys.details(), String(id)] as const,
}

export function useTickets(query?: Criteria) {
	const normalizedQuery = normalizeCriteria(query)

	return useQuery({
		queryKey: ticketsKeys.list(normalizedQuery),
		queryFn: async () => {
			const res = await ticketsClient.index.$get({ query: normalizedQuery })

			if (!res.ok) throw await res.json()

			const data = await res.json()

			return {
				...data,
				items: data.items.map((u: unknown) => TicketSchema.parse(u)),
			}
		},
		placeholderData: keepPreviousData,
	})
}

export function useTicket(id: number, enabled: boolean = true) {
	return useQuery({
		queryKey: ticketsKeys.detail(id),
		queryFn: async () => {
			const res = await ticketsClient[':id'].$get({ param: { id: String(id) } })

			if (!res.ok) throw await res.json()

			const data = await res.json()

			return TicketSchema.parse(data)
		},
		enabled: !!id && enabled,
	})
}

export function useCreateTicket() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (data: CreateTicketPayload) => {
			const res = await ticketsClient.index.$post({ json: data })

			if (!res.ok) throw await res.json()

			const body = await res.json()

			return TicketSchema.parse(body)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ticketsKeys.lists() })
		},
	})
}

export function useUpdateTicket() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async ({
			id,
			data,
		}: {
			id: number
			data: UpdateTicketPayload
		}) => {
			const res = await ticketsClient[':id'].$put({
				param: { id: String(id) },
				json: data,
			})

			if (!res.ok) throw await res.json()

			const body = await res.json()

			return TicketSchema.parse(body)
		},
		onSuccess: (updatedTicket, variables) => {
			queryClient.invalidateQueries({ queryKey: ticketsKeys.lists() })

			queryClient.setQueryData(ticketsKeys.detail(variables.id), updatedTicket)
		},
	})
}

export function useDeleteTicket() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (id: number) => {
			const res = await ticketsClient[':id'].$delete({
				param: { id: String(id) },
			})

			if (!res.ok) throw await res.json()

			const body = await res.json()
			return TicketSchema.parse(body)
		},
		onSuccess: (_, id) => {
			queryClient.invalidateQueries({ queryKey: ticketsKeys.lists() })
			queryClient.removeQueries({ queryKey: ticketsKeys.detail(id) })
		},
	})
}
