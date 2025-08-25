import type { Coverage } from '../types'

interface Props {
  coverage: Coverage
}

export function CoverageCard({ coverage }: Props) {
  const bars = [
    { label: 'Statements', value: coverage.statements_percentage },
    { label: 'Functions', value: coverage.functions_percentage },
    { label: 'Branches', value: coverage.branches_percentage },
  ]

  return (
    <div className="border rounded p-4">
      <div className="text-sm text-gray-500">Coverage</div>
      <div className="text-2xl font-bold">{coverage.overall_percentage}%</div>
      <div className="flex gap-1 mt-2 h-8 items-end">
        {bars.map((b) => (
          <div
            key={b.label}
            className="bg-blue-200 flex-1"
            style={{ height: `${b.value}%` }}
          />
        ))}
      </div>
    </div>
  )
}
