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
