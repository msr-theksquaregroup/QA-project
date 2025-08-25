import { useCallback } from 'react'

interface Props {
  onFiles: (files: FileList) => void
}

export function FileUploader({ onFiles }: Props) {
  const handle = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.dataTransfer.files) {
      onFiles(e.dataTransfer.files)
    }
  }, [onFiles])

  return (
    <div
      onDrop={handle}
      onDragOver={(e) => e.preventDefault()}
      className="border-2 border-dashed rounded p-6 text-center text-sm text-gray-600"
    >
      Drag and drop ZIP or paste URL
    </div>
  )
}
