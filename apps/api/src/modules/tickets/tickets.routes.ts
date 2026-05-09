import { createRoute } from '@hono/zod-openapi'
import { IdParamSchema } from '@raven/api/common/common.schema'
import { jsonContent, jsonError } from '@raven/api/common/routes.util'
import { CreateTicketSchema, CriteriaSchema, TicketSchema, UpdateTicketSchema } from '@raven/schemas'
import z from 'zod'

export const TicketsRoutes = {
  getAll: createRoute({
    method: 'get',
    path: '/',
    tags: ['Ticket'],
    request: {
      query: CriteriaSchema,
    },
    responses: {
      200: jsonContent(z.array(TicketSchema), 'List of all tickets'),
    },
  }),

  getById: createRoute({
    method: 'get',
    path: '/{id}',
    tags: ['Ticket'],
    request: { params: IdParamSchema },
    responses: {
      200: jsonContent(TicketSchema, 'The requested ticket'),
      404: jsonError('Ticket not found'),
    },
  }),

  create: createRoute({
    method: 'post',
    path: '/',
    tags: ['Ticket'],
    request: {
      body: jsonContent(CreateTicketSchema, 'Ticket data'),
    },
    responses: {
      201: jsonContent(TicketSchema, 'Ticket created'),
      400: jsonError('Invalid data'),
      500: jsonError('Ticket creation failed'),
    },
  }),

  update: createRoute({
    method: 'put',
    path: '/{id}',
    tags: ['Ticket'],
    request: {
      params: IdParamSchema,
      body: jsonContent(UpdateTicketSchema, 'Updated ticket data'),
    },
    responses: {
      200: jsonContent(TicketSchema, 'Ticket updated'),
      400: jsonError('Invalid data'),
      404: jsonError('Ticket not found'),
    },
  }),

  remove: createRoute({
    method: 'delete',
    path: '/{id}',
    tags: ['Ticket'],
    request: { params: IdParamSchema },
    responses: {
      200: jsonContent(TicketSchema, 'Ticket deleted'),
      404: jsonError('Ticket not found'),
    },
  }),
}
