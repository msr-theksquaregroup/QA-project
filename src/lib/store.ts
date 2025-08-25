import { create } from 'zustand'

interface UIState {
  selectedFiles: string[]
  notebook: string | null
  setSelectedFiles: (files: string[]) => void
  setNotebook: (notebook: string | null) => void
}

export const useUIStore = create<UIState>((set) => ({
  selectedFiles: [],
  notebook: null,
  setSelectedFiles: (files) => set({ selectedFiles: files }),
  setNotebook: (notebook) => set({ notebook }),
}))
