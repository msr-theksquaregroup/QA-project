import { useMemo, useState } from 'react'
import type { FileNode } from '../types'
import { useSelectedPaths, useUIActions } from '../lib/store'

interface Props {
  nodes: FileNode[]
  onSelectFile?: (path: string) => void
}

function collectPaths(node: FileNode): string[] {
  if (!node.isDir) return [node.path]
  return node.children?.flatMap(collectPaths) ?? []
}

function Node({ node, onSelectFile }: { node: FileNode; onSelectFile?: (p: string) => void }) {
  const [open, setOpen] = useState(false)
  const selected = useSelectedPaths()
  const { addPath, removePath, togglePath } = useUIActions()
  const selectedSet = useMemo(() => new Set(selected), [selected])

  const descendants = useMemo(() => collectPaths(node), [node])
  const allSelected = descendants.every((p) => selectedSet.has(p))
  const someSelected = !allSelected && descendants.some((p) => selectedSet.has(p))

  const handleCheck = () => {
    if (node.isDir) {
      if (allSelected) {
        descendants.forEach((p) => removePath(p))
      } else {
        descendants.forEach((p) => addPath(p))
      }
    } else {
      togglePath(node.path)
    }
  }

  return (
  <div className="ml-4">
    <div className="flex items-center gap-1">
      {node.isDir && (
        <button onClick={() => setOpen(!open)} className="text-xs w-4">
          {open ? '-' : '+'}
        </button>
      )}
      <label className="flex items-center gap-1">
        <input
          type="checkbox"
          checked={allSelected}
          ref={(el) => {
            if (el) el.indeterminate = someSelected
          }}
          onChange={handleCheck}
        />
        <span
          className={node.isDir ? '' : 'cursor-pointer'}
          onClick={() => !node.isDir && onSelectFile?.(node.path)}
        >
          {node.name}
        </span>
      </label>
    </div>
    {open &&
      node.children?.map((c) => (
        <Node key={c.path} node={c} onSelectFile={onSelectFile} />
      ))}
  </div>
  )
}

export function FileTree({ nodes, onSelectFile }: Props) {
  return (
    <div>
      {nodes.map((n) => (
        <Node key={n.path} node={n} onSelectFile={onSelectFile} />


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
