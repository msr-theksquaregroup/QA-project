import { useParams } from 'react-router-dom'
import { StatusBadge } from '../components/StatusBadge'

export default function RunDetail() {
  const { id } = useParams()
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Run {id}</h2>
      <StatusBadge status="pending" />
    </div>
  )
}
