import { RunsTable } from '../components/RunsTable'
import type { Run } from '../types'

const runs: Run[] = [
  { id: '1', status: 'passed', createdAt: new Date().toISOString() },
  { id: '2', status: 'failed', createdAt: new Date().toISOString() },
]

export default function Runs() {
  return <RunsTable runs={runs} />
}
