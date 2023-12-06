import { Metadata } from 'next'
import dynamic from 'next/dynamic'

import IssueFormSkeleton from '@/app/issues/_components/IssueFormSkeleton'

const IssueForm = dynamic(() => import('@/app/issues/_components/IssueForm'), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
})

const NewIssuePage = () => {
  return <IssueForm />
}

export const metadata: Metadata = {
  title: 'Issue Tracker - Add Issue',
  description: 'Adding new issue to project',
}

export default NewIssuePage
