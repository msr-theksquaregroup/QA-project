import { useEffect, useRef, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import { AgentsProgress } from '@/components/AgentsProgress'
import { CoverageCard } from '@/components/CoverageCard'
import { RunsTable } from '@/components/RunsTable'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'


import {
  useSelectedPaths,
  useNotebook,
  useUIActions,
} from '@/lib/store'
import type { Notebook } from '@/lib/store'
import { listReports, startRun, streamRun } from '@/lib/api'
import type { Run } from '@/types'

export default function Dashboard() {
  const selectedPaths = useSelectedPaths()
  const notebook = useNotebook()
  const { setNotebook, removePath, setLastRunId } = useUIActions()

  const [currentRun, setCurrentRun] = useState<Run | null>(null)
  const streamRef = useRef<EventSource | null>(null)
  const qc = useQueryClient()

  const reportsQuery = useQuery({
    queryKey: ['reports'],
    queryFn: listReports,
  })

  useEffect(() => {
    return () => {
      streamRef.current?.close()
    }
  }, [])

  const handleRun = async () => {
    try {
      const { runId } = await startRun({
        paths: selectedPaths,
        use_notebook: notebook,
      })
      toast('Run started')
      setLastRunId(runId)
      setCurrentRun({
        runId,
        createdAt: new Date().toISOString(),
        status: 'running',
        agents: [],
        files: [],
        artifacts: {},
        errors: [],
      })
      streamRef.current = streamRun(runId, (partial) => {
        setCurrentRun((prev) => {
          if (!prev) return prev
          const next: Run = {
            ...prev,
            ...partial,
            agents: partial.agents ?? prev.agents,
            files: partial.files ?? prev.files,
            coverage: partial.coverage ?? prev.coverage,
          }
          return next
        })
        if (partial.status && ['completed', 'failed'].includes(partial.status)) {
          qc.invalidateQueries({ queryKey: ['reports'] })
          streamRef.current?.close()
          streamRef.current = null
          if (partial.status === 'completed') {
            toast.success('Run completed')
          } else {
            toast.error('Run failed')
          }
        }
      })
    } catch {
      toast.error('Failed to start run')
    }

    const { runId } = await startRun({
      paths: selectedPaths,
      use_notebook: notebook,
    })
    setLastRunId(runId)
    setCurrentRun({
      runId,
      createdAt: new Date().toISOString(),
      status: 'running',
      agents: [],
      files: [],
      artifacts: {},
      errors: [],
    })
    streamRef.current = streamRun(runId, (partial) => {
      setCurrentRun((prev) => {
        if (!prev) return prev
        const next: Run = {
          ...prev,
          ...partial,
          agents: partial.agents ?? prev.agents,
          files: partial.files ?? prev.files,
          coverage: partial.coverage ?? prev.coverage,
        }
        return next
      })
      if (partial.status && ['completed', 'failed'].includes(partial.status)) {
        qc.invalidateQueries({ queryKey: ['reports'] })
        streamRef.current?.close()
        streamRef.current = null
      }
    })
  }

  const runs = (reportsQuery.data ?? []).slice(0, 10)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <select
          value={notebook}
          onChange={(e) => setNotebook(Number(e.target.value) as Notebook)}
          className="border rounded px-2 py-1"
        >
          <option value={18}>Notebook 18</option>
          <option value={24}>Notebook 24</option>
        </select>
        <Button
          onClick={handleRun}
          disabled={selectedPaths.length === 0}
        >
          Run workflow
        </Button>
      </div>

      <div className="space-y-2">
        <div className="text-sm">{selectedPaths.length} files selected</div>
        <div className="flex flex-wrap gap-2">
          {selectedPaths.map((p) => (
            <span
              key={p}
              className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-xs"
            >
              {p}
              <button onClick={() => removePath(p)}>×</button>
            </span>
          ))}
        </div>
      </div>

      {currentRun && currentRun.status === 'running' && (
        <div className="border rounded-xl p-4 space-y-4 bg-gray-100">

        <div className="border rounded p-4 space-y-4">
          <AgentsProgress agents={currentRun.agents} />
          {currentRun.coverage && (
            <CoverageCard coverage={currentRun.coverage} />
          )}
        </div>
      )}

      <RunsTable runs={runs} isLoading={reportsQuery.isLoading} />


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

