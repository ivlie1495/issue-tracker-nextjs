'use client'

import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Button, Callout, Text, TextField } from '@radix-ui/themes'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import SimpleMDE from 'react-simplemde-editor'

import { createIssueSchema } from '@/app/validationSchema'
import 'easymde/dist/easymde.min.css'
import ErrorMessage from '@/app/components/ErrorMessage'
import Spinner from '@/app/components/Spinner'

type IssueForm = z.infer<typeof createIssueSchema>

const NewIssuePage = () => {
  const router = useRouter()
  const [isSubmiting, setIsSubmiting] = useState(false)
  const [error, setError] = useState('')
  const {
    control,
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  })

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            setIsSubmiting(true)
            await axios.post('/api/issues', data)
            router.push('/issues')
          } catch (error) {
            setIsSubmiting(false)
            setError('An unexpected error occured.')
          }
        })}
      >
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register('title')} />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmiting}>
          Submit New Issue {isSubmiting && <Spinner />}
        </Button>
      </form>
    </div>
  )
}

export default NewIssuePage
