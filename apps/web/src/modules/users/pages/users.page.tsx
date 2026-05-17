import { useUsers } from '../hooks/users.hooks'
import { UsersForm } from './users-form'

export function UsersPage() {
  const { data, isLoading, isError, error } = useUsers({
    select: ['name', 'email'],
    sort: {
      name: 'asc',
    },
  })

  return (
    <UsersForm
      data={data}
      isLoading={isLoading}
      isError={isError}
      error={error as Error | null}
    />
  )
}
