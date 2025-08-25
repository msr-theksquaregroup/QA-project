import {
  Check,
  AlertTriangle,
  X,
  Loader,
  Minus,
  type LucideIcon,
} from 'lucide-react'
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react'
import type { AgentKey, AgentState } from '../types'
import { StatusBadge } from './StatusBadge'
import type { StatusState } from './StatusBadge'

export interface AgentsProgressHandle {
  setActiveAgent: (key: AgentKey) => void
}

import { Check } from 'lucide-react'
import type { AgentState } from '../types'



interface Props {
  agents: AgentState[]
}

const ORDER: { key: AgentKey; label: string }[] = [
  { key: 'code_analysis', label: 'Code Analysis' },
  { key: 'user_story', label: 'User Story' },
  { key: 'gherkin', label: 'Gherkin' },
  { key: 'test_plan', label: 'Test Plan' },
  { key: 'playwright', label: 'Playwright' },
  { key: 'execution', label: 'Execution' },
  { key: 'coverage', label: 'Coverage' },
  { key: 'final_report', label: 'Final Report' },
]

const icons: Record<StatusState, LucideIcon> = {
  success: Check,
  warn: AlertTriangle,
  error: X,
  running: Loader,
  idle: Minus,
}

export const AgentsProgress = forwardRef<AgentsProgressHandle, Props>(
  ({ agents }, ref) => {
    const itemRefs = useRef<Partial<Record<AgentKey, HTMLLIElement | null>>>({})

    const scrollTo = (key: AgentKey) => {
      const el = itemRefs.current[key]
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }

    useImperativeHandle(ref, () => ({
      setActiveAgent: (key: AgentKey) => scrollTo(key),
    }))

    useEffect(() => {
      const running = agents.find((a) => a.state === 'running')
      if (running) scrollTo(running.key)
    }, [agents])

    const lookup = (key: AgentKey): AgentState =>
      agents.find((a) => a.key === key) || {
        key,
        label: ORDER.find((o) => o.key === key)!.label,
        state: 'idle',
      }

    return (
      <ol className="space-y-2 max-h-64 overflow-auto">
        {ORDER.map(({ key, label }) => {
          const agent = lookup(key)
          const Icon = icons[agent.state]
          return (
            <li
              key={key}
              ref={(el) => {
                itemRefs.current[key] = el
              }}
              className="flex items-start justify-between gap-2"
            >
              <div className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full border flex items-center justify-center">
                  <Icon
                    className={`w-3 h-3 ${
                      agent.state === 'running' ? 'animate-spin' : ''
                    }`}
                  />
                </span>
                <div>
                  <div className="text-sm">{agent.label || label}</div>
                  {agent.message && (
                    <div className="text-xs text-gray-500">{agent.message}</div>
                  )}
                </div>
              </div>
              <StatusBadge state={agent.state} />
            </li>
          )
        })}
      </ol>
    )
  }
)

AgentsProgress.displayName = 'AgentsProgress'




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

