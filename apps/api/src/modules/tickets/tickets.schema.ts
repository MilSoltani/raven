import { extendZodWithOpenApi, z } from '@hono/zod-openapi'
import { zodException } from '@raven/api/common/http'
import { ticketsResponseCode } from './tickets.events'

extendZodWithOpenApi(z)

export const TicketStatusEnum = z.enum(
  ['OPEN', 'PENDING', 'WORKING', 'RESOLVED', 'CLOSED'],
  zodException(ticketsResponseCode('STATUS_INVALID')),
).openapi('TicketStatus')

export const TicketPriorityEnum = z.enum(
  ['LOW', 'MEDIUM', 'HIGH', 'URGENT'],
  zodException(ticketsResponseCode('PRIORITY_INVALID')),
).openapi('TicketPriority')

export const TicketSchema = z.object({
  id: z.number(zodException(ticketsResponseCode('TICKET_ID_REQUIRED')),
  )
    .int(zodException(ticketsResponseCode('TICKET_ID_INVALID'))),

  creatorId: z.number(zodException(ticketsResponseCode('CREATOR_ID_REQUIRED')))
    .int(zodException(ticketsResponseCode('CREATOR_ID_INVALID'))),

  agentId: z.number(zodException(ticketsResponseCode('AGENT_ID_INVALID')))
    .int(zodException(ticketsResponseCode('AGENT_ID_INVALID')))
    .nullable()
    .optional(),

  subject: z.string(zodException(ticketsResponseCode('SUBJECT_REQUIRED')))
    .min(1, zodException(ticketsResponseCode('SUBJECT_REQUIRED')))
    .max(512, zodException(ticketsResponseCode('SUBJECT_TOO_LONG'))),

  description: z.string(zodException(ticketsResponseCode('DESCRIPTION_REQUIRED')))
    .min(1, zodException(ticketsResponseCode('DESCRIPTION_REQUIRED'))),

  status: TicketStatusEnum,
  priority: TicketPriorityEnum,

  updatedAt: z.coerce.number(zodException(ticketsResponseCode('UPDATED_AT_INVALID')))
    .nullable(),

  createdAt: z.coerce.number(zodException(ticketsResponseCode('CREATED_AT_REQUIRED'))),
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
