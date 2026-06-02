import type { PaginatedResult } from '@xenon/api/exports'
import type {
	TicketOrderByWithRelationInput,
	TicketSelect,
	TicketWhereInput,
} from '@xenon/api/infrastructure/database/generated/prisma/models'
import type {
	FilterTransformer,
	PaginationTransformer,
	SelectTransformer,
	SortTransformer,
} from '@xenon/api/infrastructure/query'
import { translationKey } from '@xenon/i18n'
import { HTTPException } from 'hono/http-exception'
import type { ParsedQs } from 'qs'
import type { TicketsRepository } from './tickets.repository'
import type {
	CreateTicketPayload,
	Ticket,
	UpdateTicketPayload,
} from './tickets.schema'

export function createTicketsService(
	ticketsRepository: TicketsRepository,
	filterTransformer: FilterTransformer<TicketWhereInput>,
	sortTransformer: SortTransformer<TicketOrderByWithRelationInput>,
	paginationTransformer: PaginationTransformer,
	selectTransformer: SelectTransformer<TicketSelect>,
) {
	return {
		async getAll(query: ParsedQs): Promise<PaginatedResult<Ticket>> {
			const whereInput = filterTransformer.transform(query.filter)
			const orderByInput = sortTransformer.transform(query.sort)
			const paginationInput = paginationTransformer.transform(
				query.page,
				query.limit,
			)
			const selectInput = selectTransformer.transform(query.select)

			return await ticketsRepository.getAll(
				whereInput,
				orderByInput,
				paginationInput,
				selectInput,
			)
		},

		async getById(id: number): Promise<Ticket> {
			const result = await ticketsRepository.getById(id)

			if (!result)
				throw new HTTPException(404, {
					message: translationKey('tickets.errors.notFound'),
				})

			return result
		},

		async create(
			data: CreateTicketPayload,
			creatorId: number,
		): Promise<Ticket> {
			const result = await ticketsRepository.create(data, creatorId)

			if (!result)
				throw new HTTPException(500, {
					message: translationKey('tickets.errors.internalError'),
				})

			return result
		},

		async update(id: number, data: UpdateTicketPayload): Promise<Ticket> {
			const result = await ticketsRepository.update(id, data)

			if (!result)
				throw new HTTPException(404, { message: 'tickets.error.notFound' })

			return result
		},

		async delete(id: number): Promise<Ticket> {
			const result = await ticketsRepository.delete(id)

			if (!result)
				throw new HTTPException(404, { message: 'tickets.error.notFound' })

			return result
		},
	}
}

export type TicketsService = ReturnType<typeof createTicketsService>
