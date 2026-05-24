import { extendZodWithOpenApi, z } from '@hono/zod-openapi'
import { ticketsResponseCode } from './tickets.events'

extendZodWithOpenApi(z)

export const TicketStatusEnum = z.enum(
  ['OPEN', 'PENDING', 'WORKING', 'RESOLVED', 'CLOSED'],
  { error: ticketsResponseCode('STATUS_INVALID') },
).openapi('TicketStatus')

export const TicketPriorityEnum = z.enum(
  ['LOW', 'MEDIUM', 'HIGH', 'URGENT'],
  { error: ticketsResponseCode('PRIORITY_INVALID') },
).openapi('TicketPriority')

export const TicketSchema = z.object({
  id: z.number({ error: ticketsResponseCode('TICKET_ID_REQUIRED') })
    .int({ error: ticketsResponseCode('TICKET_ID_INVALID') }),

  creatorId: z.number({ error: ticketsResponseCode('CREATOR_ID_REQUIRED') })
    .int({ error: ticketsResponseCode('CREATOR_ID_INVALID') }),

  agentId: z.number({ error: ticketsResponseCode('AGENT_ID_INVALID') })
    .int({ error: ticketsResponseCode('AGENT_ID_INVALID') })
    .nullable()
    .optional(),

  subject: z.string({ error: ticketsResponseCode('SUBJECT_REQUIRED') })
    .min(1, { error: ticketsResponseCode('SUBJECT_REQUIRED') })
    .max(512, { error: ticketsResponseCode('SUBJECT_TOO_LONG') }),

  description: z.string({ error: ticketsResponseCode('DESCRIPTION_REQUIRED') })
    .min(1, { error: ticketsResponseCode('DESCRIPTION_REQUIRED') }),

  status: TicketStatusEnum,
  priority: TicketPriorityEnum,

  updatedAt: z.coerce.number({ error: ticketsResponseCode('UPDATED_AT_INVALID') }).nullable(),
  createdAt: z.coerce.number({ error: ticketsResponseCode('CREATED_AT_REQUIRED') }),
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
