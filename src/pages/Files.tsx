import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { FileUploader } from '../components/FileUploader'
import { FileTree } from '../components/FileTree'
import { CodePreview } from '../components/CodePreview'
import { listFiles, getFileContent } from '../lib/api'
import type { FileNode } from '../types'

export default function Files() {
  const { data: root } = useQuery<FileNode>({
    queryKey: ['files'],
    queryFn: listFiles,
  })

  const [active, setActive] = useState<string>()
  const { data: code } = useQuery<string>({
    queryKey: ['file', active],
    queryFn: () => getFileContent(active!),
    enabled: !!active,
  })

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="space-y-4">
        <FileUploader />
        {root && <FileTree nodes={[root]} onSelectFile={setActive} />}
      </div>
      <div className="col-span-2">
        {active && code ? (
          <CodePreview path={active} code={code} />
        ) : (
          <div className="text-sm text-gray-500">Select a file to preview</div>
        )}

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
