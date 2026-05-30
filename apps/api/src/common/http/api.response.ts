import type { ApiResponse } from './http.schema'

export function responseFactory<TError = null>() {
  return function response<TData, TMeta = null>(input: {
    code: string
    data: TData
    meta?: TMeta
    error?: TError
  }): ApiResponse<TData, TMeta, TError> {
    return {
      code: input.code,
      data: input.data,
      meta: (input.meta ?? null) as TMeta,
      error: (input.error ?? null) as TError,
    }
  }
}
