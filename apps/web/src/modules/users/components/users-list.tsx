import type { PaginatedResult, User } from '@raven/api/exports'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@raven/web/components/ui/table'
import { UsersRow } from './users-row'

type UsersListProps = {
  data?: PaginatedResult<User>
}

export function UsersList({ data }: UsersListProps) {
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
        {data?.data?.map(user => (
          <UsersRow
            key={user.id}
            user={user}
          />
        ))}
      </TableBody>
    </Table>
  )
}
