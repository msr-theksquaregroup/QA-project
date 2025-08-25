import { Routes, Route } from 'react-router-dom'
import { AppShell } from './components/AppShell'
import Dashboard from './pages/Dashboard'
import Files from './pages/Files'
import TestCases from './pages/TestCases'
import Runs from './pages/Runs'
import RunDetail from './pages/RunDetail'

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/files" element={<Files />} />
        <Route path="/tests" element={<TestCases />} />
        <Route path="/runs" element={<Runs />} />
        <Route path="/runs/:runId" element={<RunDetail />} />

        <Route path="/test-cases" element={<TestCases />} />
        <Route path="/runs" element={<Runs />} />
        <Route path="/runs/:id" element={<RunDetail />} />
      </Routes>
    </AppShell>
  )
}
