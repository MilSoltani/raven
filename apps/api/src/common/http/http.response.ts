import type { ApiResponse } from './http.schema'

export function response<T>({
  data,
  event,
  meta,
}: ApiResponse<T>) {
  return {
    event,
    data,
    meta: meta ?? null,
  }
}
