import type { TicketsRepository } from './tickets.repository'
import type { CreateTicketPayload, Ticket, UpdateTicketPayload } from './tickets.schema'
import {
  InternalException,
  NotFoundException,
} from '@api/infrastructure/errors/exceptions'

export function createTicketsService(ticketsRepository: TicketsRepository) {
  return {
    async getAll(): Promise<Ticket[]> {
      return await ticketsRepository.getAll()
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
