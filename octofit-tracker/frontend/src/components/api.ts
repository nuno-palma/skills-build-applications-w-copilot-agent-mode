export interface ApiPageProps {
  apiBase: string
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

function getArrayFromBody<T>(payload: unknown): T[] {
  if (Array.isArray(payload)) {
    return payload
  }

  if (!isPlainObject(payload)) {
    return []
  }

  const body = payload as Record<string, unknown>
  const knownArrays = [body.data, body.results, body.items, body.records, body.list]

  for (const candidate of knownArrays) {
    if (Array.isArray(candidate)) {
      return candidate as T[]
    }
  }

  const firstArray = Object.values(body).find(Array.isArray)
  if (Array.isArray(firstArray)) {
    return firstArray as T[]
  }

  return []
}

export function getApiUrl(component: string): string {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME || ''
  const safeBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000'

  return `${safeBaseUrl}/api/${component}/`
}

export async function fetchApiList<T>(url: string): Promise<T[]> {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`)
  }

  const payload = await response.json()
  return getArrayFromBody<T>(payload)
}

export function formatItemLabel(item: Record<string, unknown>, index: number): string {
  return (
    (item.id as string | undefined) ??
    (item.name as string | undefined) ??
    (item.title as string | undefined) ??
    `Entry ${index + 1}`
  )
}

export function renderRecordFields(item: Record<string, unknown>) {
  return Object.entries(item).map(([key, value]) => {
    const displayValue =
      value == null
        ? '—'
        : typeof value === 'object'
        ? JSON.stringify(value, null, 2)
        : String(value)

    return (
      <div key={key} className="mb-1">
        <strong>{key}:</strong> <span className="text-break">{displayValue}</span>
      </div>
    )
  })
}
