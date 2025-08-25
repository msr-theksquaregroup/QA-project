import { create } from 'zustand'

export type Notebook = 18 | 24

interface UIState {
  selectedPaths: string[]
  useNotebook: Notebook
  lastRunId?: string
  addPath: (path: string) => void
  removePath: (path: string) => void
  togglePath: (path: string) => void
  setNotebook: (nb: Notebook) => void
  setLastRunId: (runId?: string) => void
  resetSelections: () => void
}

export const useUIStore = create<UIState>((set) => ({
  selectedPaths: [],
  useNotebook: 24,
  lastRunId: undefined,
  addPath: (path) =>
    set((state) =>
      state.selectedPaths.includes(path)
        ? state
        : { selectedPaths: [...state.selectedPaths, path] }
    ),
  removePath: (path) =>
    set((state) => ({
      selectedPaths: state.selectedPaths.filter((p) => p !== path),
    })),
  togglePath: (path) =>
    set((state) =>
      state.selectedPaths.includes(path)
        ? { selectedPaths: state.selectedPaths.filter((p) => p !== path) }
        : { selectedPaths: [...state.selectedPaths, path] }
    ),
  setNotebook: (nb) => set({ useNotebook: nb }),
  setLastRunId: (runId) => set({ lastRunId: runId }),
  resetSelections: () => set({ selectedPaths: [], useNotebook: 24 }),
}))

export const useSelectedPaths = () =>
  useUIStore((state) => state.selectedPaths)
export const useNotebook = () => useUIStore((state) => state.useNotebook)
export const useLastRunId = () => useUIStore((state) => state.lastRunId)
export const useUIActions = () =>
  useUIStore((state) => ({
    addPath: state.addPath,
    removePath: state.removePath,
    togglePath: state.togglePath,
    setNotebook: state.setNotebook,
    setLastRunId: state.setLastRunId,
    resetSelections: state.resetSelections,
  }))

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
