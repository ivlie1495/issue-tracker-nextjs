import { Metadata } from 'next'
import { Flex, Grid } from '@radix-ui/themes'

import prisma from '@/prisma/client'

import IssueSummary from './IssueSummary'
import LatestIssues from './LatestIssues'
import IssueChart from './IssueChart'

const Home = async () => {
  const open = await prisma.issue.count({
    where: {
      status: 'OPEN',
    },
  })
  const inProgress = await prisma.issue.count({
    where: {
      status: 'IN_PROGRESS',
    },
  })
  const closed = await prisma.issue.count({
    where: {
      status: 'CLOSED',
    },
  })
  const countStatusProps = { open, inProgress, closed }

  return (
    <Grid
      columns={{
        initial: '1',
        md: '2',
      }}
      gap="5"
    >
      <Flex direction="column" gap="5">
        <IssueSummary {...countStatusProps} />
        <IssueChart {...countStatusProps} />
      </Flex>
      <LatestIssues />
    </Grid>
  )
}

export const metadata: Metadata = {
  title: 'Issue Tracker - Dashboard',
  description: 'View summary of project issues',
}

export default Home
