import { useQuery } from '@tanstack/react-query'
import { RunsTable } from '@/components/RunsTable'
import { listReports } from '@/lib/api'

export default function Runs() {
  const { data, isLoading } = useQuery({ queryKey: ['reports'], queryFn: listReports })
  return (
    <RunsTable
      runs={data ?? []}
      isLoading={isLoading}
      getLink={(run) => `/runs/${run.runId}`}
    />
  )
  const { data } = useQuery({ queryKey: ['reports'], queryFn: listReports })
  return (
    <RunsTable
      runs={data ?? []}
      getLink={(run) => `/runs/${run.runId}`}
    />
  )

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



  { id: '1', status: 'passed', createdAt: new Date().toISOString() },
  { id: '2', status: 'failed', createdAt: new Date().toISOString() },
]

export default function Runs() {
  return <RunsTable runs={runs} />
}
