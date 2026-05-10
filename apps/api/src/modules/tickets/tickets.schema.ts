import { extendZodWithOpenApi, z } from '@hono/zod-openapi'

extendZodWithOpenApi(z)

export const TicketStatusEnum = z.enum(['OPEN', 'PENDING', 'WORKING', 'RESOLVED', 'CLOSED'])
  .openapi('TicketStatus')

export const TicketPriorityEnum = z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT'])
  .openapi('TicketPriority')

export const TicketSchema = z.object({
  id: z.number().int(),
  creatorId: z.number().int(),
  agentId: z.number().int().nullable().optional(),
  subject: z.string().min(1).max(512),
  description: z.string().min(1),
  status: TicketStatusEnum,
  priority: TicketPriorityEnum,
  createdAt: z.string(),
  updatedAt: z.string(),
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
