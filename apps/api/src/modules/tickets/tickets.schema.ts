import z from 'zod'

export const TicketStatusEnum = z.enum(
  ['OPEN', 'PENDING', 'WORKING', 'RESOLVED', 'CLOSED'],
  'auth.validation.statusInvalid,',
)

export const TicketPriorityEnum = z.enum(
  ['LOW', 'MEDIUM', 'HIGH', 'URGENT'],
  'auth.validation.priorityInvalid',
)

export const TicketSchema = z.object({
  id: z.number('auth.validation.idRequired')
    .int('auth.validation.idInvalid'),

  creatorId: z.number('auth.validation.creatorIdRequired')
    .int('auth.validation.creatorIdInvalid'),

  agentId: z.number('auth.validation.agentIdInvalid')
    .int('auth.validation.agentIdInvalid')
    .nullable()
    .optional(),

  subject: z.string('auth.validation.subjectRequired')
    .min(1, 'auth.validation.subjectRequired')
    .max(512, 'auth.validation.subjectTooLong'),

  description: z.string('auth.validation.descriptionRequired')
    .min(1, 'auth.validation.descriptionRequired'),

  status: TicketStatusEnum,
  priority: TicketPriorityEnum,

  updatedAt: z.coerce.number('auth.validation.updatedAtInvalid')
    .nullable(),

  createdAt: z.coerce.number('auth.validation.createdAtInvalid'),
})

export const CreateTicketSchema = TicketSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  creatorId: true,
}).extend({
  status: TicketStatusEnum.optional(),
  priority: TicketPriorityEnum.optional(),
})

export const UpdateTicketSchema = CreateTicketSchema.partial()

export type Ticket = z.infer<typeof TicketSchema>
export type CreateTicketPayload = z.infer<typeof CreateTicketSchema>
export type UpdateTicketPayload = z.infer<typeof UpdateTicketSchema>
export type TicketStatus = z.infer<typeof TicketStatusEnum>
export type TicketPriority = z.infer<typeof TicketPriorityEnum>
