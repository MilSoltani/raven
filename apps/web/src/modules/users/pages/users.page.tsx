import { useUsers } from '../hooks/users.hooks'

export function UsersPage() {
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

  return (
    <div style={{ padding: '20px' }}>
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
