import type { Run } from '../types'
import { StatusBadge } from './StatusBadge'
import type { StatusState } from './StatusBadge'

interface Props {
  runs: Run[]
}

export function RunsTable({ runs }: Props) {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="text-left border-b">
          <th className="py-2">ID</th>
          <th className="py-2">Status</th>
          <th className="py-2">Coverage</th>
        </tr>
      </thead>
      <tbody>
        {runs.map((run) => (
          <tr key={run.runId} className="border-b last:border-0">
            <td className="py-2">{run.runId}</td>
            <td className="py-2">
              <StatusBadge state={mapStatus(run.status)} />
            </td>
            <td className="py-2">{run.coverage?.overall_percentage ?? '-'}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function mapStatus(status: Run['status']): StatusState {
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
