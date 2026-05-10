import type { User } from '@raven/api/exports'
import { usersClient } from '@raven/api/exports'
import { useEffect, useState } from 'react'

export function Home() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    async function loadUsers() {
      const res = await usersClient[':id'].$get({ param: { id: 4 } })

      if (!res.ok) {
        throw new Error('Failed to fetch users')
      }

      const data = await res.json()

      setUsers([data])
    }

    loadUsers()
  }, [])

  return (
    <div>
      <h1>Users</h1>

      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  )
}
