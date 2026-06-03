import { translationKey } from '@xenon/i18n'
import z from 'zod'

// TODO: dto for backend, separated

export const UserSchema = z.object({
	id: z.number().int(),

	name: z
		.string()
		.min(1, translationKey('users.validation.nameRequired'))
		.max(255, translationKey('users.validation.nameTooLong')),

	email: z
		.email(translationKey('users.validation.emailInvalid'))
		.min(5)
		.max(255),

	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date().nullable(),
})

export const CreateUserPayloadSchema = UserSchema.omit({
	id: true,
	updatedAt: true,
	createdAt: true,
})

export const NestedUserSchema = UserSchema.pick({
	id: true,
	name: true,
})

export const UpdateUserPayloadSchema = CreateUserPayloadSchema.partial()

export type User = z.infer<typeof UserSchema>
export type CreateUserPayload = z.infer<typeof CreateUserPayloadSchema>
export type UpdateUserPayload = z.infer<typeof UpdateUserPayloadSchema>
export type NestedUser = z.infer<typeof NestedUserSchema>
