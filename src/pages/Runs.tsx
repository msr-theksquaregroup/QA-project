import { useQuery } from '@tanstack/react-query'
import { RunsTable } from '@/components/RunsTable'
import { listReports } from '@/lib/api'

export default function Runs() {
  const { data } = useQuery({ queryKey: ['reports'], queryFn: listReports })
  return (
    <RunsTable
      runs={data ?? []}
      getLink={(run) => `/runs/${run.runId}`}
    />
  )
}
