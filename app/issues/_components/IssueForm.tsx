'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Issue } from '@prisma/client'
import { Button, Callout, TextField } from '@radix-ui/themes'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import SimpleMDE from 'react-simplemde-editor'
import { z } from 'zod'

import { ErrorMessage, Spinner } from '@/app/components'
import { issueSchema } from '@/app/validationSchema'

import 'easymde/dist/easymde.min.css'

type IssueFormData = z.infer<typeof issueSchema>

interface Props {
  issue?: Issue
}

const IssueForm = ({ issue }: Props) => {
  const router = useRouter()
  const [isSubmiting, setIsSubmiting] = useState(false)
  const [error, setError] = useState('')
  const {
    control,
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmiting(true)
      if (issue) {
        await axios.patch('/api/issues/' + issue.id, data)
      } else {
        await axios.post('/api/issues', data)
      }

      router.push('/issues/list')
      router.refresh()
    } catch (error) {
      setIsSubmiting(false)
      setError('An unexpected error occured.')
    }
  })

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField.Root>
          <TextField.Input
            defaultValue={issue?.title}
            placeholder="Title"
            {...register('title')}
          />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmiting}>
          {issue ? 'Update' : 'Submit New'} Issue {isSubmiting && <Spinner />}
        </Button>
      </form>
    </div>
  )
}

export default IssueForm
