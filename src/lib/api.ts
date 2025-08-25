export async function apiFetch<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, options)
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  return (await res.json()) as T
}

export function connectSSE(url: string, onMessage: (ev: MessageEvent) => void) {
  const src = new EventSource(url)
  src.onmessage = onMessage
  return () => src.close()
}

export function connectWS(url: string) {
  return new WebSocket(url)
}
