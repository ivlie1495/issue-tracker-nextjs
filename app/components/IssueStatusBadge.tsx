import { Badge } from '@radix-ui/themes'
import { Status } from '@prisma/client'

interface BadgeValue {
  label: string
  color: 'red' | 'violet' | 'green'
}

const statusMap: Record<Status, BadgeValue> = {
  OPEN: {
    label: 'Open',
    color: 'red',
  },
  IN_PROGRESS: {
    label: 'In Progress',
    color: 'violet',
  },
  CLOSED: {
    label: 'Closed',
    color: 'green',
  },
}

interface Props {
  status: Status
}

const IssueStatusBadge = ({ status }: Props) => {
  const { label, color } = statusMap[status]

  return <Badge color={color}>{label}</Badge>
}

export default IssueStatusBadge
