import type { UsersRepository } from './users.repository'
import type { CreateUserPayload, UpdateUserPayload, User } from './users.schema'
import {
  InternalException,
  NotFoundException,
} from '@api/infrastructure/errors/exceptions'

export function createUsersService(usersRepository: UsersRepository) {
  return {
    async getAll(): Promise<User[]> {
      return await usersRepository.getAll()
    },

    async getById(id: number): Promise<User> {
      const result = await usersRepository.getById(id)

      if (!result)
        throw new NotFoundException('User')

      return result
    },

    async create(data: CreateUserPayload): Promise<User> {
      const result = await usersRepository.create(data)

      if (!result)
        throw new InternalException('User creation')

      return result
    },

    async update(id: number, data: UpdateUserPayload): Promise<User> {
      const result = await usersRepository.update(id, data)

      if (!result)
        throw new NotFoundException('User')

      return result
    },

    async delete(id: number): Promise<User> {
      const result = await usersRepository.delete(id)

      if (!result)
        throw new NotFoundException('User')

      return result
    },
  }
}

export type UsersService = ReturnType<typeof createUsersService>
