import z from 'zod'

export const SessionSchema = z.object({
	id: z
		.number('sessions.validation.idRequired')
		.int('sessions.validation.idInvalid'),

	userId: z
		.number('sessions.validation.userIdRequired')
		.int('sessions.validation.userIdInvalid'),

	refreshTokenHash: z.string('sessions.validation.refreshTokenHashRequired'),

	isRevoked: z.boolean('sessions.validation.isRevokedRequired'),

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
