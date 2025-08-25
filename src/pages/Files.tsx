import { useState } from 'react'
import { FileUploader } from '../components/FileUploader'
import { FileTree } from '../components/FileTree'
import { CodePreview } from '../components/CodePreview'
import type { FileNode } from '../types'

export default function Files() {
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [tree] = useState<FileNode[]>([
    {
      name: 'src',
      path: 'src',
      isDir: true,
      children: [{ name: 'main.tsx', path: 'src/main.tsx', isDir: false }],

      children: [{ name: 'main.tsx', path: 'src/main.tsx' }],

    },
  ])

  const toggle = (path: string) => {
    const next = new Set(selected)
    if (next.has(path)) {
      next.delete(path)
    } else {
      next.add(path)
    }
    next.has(path) ? next.delete(path) : next.add(path)

    setSelected(next)
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      <div>
        <FileUploader onFiles={() => {}} />
        <FileTree nodes={tree} selected={selected} onToggle={toggle} />
      </div>
      <div className="col-span-2">
        <CodePreview path="example.ts" code={`console.log('hello')`} language="typescript" />
      </div>
    </div>
  )
}
