import type { PrismaClient } from '@api/infrastructure/database/prisma'
import { createTicketsHandler } from './tickets.handler'
import { createTicketsRepository } from './tickets.repository'
import { createTicketsService } from './tickets.service'

export function createTicketsModule(prisma: PrismaClient) {
  const repository = createTicketsRepository(prisma)
  const service = createTicketsService(repository)
  const handler = createTicketsHandler(service)

  return { service, handler }
}

export type TicketsModule = ReturnType<typeof createTicketsModule>
