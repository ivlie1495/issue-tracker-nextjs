import Link from 'next/link'
import { Button, Flex } from '@radix-ui/themes'

import IssueStatusFilter from './IssueStatusFilter'

const IssuesAction = () => {
  return (
    <Flex justify="between">
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
      <IssueStatusFilter />
    </Flex>
  )
}

export default IssuesAction
