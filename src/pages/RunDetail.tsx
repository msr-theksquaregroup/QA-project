import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import { AgentsProgress } from '@/components/AgentsProgress'
import { CoverageCard } from '@/components/CoverageCard'
import { StatusBadge } from '@/components/StatusBadge'
import { CodePreview } from '@/components/CodePreview'
import { getRun } from '@/lib/api'
import type { Run } from '@/types'
import type { StatusState } from '@/components/StatusBadge'

export default function RunDetail() {
  const { runId = '' } = useParams()
  const { data: run } = useQuery({ queryKey: ['run', runId], queryFn: () => getRun(runId) })
  const [artifact, setArtifact] = useState<{ name: string; content: string } | null>(null)

  if (!run) return <div>Loading...</div>

  const openArtifact = (name: string, content: string | object) => {
    const text = typeof content === 'string' ? content : JSON.stringify(content, null, 2)
    setArtifact({ name, content: text })
  }

  return (
    <div className="space-y-6">
      <header className="flex items-center gap-2">
        <h2 className="text-lg font-semibold">Run {run.runId}</h2>
        <StatusBadge state={mapRunStatus(run.status)} />
      </header>

      <div className="grid md:grid-cols-2 gap-4">
        <AgentsProgress agents={run.agents} />
        {run.coverage && <CoverageCard coverage={run.coverage} />}
      </div>

      <section>
        <h3 className="font-semibold mb-2">Files</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2">Path</th>
              <th className="py-2">Status</th>
              <th className="py-2">Artifact</th>
            </tr>
          </thead>
          <tbody>
            {run.files.map((f) => (
              <tr key={f.path} className="border-b last:border-0">
                <td className="py-2">{f.path}</td>
                <td className="py-2">
                  <StatusBadge state={mapFileStatus(f.status)} />
                </td>
                <td className="py-2">
                  {run.artifacts[f.path] && (
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => openArtifact(f.path, run.artifacts[f.path])}
                    >
                      View
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {run.errors.length > 0 && (
        <section>
          <details className="border rounded">
            <summary className="px-4 py-2 cursor-pointer text-red-600 font-semibold">
              Errors
            </summary>
            <ul className="px-4 py-2 space-y-1 text-sm text-red-600">
              {run.errors.map((e, i) => (
                <li key={i}>{e}</li>
              ))}
            </ul>
          </details>
        </section>
      )}

      {artifact && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded shadow w-full max-w-3xl p-4 space-y-2">
            <div className="flex justify-between items-center">
              <h4 className="font-semibold">{artifact.name}</h4>
              <button onClick={() => setArtifact(null)}>Close</button>
            </div>
            <CodePreview path={artifact.name} code={artifact.content} />
          </div>
        </div>
      )}
    </div>
  )
}

function mapRunStatus(status: Run['status']): StatusState {
  switch (status) {
    case 'completed':
      return 'success'
    case 'failed':
      return 'error'
    case 'running':
      return 'running'
    default:
      return 'idle'
  }
}

function mapFileStatus(status: 'passed' | 'warn' | 'error'): StatusState {
  switch (status) {
    case 'passed':
      return 'success'
    case 'warn':
      return 'warn'
    case 'error':
      return 'error'
  }
}
