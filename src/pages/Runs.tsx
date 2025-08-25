import { RunsTable } from '../components/RunsTable'
import type { Run } from '../types'

const runs: Run[] = [
  {
    runId: '1',
    createdAt: new Date().toISOString(),
    status: 'completed',
    agents: [],
    coverage: {
      overall_percentage: 80,
      statements_percentage: 80,
      functions_percentage: 75,
      branches_percentage: 70,
      coverage_collected: true,
      source: 'simulated',
    },
    files: [],
    artifacts: {},
    errors: [],
  },
  {
    runId: '2',
    createdAt: new Date().toISOString(),
    status: 'failed',
    agents: [],
    files: [],
    artifacts: {},
    errors: ['test failure'],
  },
]

export default function Runs() {
  return <RunsTable runs={runs} />
}
