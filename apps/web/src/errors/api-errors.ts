export type ApiError = {
  status: number
  message: string
  fields?: Record<string, string>
}

export async function parseApiError(res: Response): Promise<ApiError> {
  let data: any = null

  try {
    data = await res.json()
  }
  catch {
    return {
      status: res.status,
      message: res.statusText,
    }
  }

  return {
    status: res.status,
    message: String(data?.message ?? res.statusText),
    fields: data?.fields
      ? Object.fromEntries(
          Object.entries(data.fields).map(([k, v]) => [k, String(v)]),
        )
      : undefined,
  }
}
