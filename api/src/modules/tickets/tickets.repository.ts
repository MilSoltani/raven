import type { TicketOrderByWithRelationInput, TicketWhereInput } from '@api/infrastructure/database/generated/prisma/models'
import type { PrismaClient } from '@api/infrastructure/database/prisma'
import type { PrismaPagination } from '@api/infrastructure/query'
import type { CreateTicketPayload, Ticket, UpdateTicketPayload } from './tickets.schema'

export function createTicketsRepository(prisma: PrismaClient) {
  const getAll = async (
    whereInput: TicketWhereInput | undefined,
    orderByInput: TicketOrderByWithRelationInput | undefined,
    paginationInput: PrismaPagination,
  ): Promise<Ticket[]> => {
    return prisma.ticket.findMany({
      where: whereInput,
      orderBy: orderByInput,
      ...paginationInput,
    })
  }

  const getById = async (id: number): Promise<Ticket | null> => {
    return prisma.ticket.findUnique({
      where: { id },
    })
  }

  const create = async (data: CreateTicketPayload, creatorId: number): Promise<Ticket> => {
    return prisma.ticket.create({ data: { creatorId, ...data } })
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
