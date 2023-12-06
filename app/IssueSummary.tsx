import { Status } from '@prisma/client'

import { Card, Flex, Text } from '@radix-ui/themes'
import Link from 'next/link'

interface Props {
  open: number
  inProgress: number
  closed: number
}

const IssueSummary = ({ open, inProgress, closed }: Props) => {
  const containers: { label: string; value: number; status: Status }[] = [
    { label: 'Open Issues', value: open, status: 'OPEN' },
    { label: 'In Progress Issues', value: inProgress, status: 'IN_PROGRESS' },
    { label: 'Closed', value: closed, status: 'CLOSED' },
  ]

  return (
    <Flex gap="4">
      {containers.map(({ label, value, status }) => (
        <Card key={label}>
          <Flex direction="column" gap="1">
            <Link
              href={`/issues/list?status=${status}`}
              className="text-sm font-medium"
            >
              {label}
            </Link>
            <Text size="5" className="font-bold">
              {value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  )
}

export default IssueSummary
