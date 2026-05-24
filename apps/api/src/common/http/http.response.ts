import type { ApiResponse } from './http.schema'

export function responseFactory<TEvent extends string, TError = null>() {
  return function response<TData, TMeta = null>(input: {
    event: TEvent
    data: TData
    meta?: TMeta
    error?: TError
  }): ApiResponse<TData, TEvent, TMeta, TError> {
    return {
      event: input.event,
      data: input.data,
      meta: (input.meta ?? null) as TMeta,
      error: (input.error ?? null) as TError,
    }
  }
}
