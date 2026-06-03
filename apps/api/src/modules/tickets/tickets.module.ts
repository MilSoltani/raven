import type {
	TicketOrderByWithRelationInput,
	TicketSelect,
	TicketWhereInput,
} from '@xenon/api/infrastructure/database/generated/prisma/models'
import type { PrismaClient } from '@xenon/api/infrastructure/database/prisma'
import {
	createFilterTransformer,
	createPaginationTransformer,
	createSelectTransformer,
	createSortTransformer,
} from '@xenon/api/infrastructure/query'
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

	const sortTransformer = createSortTransformer<TicketOrderByWithRelationInput>(
		{
			allowedPaths: [
				'subject',
				'status',
				'priority',
				'creator.name',
				'agent.name',
			],
			maxDepth: 2,
		},
	)

	const paginationTransformer = createPaginationTransformer()

	const selectTransformer = createSelectTransformer<TicketSelect>({
		allowedColumns: [
			'id',
			'creatorId',
			'agentId ',
			'subject',
			'description',
			'status',
			'priority',
			'createdAt',
			'updatedAt',
		],
		allowedRelations: {
			creator: ['id, name'],
			agent: ['id, name'],
		},
		requiredColumns: ['id'],
	})

	const repository = createTicketsRepository(prisma)
	const service = createTicketsService(
		repository,
		filterTransformer,
		sortTransformer,
		paginationTransformer,
		selectTransformer,
	)
	const handler = createTicketsHandler(service)

	return { service, handler }
}

export type TicketsModule = ReturnType<typeof createTicketsModule>
