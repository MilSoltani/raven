import type { CreateUserPayload } from '@raven/api/exports'
import type { UseFormSetError } from 'react-hook-form' // <-- Add this import
import { useParams } from 'react-router-dom'
import { UsersForm } from '../components/users-form'
import { useUpdateUser, useUser } from '../hooks/users.hooks'

export function UsersEditPage() {
  const { id } = useParams()

  if (!id)
    throw new Error('Id missing from parameters')
  const userId = Number.parseInt(id)

  const { data: user, isLoading } = useUser(userId)
  const update = useUpdateUser()

  const handleUpdate = (
    data: CreateUserPayload,
    setError: UseFormSetError<CreateUserPayload>,
  ) => {
    update.mutate({ id: userId, data }, {
      onError: (err) => {
        setError('root.serverError', { message: err.message })
      },
    })
  }

  if (isLoading)
    return <div>Loading user data...</div>

  return (
    <div>
      <UsersForm
        initialData={user}
        onSubmit={handleUpdate}
        isPending={update.isPending}
      />
    </div>
  )
}
