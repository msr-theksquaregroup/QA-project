import { Check } from 'lucide-react'
import type { AgentState } from '../types'

interface Props {
  agents: AgentState[]
}

export function AgentsProgress({ agents }: Props) {
  return (
    <ol className="space-y-2">
      {agents.map((a) => (
        <li key={a.name} className="flex items-center gap-2">
          <span className="w-4 h-4 border rounded-full flex items-center justify-center">
            {a.status === 'done' && <Check className="w-3 h-3" />}
          </span>
          <span className={a.status === 'done' ? 'text-gray-800' : 'text-gray-500'}>
            {a.name}
          </span>
        </li>
      ))}
    </ol>
  )
}
