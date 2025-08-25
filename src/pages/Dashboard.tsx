import { AgentsProgress } from '../components/AgentsProgress'
import { CoverageCard } from '../components/CoverageCard'
import { RunsTable } from '../components/RunsTable'
import type { AgentState, Coverage, Run } from '../types'

const agents: AgentState[] = [
  { key: 'code_analysis', label: 'Code Analysis', state: 'success' },
  { key: 'user_story', label: 'User Story', state: 'success' },
  { key: 'gherkin', label: 'Gherkin', state: 'success' },
  { key: 'test_plan', label: 'Test Plan', state: 'running' },
  { key: 'playwright', label: 'Playwright', state: 'idle' },
  { key: 'execution', label: 'Execution', state: 'idle' },
  { key: 'coverage', label: 'Coverage', state: 'idle' },
  { key: 'final_report', label: 'Final Report', state: 'idle' },
]

const coverage: Coverage = {
  overall_percentage: 72,
  statements_percentage: 70,
  functions_percentage: 68,
  branches_percentage: 65,
  coverage_collected: true,
  source: 'simulated',
}

const runs: Run[] = [
  { runId: '1', status: 'completed', agents, coverage, files: [], artifacts: {}, errors: [] },
  { runId: '2', status: 'running', agents, files: [], artifacts: {}, errors: [] },



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
