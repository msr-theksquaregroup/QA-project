import Editor from '@monaco-editor/react'
import { useMemo } from 'react'
import { useUIActions } from '../lib/store'
import { Button } from './ui/button'


interface Props {
  path: string
  code: string
}

function langFromPath(path: string): string | undefined {
  const ext = path.split('.').pop() || ''
  switch (ext) {
    case 'ts':
      return 'typescript'
    case 'tsx':
      return 'typescript'
    case 'js':
      return 'javascript'
    case 'jsx':
      return 'javascript'
    case 'json':
      return 'json'
    case 'css':
      return 'css'
    case 'html':
      return 'html'
    default:
      return undefined
  }
}

export function CodePreview({ path, code }: Props) {
  const { addPath } = useUIActions()
  const language = useMemo(() => langFromPath(path), [path])

  return (
    <div className="border rounded flex flex-col h-full">
      <div className="px-2 py-1 bg-gray-100 text-xs border-b sticky top-0 flex justify-between items-center">
        <span>{path}</span>
        <Button size="sm" variant="outline" onClick={() => addPath(path)}>
          Add to Selection
        </Button>
      </div>
  language?: string
}

export function CodePreview({ path, code, language }: Props) {
  return (
    <div className="border rounded">
      <div className="px-2 py-1 bg-gray-100 text-xs border-b">{path}</div>
      <Editor
        value={code}
        language={language}
        theme="vs-light"
        options={{ readOnly: true, minimap: { enabled: false } }}
        height="400px"
        height="300px"
      />
    </div>
  )
}
