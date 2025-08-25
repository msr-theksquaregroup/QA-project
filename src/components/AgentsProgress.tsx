import { Check } from 'lucide-react'
import type { AgentState } from '../types'

interface Props {
  agents: AgentState[]
}

export function AgentsProgress({ agents }: Props) {
  return (
    <ol className="space-y-2">
      {agents.map((a) => (
        <li key={a.key} className="flex items-center gap-2">
          <span className="w-4 h-4 border rounded-full flex items-center justify-center">
            {a.state === 'success' && <Check className="w-3 h-3" />}
          </span>
          <span
            className={
              a.state === 'success'
                ? 'text-gray-800'
                : a.state === 'running'
                  ? 'text-blue-600'
                  : 'text-gray-500'
            }
          >
            {a.label}
          </span>
        </li>
      ))}
    </ol>
  )
}
