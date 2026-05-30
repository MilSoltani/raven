import type { PaginatedResult } from '@raven/api/exports'
import type { TicketOrderByWithRelationInput, TicketSelect, TicketWhereInput } from '@raven/api/infrastructure/database/generated/prisma/models'
import type { FilterTransformer, PaginationTransformer, SelectTransformer, SortTransformer } from '@raven/api/infrastructure/query'
import type { ParsedQs } from 'qs'
import type { TicketsRepository } from './tickets.repository'
import type { CreateTicketPayload, Ticket, UpdateTicketPayload } from './tickets.schema'
import { apiException } from '@raven/api/common/http/api.exception'

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
      const paginationInput = paginationTransformer.transform(query.page, query.limit)
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
        throw apiException('tickets.error.notFound', 404)

      return result
    },

    async create(data: CreateTicketPayload, creatorId: number): Promise<Ticket> {
      const result = await ticketsRepository.create(data, creatorId)

      if (!result)
        throw apiException('tickets.error.internalError', 500)

      return result
    },

    async update(id: number, data: UpdateTicketPayload): Promise<Ticket> {
      const result = await ticketsRepository.update(id, data)

      if (!result)
        throw apiException('tickets.error.notFound', 404)

      return result
    },

    async delete(id: number): Promise<Ticket> {
      const result = await ticketsRepository.delete(id)

      if (!result)
        throw apiException('tickets.error.notFound', 404)

      return result
    },
  }
}

export type TicketsService = ReturnType<typeof createTicketsService>
