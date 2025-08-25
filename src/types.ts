export interface AgentState {
  name: string
  status: 'pending' | 'running' | 'done' | 'error'
}

export interface Coverage {
  percent: number
  history: number[]
}

export interface FileNode {
  name: string
  path: string
  children?: FileNode[]
}

export interface Run {
  id: string
  status: 'queued' | 'running' | 'passed' | 'failed'
  createdAt: string
}
