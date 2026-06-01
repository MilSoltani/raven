import type { PrismaClient } from '@xenon/api/infrastructure/database/prisma'
import type { AuthUser, AuthUserInternal, SignupPayload } from './auth.schema'

export function createAuthRepository(prisma: PrismaClient) {
	const getUserByEmail = async (
		email: string,
	): Promise<AuthUserInternal | null> => {
		return prisma.user.findUnique({
			select: { id: true, email: true, password: true },
			where: { email },
		})
	}

	const signup = async (data: SignupPayload): Promise<AuthUser | null> => {
		return prisma.user.create({
			select: { id: true, email: true },
			data: {
				...data,
				createdAt: new Date(),
			},
		})
	}

	return { getUserByEmail, signup }
}

export type AuthRepository = ReturnType<typeof createAuthRepository>
