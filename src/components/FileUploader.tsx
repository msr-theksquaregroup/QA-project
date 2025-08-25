import { useCallback, useRef, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { uploadZip, uploadByUrl } from '../lib/api'
import { Button } from './ui/button'

export function FileUploader() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [url, setUrl] = useState('')
  const qc = useQueryClient()

  const handleFiles = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return
      try {
        await uploadZip(files[0])
        alert('Upload successful')
        qc.invalidateQueries({ queryKey: ['files'] })
      } catch {
        alert('Upload failed')
      }
    },
    [qc]
  )

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      handleFiles(e.dataTransfer.files)
    },
    [handleFiles]
  )

  const onBrowse = () => inputRef.current?.click()

  const handleUrl = async () => {
    if (!url) return
    try {
      await uploadByUrl(url)
      alert('Upload successful')
      qc.invalidateQueries({ queryKey: ['files'] })
      setUrl('')
    } catch {
      alert('Upload failed')
    }
  }

  return (
    <div className="space-y-2">
      <div
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed rounded p-6 text-center text-sm text-gray-600 flex flex-col items-center gap-2"
      >
        <p>Drag and drop ZIP</p>
        <Button size="sm" onClick={onBrowse}>
          Browse
        </Button>
        <input
          type="file"
          accept=".zip"
          ref={inputRef}
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
        />
      </div>
      <div className="flex gap-2">
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Or paste a URL"
          className="border rounded px-2 py-1 flex-1 text-sm"
        />
        <Button size="sm" onClick={handleUrl}>
          Upload
        </Button>
      </div>
  

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
