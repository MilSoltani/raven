import { useUsers } from '../hooks/use-get-users'
import { UsersForm } from './users-form'

export function UsersPage() {
  const { data, isLoading, isError, error } = useUsers()

  return (
    <UsersForm
      data={data}
      isLoading={isLoading}
      isError={isError}
      error={error as Error | null}
    />
  )
}
