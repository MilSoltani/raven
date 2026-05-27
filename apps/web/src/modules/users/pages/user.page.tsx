import { useParams } from 'react-router-dom'
import { UsersDetails } from '../components/users.details'
import { useDeleteUser, useUpdateUser, useUser } from '../hooks/users.hooks'

export function UserPage() {
  const { id } = useParams<{ id: string }>()

  const userId = id ? Number(id) : Number.NaN

  const { data, isLoading, isError, error } = useUser(userId)
  const updateUser = useUpdateUser()
  const deleteUser = useDeleteUser()

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

  return (
    <UsersDetails
      user={data.user}
      updateUser={updateUser}
      deleteUser={deleteUser}
      mode="edit"
    />
  )
}
