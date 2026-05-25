import type { User } from '@raven/api/exports'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@raven/web/components/ui/table'
import { UsersRow } from './users-row'

type UsersListProps = {
  users: User[]
}

export function UsersList({ users }: UsersListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>id</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>email</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map(user => (
          <UsersRow
            key={user.id}
            user={user}
          />
        ))}
      </TableBody>
    </Table>
  )
}
