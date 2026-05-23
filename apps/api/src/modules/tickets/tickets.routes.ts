import { createRoute } from '@hono/zod-openapi'
import { ApiResponseSchema, IdParamSchema } from '@raven/api/common/http/http.schema'
import { paginationMetaSchema } from '@raven/api/exports'
import { CriteriaSchema } from '@raven/api/infrastructure/query/criteria.schema'
import { z } from 'zod'
import { CreateTicketSchema, TicketSchema, UpdateTicketSchema } from './tickets.schema'

export const TicketsRoutes = {
  getAll: createRoute({
    method: 'get',
    path: '/',
    request: { query: CriteriaSchema },
    tags: ['Ticket'],
    responses: {
      200: {
        content: {
          'application/json': {
            schema: ApiResponseSchema(
              z.array(TicketSchema),
            ).extend({
              meta: paginationMetaSchema.nullable(),
            }),
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
            schema: ApiResponseSchema(TicketSchema),
          },
        },
        description: 'The requested ticket',
      },
      404: {
        content: {
          'application/json': {
            schema: ApiResponseSchema(
              z.object({
                message: z.string(),
              }),
            ),
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
            schema: ApiResponseSchema(TicketSchema),
          },
        },
        description: 'Ticket created',
      },
      400: {
        content: {
          'application/json': {
            schema: ApiResponseSchema(
              z.object({ message: z.string() }),
            ),
          },
        },
        description: 'Invalid data',
      },
      409: {
        content: {
          'application/json': {
            schema: ApiResponseSchema(
              z.object({ message: z.string() }),
            ),
          },
        },
        description: 'Ticket already exists',
      },
      500: {
        content: {
          'application/json': {
            schema: ApiResponseSchema(
              z.object({ message: z.string() }),
            ),
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
            schema: ApiResponseSchema(TicketSchema),
          },
        },
        description: 'Ticket updated',
      },
      400: {
        content: {
          'application/json': {
            schema: ApiResponseSchema(
              z.object({ message: z.string() }),
            ),
          },
        },
        description: 'Invalid data',
      },
      404: {
        content: {
          'application/json': {
            schema: ApiResponseSchema(
              z.object({ message: z.string() }),
            ),
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
      200: {
        content: {
          'application/json': {
            schema: ApiResponseSchema(TicketSchema),
          },
        },
        description: 'Ticket deleted',
      },
      404: {
        content: {
          'application/json': {
            schema: ApiResponseSchema(
              z.object({ message: z.string() }),
            ),
          },
        },
        description: 'Ticket not found',
      },
    },
  }),
}
