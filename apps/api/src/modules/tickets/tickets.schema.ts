import { NestedUserSchema } from '@xenon/api/modules/users'
import { translationKey } from '@xenon/i18n'
import z from 'zod'

export const TicketStatusEnum = z.enum(
	['OPEN', 'PENDING', 'WORKING', 'RESOLVED', 'CLOSED'],
	translationKey('tickets.validation.statusInvalid'),
)

export const TicketPriorityEnum = z.enum(
	['LOW', 'MEDIUM', 'HIGH', 'URGENT'],
	translationKey('tickets.validation.priorityInvalid'),
)

// TODO: dto for backend, separated

export const TicketSchema = z.object({
	id: z.number().int(),

	creatorId: z.number().int(),
	creator: NestedUserSchema.nullable().optional(),

	agentId: z.number().int().nullable().optional(),
	agent: NestedUserSchema.nullable().optional(),

	subject: z
		.string()
		.min(1, translationKey('tickets.validation.subjectRequired'))
		.max(512, translationKey('tickets.validation.subjectTooLong')),

	description: z
		.string()
		.min(1, translationKey('tickets.validation.descriptionRequired')),

	status: TicketStatusEnum,
	priority: TicketPriorityEnum,

	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date().nullable(),
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
