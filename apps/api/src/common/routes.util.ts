import type z from 'zod'
import { ErrorSchema } from './common.schema'

export function jsonContent<T extends z.ZodTypeAny>(schema: T, description: string) {
  return {
    content: {
      'application/json': {
        schema,
      },
    },
    description,
  }
}

export function jsonError(description: string) {
  return jsonContent(ErrorSchema, description)
}
