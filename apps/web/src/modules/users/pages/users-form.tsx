import type { User } from '@raven/api/exports'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@raven/web/components/ui/table'
import { CreateUserComponent } from '../components/create-user.component'

type UsersFormProps = {
  data?: User[]
  isLoading: boolean
  isError: boolean
  error?: Error | null
}

export function UsersForm({ data, isLoading, isError, error }: UsersFormProps) {
  if (isLoading)
    return <div>Loading users...</div>

  if (isError)
    return <div>{error?.message ?? 'Error loading users'}</div>

  return (
    <div>
      <CreateUserComponent />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map(user => (
            <TableRow key={user.id}>
              <TableCell className="font-light w-[40px]">{user.id}</TableCell>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
