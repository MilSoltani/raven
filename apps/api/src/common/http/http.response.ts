import type { ApiResponse } from './http.schema'

export function responseFactory<TCode extends string, TError = null>() {
  return function response<TData, TMeta = null>(input: {
    code: TCode
    data: TData
    meta?: TMeta
    error?: TError
  }): ApiResponse<TData, TCode, TMeta, TError> {
    return {
      code: input.code,
      data: input.data,
      meta: (input.meta ?? null) as TMeta,
      error: (input.error ?? null) as TError,
    }
  }
}
