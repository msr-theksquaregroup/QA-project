import type { Coverage } from '../types'

interface Props {
  coverage: Coverage
}

export function CoverageCard({ coverage }: Props) {
  return (
    <div className="border rounded p-4">
      <div className="text-sm text-gray-500">Coverage</div>
      <div className="text-2xl font-bold">{coverage.percent}%</div>
      <div className="flex gap-1 mt-2 h-8 items-end">
        {coverage.history.map((v, i) => (
          <div key={i} className="bg-blue-200 w-2" style={{ height: `${v}%` }} />
        ))}
      </div>
    </div>
  )
}
