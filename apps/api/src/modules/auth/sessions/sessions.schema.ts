import { translationKey } from '@xenon/i18n'
import z from 'zod'

export const SessionSchema = z.object({
	id: z.number().int().min(1, translationKey('sessions.validation.idInvalid')),

	userId: z
		.number()
		.int()
		.min(1, translationKey('sessions.validation.userIdInvalid')),

	refreshTokenHash: z
		.string()
		.min(1, translationKey('sessions.validation.refreshTokenHashRequired')),

	isRevoked: z.boolean(),

	expiresAt: z.date(),
	createdAt: z.date(),
})

export const CreateSessionPayloadSchema = SessionSchema.omit({
	id: true,
	createdAt: true,
	isRevoked: true,
})

export const UpdateSessionPayloadSchema = SessionSchema.pick({
	refreshTokenHash: true,
	isRevoked: true,
	expiresAt: true,
}).partial()

export type Session = z.infer<typeof SessionSchema>
export type CreateSessionPayload = z.infer<typeof CreateSessionPayloadSchema>
export type UpdateSessionPayload = z.infer<typeof UpdateSessionPayloadSchema>
