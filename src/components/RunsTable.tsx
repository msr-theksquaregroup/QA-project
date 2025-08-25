import type { Run, Coverage } from '../types'
import { StatusBadge } from './StatusBadge'
import type { StatusState } from './StatusBadge'
import { useNavigate, Link } from 'react-router-dom'
import { Skeleton } from './ui/skeleton'

interface RunRow {
  runId: string
  status: Run['status']
  coverage?: Coverage
  createdAt: string
}

interface Props {
  runs: RunRow[]
  isLoading?: boolean
  getLink?: (run: RunRow) => string
}

export function RunsTable({ runs, getLink, isLoading }: Props) {
  const navigate = useNavigate()
  if (isLoading) {
    return (
      <div className="space-y-2">
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} className="h-6 w-full rounded-xl" />
        ))}
      </div>
    )
  }
  if (runs.length === 0) {
    return (
      <div className="text-sm text-center text-gray-500 py-4">
        No runs yet.{' '}
        <Link to="/files" className="text-blue-600 underline">
          Upload code
        </Link>
      </div>
    )
  }
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="text-left border-b">
          <th className="py-2">ID</th>
          <th className="py-2">Status</th>
          <th className="py-2">Coverage</th>
          <th className="py-2">Date</th>
        </tr>
      </thead>
      <tbody>
        {runs.map((run) => (
          <tr
            key={run.runId}
            className={`border-b last:border-0 hover:bg-gray-50 ${
              getLink ? 'cursor-pointer' : ''
            }`}
            onClick={() => getLink && navigate(getLink(run))}
          >
            <td className="py-2">{run.runId}</td>
            <td className="py-2">
              <StatusBadge state={mapStatus(run.status)} />
            </td>
            <td className="py-2">{run.coverage?.overall_percentage ?? '-'}%</td>
            <td className="py-2">{new Date(run.createdAt).toLocaleString()}</td>
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
