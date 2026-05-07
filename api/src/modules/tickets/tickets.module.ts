import type { TicketWhereInput } from '@api/infrastructure/database/generated/prisma/models'
import type { PrismaClient } from '@api/infrastructure/database/prisma'
import { createFilterTransformer } from '@api/infrastructure/query'
import { createTicketsHandler } from './tickets.handler'
import { createTicketsRepository } from './tickets.repository'
import { createTicketsService } from './tickets.service'

export function createTicketsModule(prisma: PrismaClient) {
  const filterTransformer = createFilterTransformer<TicketWhereInput>({
    allowedPaths: [
      'subject',
      'status',
      'priority',
      'creator.id',
      'creator.name',
      'agent.id',
      'agent.name',
    ],
    maxDepth: 3,
  })

  const repository = createTicketsRepository(prisma)
  const service = createTicketsService(repository, filterTransformer)
  const handler = createTicketsHandler(service)

  return { service, handler }
}

export type TicketsModule = ReturnType<typeof createTicketsModule>
