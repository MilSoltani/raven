import type { TicketOrderByWithRelationInput, TicketWhereInput } from '@api/infrastructure/database/generated/prisma/models'
import type { FilterTransformer, SortTransformer } from '@api/infrastructure/query'
import type { ParsedQs } from 'qs'
import type { TicketsRepository } from './tickets.repository'
import type { CreateTicketPayload, Ticket, UpdateTicketPayload } from './tickets.schema'
import {
  InternalException,
  NotFoundException,
} from '@api/infrastructure/errors/exceptions'

export function createTicketsService(
  ticketsRepository: TicketsRepository,
  filterTransformer: FilterTransformer<TicketWhereInput>,
  sortTransformer: SortTransformer<TicketOrderByWithRelationInput>,
) {
  return {
    async getAll(query: ParsedQs): Promise<Ticket[]> {
      const whereInput = filterTransformer.transform(query.filter)
      const orderByInput = sortTransformer.transform(query.sort)

      return await ticketsRepository.getAll(whereInput, orderByInput)
    },

    async getById(id: number): Promise<Ticket> {
      const result = await ticketsRepository.getById(id)

      if (!result)
        throw new NotFoundException('Ticket')

      return result
    },

    async create(data: CreateTicketPayload, creatorId: number): Promise<Ticket> {
      const result = await ticketsRepository.create(data, creatorId)

      if (!result)
        throw new InternalException('Ticket creation')

      return result
    },

    async update(id: number, data: UpdateTicketPayload): Promise<Ticket> {
      const result = await ticketsRepository.update(id, data)

      if (!result)
        throw new NotFoundException('Ticket')

      return result
    },

    async delete(id: number): Promise<Ticket> {
      const result = await ticketsRepository.delete(id)

      if (!result)
        throw new NotFoundException('Ticket')

      return result
    },
  }
}

export type TicketsService = ReturnType<typeof createTicketsService>
