import type { UpdateUserPayload } from '@raven/api/exports'
import type { UseFormSetError } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { UsersForm } from '../components/users-form'
import { useUpdateUser, useUser } from '../hooks/users.hooks'

export function UserPage() {
  const { id } = useParams<{ id: string }>()

  const userId = id ? Number(id) : Number.NaN

  const { data, isLoading, isError, error } = useUser(userId)
  const update = useUpdateUser()

  if (!id || Number.isNaN(userId)) {
    return <div>Invalid user id</div>
  }

  if (isLoading)
    return <div>Loading users...</div>

  if (isError || !data) {
    return (
      <div>
        Error:
        {error instanceof Error ? error.message : ''}
      </div>
    )
  }

  const handleUpdate = (
    data: UpdateUserPayload,
    setError: UseFormSetError<UpdateUserPayload>,
  ) => {
    update.mutate(
      { id: userId, data },
      {
        onError: (err) => {
          setError('root.serverError', {
            message: err instanceof Error ? err.message : 'Unknown error',
          })
        },
      },
    )
  }

  return (
    <UsersForm
      initialData={data.user}
      onSubmit={handleUpdate}
      isPending={update.isPending}
    />
  )
}
