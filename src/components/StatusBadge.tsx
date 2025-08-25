import { Check, AlertTriangle, X, Loader, Minus } from 'lucide-react'

export type StatusState = 'success' | 'warn' | 'error' | 'running' | 'idle'

const colors: Record<StatusState, string> = {
  success: 'bg-green-100 text-green-800',
  warn: 'bg-yellow-100 text-yellow-800',
  error: 'bg-red-100 text-red-800',
  running: 'bg-blue-100 text-blue-800',
  idle: 'bg-gray-100 text-gray-700',
}

const icons = {
  success: Check,
  warn: AlertTriangle,
  error: X,
  running: Loader,
  idle: Minus,
}

export function StatusBadge({ state }: { state: StatusState }) {
  const Icon = icons[state]
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${colors[state]}`}
    >
      <Icon className={`w-3 h-3 ${state === 'running' ? 'animate-spin' : ''}`} />
      {state}
    </span>
  )
}

export default StatusBadge



interface Props {
  status: 'success' | 'warning' | 'error' | 'pending'
}

const colors: Record<Props['status'], string> = {
  success: 'bg-green-100 text-green-700',
  warning: 'bg-yellow-100 text-yellow-700',
  error: 'bg-red-100 text-red-700',
  pending: 'bg-gray-100 text-gray-600',
}

export function StatusBadge({ status }: Props) {
  return (
    <span className={`px-2 py-0.5 rounded text-xs font-medium ${colors[status]}`}>
      {status}
    </span>
  )
}

