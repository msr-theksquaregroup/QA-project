import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { FileUploader } from '../components/FileUploader'
import { FileTree } from '../components/FileTree'
import { CodePreview } from '../components/CodePreview'
import { Skeleton } from '../components/ui/skeleton'
import { listFiles, getFileContent } from '../lib/api'
import type { FileNode } from '../types'
import { Button } from '@/components/ui/button'

export default function Files() {
  const { data: root, isLoading } = useQuery<FileNode>({
    queryKey: ['files'],
    queryFn: listFiles,
  })

  const [active, setActive] = useState<string>()
  const { data: code, isLoading: codeLoading } = useQuery<string>({
    queryKey: ['file', active],
    queryFn: () => getFileContent(active!),
    enabled: !!active,
  })

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="space-y-4">
        <FileUploader />
        {isLoading ? (
          <Skeleton className="h-40 rounded-xl" />
        ) : root ? (
          <FileTree nodes={[root]} onSelectFile={setActive} />
        ) : (
          <div className="text-sm text-gray-500 p-4 border rounded-xl bg-gray-100 text-center">
            No files uploaded.{' '}
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                document.querySelector<HTMLInputElement>('input[type=file]')?.click()
              }
            >
              Upload code
            </Button>
          </div>
        )}
      </div>
      <div className="col-span-2">
        {active ? (
          codeLoading ? (
            <Skeleton className="h-64 rounded-xl" />
          ) : code ? (
            <CodePreview path={active} code={code} />
          ) : null
        ) : (
          <div className="text-sm text-gray-500">Select a file to preview</div>
        )}
      </div>
    </div>
  )
}
