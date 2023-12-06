'use client'

import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { Select } from '@radix-ui/themes'
import { Issue, User } from '@prisma/client'
import toast, { Toaster } from 'react-hot-toast'

import Skeleton from '@/app/components/Skeleton'

interface Props {
  issue: Issue
}

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then((res) => res.data),
    staleTime: 60 * 1000, // 60s
    retry: 3,
  })

const AssigneeSelect = ({ issue }: Props) => {
  const { data: users, error, isLoading } = useUsers()

  if (isLoading) {
    return <Skeleton />
  }

  if (error) {
    return null
  }

  const assignIssue = async (userId: string) => {
    try {
      await axios.patch(`/api/issues/${issue.id}`, {
        assignedToUserId: userId !== '0' ? userId : null,
      })
    } catch (err) {
      toast.error('Changes could not be saved.')
    }
  }

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || '0'}
        onValueChange={assignIssue}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="0">Unassigned</Select.Item>
            {users?.map((u) => (
              <Select.Item key={u.id} value={u.id}>
                {u.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  )
}

export default AssigneeSelect
