import type { PaginatedResult } from '@xenon/api/infrastructure/database'
import type { TicketOrderByWithRelationInput, TicketSelect, TicketWhereInput } from '@xenon/api/infrastructure/database/generated/prisma/models'
import type { PrismaClient } from '@xenon/api/infrastructure/database/prisma'
import type { PrismaPagination } from '@xenon/api/infrastructure/query'
import type { CreateTicketPayload, Ticket, UpdateTicketPayload } from './tickets.schema'
import { paginatePrisma } from '@xenon/api/infrastructure/database'

export function createTicketsRepository(prisma: PrismaClient) {
  const getAll = async (
    whereInput: TicketWhereInput | undefined,
    orderByInput: TicketOrderByWithRelationInput | undefined,
    paginationInput: PrismaPagination,
    selectInput: TicketSelect | undefined,
  ): Promise<PaginatedResult<Ticket>> => {
    return paginatePrisma({
      model: prisma.ticket,
      where: whereInput,
      orderBy: orderByInput,
      select: selectInput,
      pagination: paginationInput,
    })
  }

  const getById = async (id: number): Promise<Ticket | null> => {
    return prisma.ticket.findUnique({
      where: { id },
    })
  }

  const create = async (data: CreateTicketPayload, creatorId: number): Promise<Ticket> => {
    return prisma.ticket.create({
      data: {
        createdAt: new Date(),
        creatorId,
        ...data,
      },
    })
  }

  const update = async (
    id: number,
    data: UpdateTicketPayload,
  ): Promise<Ticket> => {
    return prisma.ticket.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    })
  }

  const remove = async (id: number): Promise<Ticket> => {
    return prisma.ticket.delete({
      where: { id },
    })
  }

  return {
    getAll,
    getById,
    create,
    update,
    delete: remove,
  }
}

export type TicketsRepository = ReturnType<typeof createTicketsRepository>
