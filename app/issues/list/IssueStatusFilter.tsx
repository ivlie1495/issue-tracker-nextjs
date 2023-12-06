'use client'

import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation'

const statuses: { label: string; value?: Status }[] = [
  { label: 'All' },
  { label: 'Open', value: 'OPEN' },
  { label: 'Closed', value: 'CLOSED' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
]

const IssueStatusFilter = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const status = searchParams.get('status')

  return (
    <Select.Root
      defaultValue={status || 'all'}
      onValueChange={(value: Status) => {
        const params = new URLSearchParams()

        if (value) {
          const statusList = statuses.map((status) => status.value)
          if (statusList.includes(value)) {
            params.set('status', value)
          } else {
            params.delete('status')
          }
        }

        const orderBy = searchParams.get('orderBy')
        if (orderBy) {
          params.set('orderBy', orderBy)
        }

        const query = params.size ? `?${params.toString()}` : ''
        router.push(`/issues/list${query}`)
      }}
    >
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item
            key={status.label}
            value={status.value || 'all'}
            // disabled={!status.value}
          >
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}

export default IssueStatusFilter
