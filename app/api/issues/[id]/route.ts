import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import prisma from '@/prisma/client'

import { patchIssueSchema } from '@/app/validationSchema'
import authOptions from '@/app/auth/authOptions'

interface Params {
  params: { id: string }
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const data = await getServerSession(authOptions)
  if (!data) {
    return NextResponse.json({}, { status: 401 })
  }

  const body = await request.json()
  const validation = patchIssueSchema.safeParse(body)

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 })
  }

  const { title, description, assignedToUserId } = body
  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: {
        id: assignedToUserId,
      },
    })

    if (!user) {
      return NextResponse.json({ error: 'Invalid user' }, { status: 400 })
    }
  }

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  })

  if (!issue) {
    return NextResponse.json({ error: 'Invalid issue' }, { status: 404 })
  }

  const updatedIssue = await prisma.issue.update({
    where: {
      id: issue.id,
    },
    data: { title, description, assignedToUserId },
  })

  return NextResponse.json(updatedIssue, { status: 200 })
}

export async function DELETE(_: NextRequest, { params }: Params) {
  const data = await getServerSession(authOptions)
  if (!data) {
    return NextResponse.json({}, { status: 401 })
  }

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  })

  if (!issue) {
    return NextResponse.json({ error: 'Invalid issue' }, { status: 404 })
  }

  await prisma.issue.delete({
    where: {
      id: issue.id,
    },
  })

  return NextResponse.json({}, { status: 200 })
}
