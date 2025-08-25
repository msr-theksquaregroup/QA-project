import Editor from '@monaco-editor/react'

interface Props {
  path: string
  code: string
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
        height="300px"
      />
    </div>
  )
}
