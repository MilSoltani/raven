import type { ApiResponse } from './http.schema'

export function responseFactory<TMessage extends string, TError = null>() {
  return function response<TData, TMeta = null>(input: {
    message: TMessage
    data: TData
    meta?: TMeta
    error?: TError
  }): ApiResponse<TData, TMessage, TMeta, TError> {
    return {
      message: input.message,
      data: input.data,
      meta: (input.meta ?? null) as TMeta,
      error: (input.error ?? null) as TError,
    }
  }
}
