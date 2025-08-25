import { useState } from 'react'
import type { FileNode } from '../types'

interface Props {
  nodes: FileNode[]
  selected: Set<string>
  onToggle: (path: string) => void
}

function Node({ node, selected, onToggle }: { node: FileNode; selected: Set<string>; onToggle: (p: string) => void }) {
  const [open, setOpen] = useState(false)
  const isSelected = selected.has(node.path)
  return (
    <div className="ml-4">
      <div className="flex items-center gap-1">
        {node.children && (
          <button onClick={() => setOpen(!open)} className="text-xs w-4">
            {open ? '-' : '+'}
          </button>
        )}
        <label className="flex items-center gap-1">
          <input type="checkbox" checked={isSelected} onChange={() => onToggle(node.path)} />
          {node.name}
        </label>
      </div>
      {open && node.children?.map((c) => (
        <Node key={c.path} node={c} selected={selected} onToggle={onToggle} />
      ))}
    </div>
  )
}

export function FileTree({ nodes, selected, onToggle }: Props) {
  return (
    <div>
      {nodes.map((n) => (
        <Node key={n.path} node={n} selected={selected} onToggle={onToggle} />
      ))}
    </div>
  )
}
