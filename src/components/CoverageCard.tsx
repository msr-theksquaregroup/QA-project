import type { Coverage } from '../types'

interface Props {
  coverage: Coverage
}

export function CoverageCard({ coverage }: Props) {
  const tiles = [
    { label: 'Overall', value: coverage.overall_percentage },
    { label: 'Statements', value: coverage.statements_percentage },
    { label: 'Functions', value: coverage.functions_percentage },
    { label: 'Branches', value: coverage.branches_percentage },
  ]

  const bars = tiles.slice(1)

  return (
    <div className="border rounded-xl p-4 bg-gray-100">
      <div className="grid grid-cols-2 gap-2 mb-4">
        {tiles.map((t) => (
          <div key={t.label} className="text-center">
            <div className="text-sm text-gray-500">{t.label}</div>
            <div className="text-xl font-semibold">{t.value}%</div>
          </div>
        ))}
      </div>
      <div className="flex gap-1 h-8 items-end">
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
