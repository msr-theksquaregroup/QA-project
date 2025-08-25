import type { UploadedSource, FileNode, Run } from '../types'

const API_BASE = '/api'

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, options)



export async function apiFetch<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, options)
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  return (await res.json()) as T
}

function isFileNode(v: unknown): v is FileNode {
  if (!v || typeof v !== 'object') return false
  const n = v as FileNode
  return (
    typeof n.name === 'string' &&
    typeof n.path === 'string' &&
    typeof n.isDir === 'boolean'
  )
}

function isUploadedSource(v: unknown): v is UploadedSource {
  if (!v || typeof v !== 'object') return false
  const u = v as UploadedSource
  return typeof u.uploadId === 'string' && isFileNode(u.root)
}

function isRun(v: unknown): v is Run {
  if (!v || typeof v !== 'object') return false
  const r = v as Run
  return typeof r.runId === 'string' && Array.isArray(r.agents)



function isFileNode(v: any): v is FileNode {
  return (
    v &&
    typeof v.name === 'string' &&
    typeof v.path === 'string' &&
    typeof v.isDir === 'boolean'
  )
}

function isUploadedSource(v: any): v is UploadedSource {
  return v && typeof v.uploadId === 'string' && isFileNode(v.root)
}

function isRun(v: any): v is Run {
  return v && typeof v.runId === 'string' && Array.isArray(v.agents)
}

export async function uploadZip(file: File): Promise<UploadedSource> {
  const fd = new FormData()
  fd.append('file', file)
  const data = await apiFetch<unknown>('/upload/zip', { method: 'POST', body: fd })
  if (!isUploadedSource(data)) throw new Error('Invalid upload response')
  return data
}

export async function uploadByUrl(url: string): Promise<UploadedSource> {
  const data = await apiFetch<unknown>('/upload/url', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  })
  if (!isUploadedSource(data)) throw new Error('Invalid upload response')
  return data
}

export async function listFiles(): Promise<FileNode> {
  const data = await apiFetch<unknown>('/files')
  if (!isFileNode(data)) throw new Error('Invalid file list')
  return data
}

export async function getFileContent(path: string): Promise<string> {
  const data = await apiFetch<{ content: string }>(
    `/files/content?path=${encodeURIComponent(path)}`,
  )
  if (!data || typeof data.content !== 'string')
    throw new Error('Invalid file content')
  return data.content




  const data = await apiFetch<unknown>(`/files/content?path=${encodeURIComponent(path)}`)
  if (!data || typeof (data as any).content !== 'string')
    throw new Error('Invalid file content')
  return (data as any).content


}

export async function startRun(payload: {
  paths: string[]
  use_notebook: 18 | 24
  customTests?: string
}): Promise<{ runId: string }> {
  const data = await apiFetch<{ runId: string }>('/runs', {



  const data = await apiFetch<unknown>('/runs', {

    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!data || typeof data.runId !== 'string')
    throw new Error('Invalid run response')
  return { runId: data.runId }



  if (!data || typeof (data as any).runId !== 'string')
    throw new Error('Invalid run response')
  return { runId: (data as any).runId }
}

export async function getRun(runId: string): Promise<Run> {
  const data = await apiFetch<unknown>(`/runs/${runId}`)
  if (!isRun(data)) throw new Error('Invalid run payload')
  return data
}

export function streamRun(
  runId: string,
  onEvent: (partial: Partial<Run>) => void,
): EventSource {
  const src = new EventSource(`${API_BASE}/runs/${runId}/stream`)
  src.onmessage = (ev) => {
    try {
      onEvent(JSON.parse(ev.data))
    } catch {
      /* ignore */
    }
  }
  return src
}

export async function listReports(): Promise<
  Pick<Run, 'runId' | 'status' | 'coverage' | 'createdAt'>[]
> {
  const data = await apiFetch<unknown>('/reports')
  if (!Array.isArray(data)) throw new Error('Invalid reports payload')
  return data as Pick<Run, 'runId' | 'status' | 'coverage' | 'createdAt'>[]


  Pick<Run, 'runId' | 'status' | 'coverage'>[]
> {
  const data = await apiFetch<unknown>('/reports')
  if (!Array.isArray(data)) throw new Error('Invalid reports payload')
  return data as Pick<Run, 'runId' | 'status' | 'coverage'>[]
}


export function connectSSE(url: string, onMessage: (ev: MessageEvent) => void) {
  const src = new EventSource(url)
  src.onmessage = onMessage
  return () => src.close()
}

export function connectWS(url: string) {
  return new WebSocket(url)

}

