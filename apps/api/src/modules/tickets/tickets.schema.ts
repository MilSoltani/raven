import { extendZodWithOpenApi, z } from '@hono/zod-openapi'
import { zodException } from '@raven/api/common/http'
import { ticketsMessage } from './tickets.messages'

extendZodWithOpenApi(z)

export const TicketStatusEnum = z.enum(
  ['OPEN', 'PENDING', 'WORKING', 'RESOLVED', 'CLOSED'],
  zodException(ticketsMessage('STATUS_INVALID')),
).openapi('TicketStatus')

export const TicketPriorityEnum = z.enum(
  ['LOW', 'MEDIUM', 'HIGH', 'URGENT'],
  zodException(ticketsMessage('PRIORITY_INVALID')),
).openapi('TicketPriority')

export const TicketSchema = z.object({
  id: z.number(zodException(ticketsMessage('TICKET_ID_REQUIRED')),
  )
    .int(zodException(ticketsMessage('TICKET_ID_INVALID'))),

  creatorId: z.number(zodException(ticketsMessage('CREATOR_ID_REQUIRED')))
    .int(zodException(ticketsMessage('CREATOR_ID_INVALID'))),

  agentId: z.number(zodException(ticketsMessage('AGENT_ID_INVALID')))
    .int(zodException(ticketsMessage('AGENT_ID_INVALID')))
    .nullable()
    .optional(),

  subject: z.string(zodException(ticketsMessage('SUBJECT_REQUIRED')))
    .min(1, zodException(ticketsMessage('SUBJECT_REQUIRED')))
    .max(512, zodException(ticketsMessage('SUBJECT_TOO_LONG'))),

  description: z.string(zodException(ticketsMessage('DESCRIPTION_REQUIRED')))
    .min(1, zodException(ticketsMessage('DESCRIPTION_REQUIRED'))),

  status: TicketStatusEnum,
  priority: TicketPriorityEnum,

  updatedAt: z.coerce.number(zodException(ticketsMessage('UPDATED_AT_INVALID')))
    .nullable(),

  createdAt: z.coerce.number(zodException(ticketsMessage('CREATED_AT_REQUIRED'))),
}).openapi('Ticket')

export const CreateTicketSchema = TicketSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  creatorId: true,
}).extend({
  status: TicketStatusEnum.optional(),
  priority: TicketPriorityEnum.optional(),
}).openapi('CreateTicket')

export const UpdateTicketSchema = CreateTicketSchema.partial()
  .openapi('UpdateTicket')

export type Ticket = z.infer<typeof TicketSchema>
export type CreateTicketPayload = z.infer<typeof CreateTicketSchema>
export type UpdateTicketPayload = z.infer<typeof UpdateTicketSchema>
export type TicketStatus = z.infer<typeof TicketStatusEnum>
export type TicketPriority = z.infer<typeof TicketPriorityEnum>
