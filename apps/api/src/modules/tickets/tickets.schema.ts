import { extendZodWithOpenApi, z } from '@hono/zod-openapi'
import { ticketsResponseKeys } from './tickets-response.keys'

extendZodWithOpenApi(z)

export const TicketStatusEnum = z.enum(
  ['OPEN', 'PENDING', 'WORKING', 'RESOLVED', 'CLOSED'],
  ticketsResponseKeys.validation.statusInvalid,
).openapi('TicketStatus')

export const TicketPriorityEnum = z.enum(
  ['LOW', 'MEDIUM', 'HIGH', 'URGENT'],
  ticketsResponseKeys.validation.priorityInvalid,
).openapi('TicketPriority')

export const TicketSchema = z.object({
  id: z.number(ticketsResponseKeys.validation.idRequired)
    .int(ticketsResponseKeys.validation.idInvalid),

  creatorId: z.number(ticketsResponseKeys.validation.creatorIdRequired)
    .int(ticketsResponseKeys.validation.creatorIdInvalid),

  agentId: z.number(ticketsResponseKeys.validation.agentIdInvalid)
    .int(ticketsResponseKeys.validation.agentIdInvalid)
    .nullable()
    .optional(),

  subject: z.string(ticketsResponseKeys.validation.subjectRequired)
    .min(1, ticketsResponseKeys.validation.subjectRequired)
    .max(512, ticketsResponseKeys.validation.subjectTooLong),

  description: z.string(ticketsResponseKeys.validation.descriptionRequired)
    .min(1, ticketsResponseKeys.validation.descriptionRequired),

  status: TicketStatusEnum,
  priority: TicketPriorityEnum,

  updatedAt: z.coerce.number(ticketsResponseKeys.validation.updatedAtInvalid)
    .nullable(),

  createdAt: z.coerce.number(ticketsResponseKeys.validation.createdAtInvalid),
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
