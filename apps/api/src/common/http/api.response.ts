import type { ApiResponse } from './http.schema'

export function responseFactory<TError = null>() {
  return function response<TData, TMeta = null>(input: {
    messageKey: string
    data: TData
    meta?: TMeta
    error?: TError
  }): ApiResponse<TData, TMeta, TError> {
    return {
      messageKey: input.messageKey,
      data: input.data,
      meta: (input.meta ?? null) as TMeta,
      error: (input.error ?? null) as TError,
    }
  }
}
