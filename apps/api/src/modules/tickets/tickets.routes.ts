import { createRoute } from '@hono/zod-openapi'
import { ErrorSchema, IdParamSchema } from '@raven/api/common/openapi/openapi.schema'
import { createPaginatedSchema } from '@raven/api/exports'
import { CriteriaSchema } from '@raven/api/infrastructure/query/criteria.schema'
import { CreateTicketSchema, TicketSchema, UpdateTicketSchema } from './tickets.schema'

export const TicketsRoutes = {
  getAll: createRoute({
    method: 'get',
    path: '/',
    tags: ['Ticket'],
    request: {
      query: CriteriaSchema,
    },
    responses: {
      200: {
        content: {
          'application/json': {
            schema: createPaginatedSchema(TicketSchema),
          },
        },
        description: 'List of all tickets',
      },
    },
  }),

  getById: createRoute({
    method: 'get',
    path: '/{id}',
    tags: ['Ticket'],
    request: { params: IdParamSchema },
    responses: {
      200: {
        content: {
          'application/json': {
            schema: TicketSchema,
          },
        },
        description: 'The requested ticket',
      },
      404: {
        content: {
          'application/json': {
            schema: ErrorSchema,
          },
        },
        description: 'Ticket not found',
      },
    },
  }),

  create: createRoute({
    method: 'post',
    path: '/',
    tags: ['Ticket'],
    request: {
      body: {
        content: {
          'application/json': {
            schema: CreateTicketSchema,
          },
        },
        description: 'Ticket data',
      },
    },
    responses: {
      201: {
        content: {
          'application/json': {
            schema: TicketSchema,
          },
        },
        description: 'Ticket created',
      },
      400: {
        content: {
          'application/json': {
            schema: ErrorSchema,
          },
        },
        description: 'Invalid data',
      },
      500: {
        content: {
          'application/json': {
            schema: ErrorSchema,
          },
        },
        description: 'Ticket creation failed',
      },
    },
  }),

  update: createRoute({
    method: 'put',
    path: '/{id}',
    tags: ['Ticket'],
    request: {
      params: IdParamSchema,
      body: {
        content: {
          'application/json': {
            schema: UpdateTicketSchema,
          },
        },
        description: 'Updated ticket data',
      },
    },
    responses: {
      200: {
        content: {
          'application/json': {
            schema: TicketSchema,
          },
        },
        description: 'Ticket updated',
      },
      400: {
        content: {
          'application/json': {
            schema: ErrorSchema,
          },
        },
        description: 'Invalid data',
      },
      404: {
        content: {
          'application/json': {
            schema: ErrorSchema,
          },
        },
        description: 'Ticket not found',
      },
    },
  }),

  remove: createRoute({
    method: 'delete',
    path: '/{id}',
    tags: ['Ticket'],
    request: { params: IdParamSchema },
    responses: {
      204: { description: 'User deleted' },
      404: {
        content: {
          'application/json': {
            schema: ErrorSchema,
          },
        },
        description: 'Ticket not found',
      },
    },
  }),
}
