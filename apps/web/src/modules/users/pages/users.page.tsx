import { useTranslation } from 'react-i18next'
import { useUsers } from '../hooks/users.hooks'

export function UsersPage() {
  const { t } = useTranslation()
  const { data, isLoading, isError, error } = useUsers({ select: ['name', 'email'] })

  if (isLoading) {
    return <div>Loading users...</div>
  }

  if (isError) {
    return (
      <div>
        Error:
        {error instanceof Error ? error.message : 'Unknown error'}
      </div>
    )
  }

  const x = data?.message ? t(data.message) : undefined

  return (
    <div style={{ padding: '20px' }}>
      {x}
      <h1>Users List</h1>
      <ul>
        {data?.users?.map(user => (
          <li key={user.id}>
            {user.name}
            {' '}
            (
            {user.email}
            )
          </li>
        ))}
      </ul>
    </div>
  )
}
