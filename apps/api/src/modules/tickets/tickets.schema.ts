import { extendZodWithOpenApi, z } from '@hono/zod-openapi'
import { zodExceptionFactory } from '@raven/api/common/http'
import { ticketsMessages } from './tickets.messages'

const throwException = zodExceptionFactory(ticketsMessages)

extendZodWithOpenApi(z)

export const TicketStatusEnum = z.enum(
  ['OPEN', 'PENDING', 'WORKING', 'RESOLVED', 'CLOSED'],
  throwException('STATUS_INVALID'),
).openapi('TicketStatus')

export const TicketPriorityEnum = z.enum(
  ['LOW', 'MEDIUM', 'HIGH', 'URGENT'],
  throwException('PRIORITY_INVALID'),
).openapi('TicketPriority')

export const TicketSchema = z.object({
  id: z.number(throwException('TICKET_ID_REQUIRED'),
  )
    .int(throwException('TICKET_ID_INVALID')),

  creatorId: z.number(throwException('CREATOR_ID_REQUIRED'))
    .int(throwException('CREATOR_ID_INVALID')),

  agentId: z.number(throwException('AGENT_ID_INVALID'))
    .int(throwException('AGENT_ID_INVALID'))
    .nullable()
    .optional(),

  subject: z.string(throwException('SUBJECT_REQUIRED'))
    .min(1, throwException('SUBJECT_REQUIRED'))
    .max(512, throwException('SUBJECT_TOO_LONG')),

  description: z.string(throwException('DESCRIPTION_REQUIRED'))
    .min(1, throwException('DESCRIPTION_REQUIRED')),

  status: TicketStatusEnum,
  priority: TicketPriorityEnum,

  updatedAt: z.coerce.number(throwException('UPDATED_AT_INVALID'))
    .nullable(),

  createdAt: z.coerce.number(throwException('CREATED_AT_REQUIRED')),
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
