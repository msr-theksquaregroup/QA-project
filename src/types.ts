export type AgentKey =
  | 'code_analysis'
  | 'user_story'
  | 'gherkin'
  | 'test_plan'
  | 'playwright'
  | 'execution'
  | 'coverage'
  | 'final_report'

export interface AgentState {
  key: AgentKey
  label: string
  state: 'idle' | 'running' | 'success' | 'warn' | 'error'
  message?: string
}

export interface Coverage {
  overall_percentage: number
  statements_percentage: number
  functions_percentage: number
  branches_percentage: number
  coverage_collected: boolean
  source: 'c8' | 'simulated'
}

export interface Run {
  runId: string
  status: 'queued' | 'running' | 'completed' | 'failed'
  agents: AgentState[]
  coverage?: Coverage
  files: { path: string; status: 'passed' | 'warn' | 'error' }[]
  artifacts: Record<string, string | object>
  errors: string[]

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
  isDir: boolean
  children?: FileNode[]
}

export interface UploadedSource {
  uploadId: string
  root: FileNode
}


  children?: FileNode[]
}

export interface Run {
  id: string
  status: 'queued' | 'running' | 'passed' | 'failed'
  createdAt: string
}
