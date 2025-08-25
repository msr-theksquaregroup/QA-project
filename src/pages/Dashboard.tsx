import { AgentsProgress } from '../components/AgentsProgress'
import { CoverageCard } from '../components/CoverageCard'
import { RunsTable } from '../components/RunsTable'
import type { AgentState, Coverage, Run } from '../types'

const agents: AgentState[] = Array.from({ length: 8 }, (_, i) => ({
  name: `Agent ${i + 1}`,
  status: i < 3 ? 'done' : 'pending',
}))

const coverage: Coverage = {
  percent: 72,
  history: [40, 50, 55, 60, 72],
}

const runs: Run[] = [
  { id: '1', status: 'passed', createdAt: new Date().toISOString() },
  { id: '2', status: 'running', createdAt: new Date().toISOString() },
]

export default function Dashboard() {
  return (
    <div className="space-y-4">
      <CoverageCard coverage={coverage} />
      <AgentsProgress agents={agents} />
      <RunsTable runs={runs} />
    </div>
  )
}
