const API_BASE_URL = (
  import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
).replace(/\/+$/, '')

let csrfToken: string | null = null

type ApiOptions = RequestInit & {
  csrf?: boolean
}

export async function apiRequest<T>(
  endpoint: string,
  options: ApiOptions = {},
): Promise<T> {
  const { csrf = false, headers, ...requestOptions } = options

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...requestOptions,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(csrf && csrfToken
        ? { 'X-CSRF-Token': csrfToken }
        : {}),
      ...headers,
    },
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong')
  }

  return data as T
}

export async function fetchCsrfToken(): Promise<void> {
  const data = await apiRequest<{ csrfToken: string }>(
    '/auth/csrf-token',
  )

  csrfToken = data.csrfToken
}

export function clearCsrfToken(): void {
  csrfToken = null
}