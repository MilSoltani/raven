import type { User } from '@raven/api/exports'
import type { ColumnDef } from '@tanstack/react-table'
import type { useDeleteUser, useUpdateUser } from './hooks/users.hooks'
import { TableDrawer } from '@raven/web/common/components/table.drawer'
import { Button } from '@raven/web/common/components/ui/button'
import { IconArrowsUpDown } from '@tabler/icons-react'
import { UsersDetails } from './components/users.details'

export function createUsersColumns(
  deleteUser: ReturnType<typeof useDeleteUser>,
  updateUser: ReturnType<typeof useUpdateUser>,
): ColumnDef<User>[] {
  return [
    {
      accessorKey: 'id',
      header: 'Id',
      size: 20,
    },
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="font-bold"
        >
          Name
          <IconArrowsUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'details',
      header: 'Details',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <TableDrawer
            drawerTitle="User Details"
            drawerDescription=""
            drawerBody={(
              <UsersDetails
                user={row.original}
                updateUser={updateUser}
                deleteUser={deleteUser}
                mode="edit"
              />
            )}
            editPageUrl={`/users/${row.original.id}`}
          />
        </div>
      ),
      size: 20,
    },
  ]
}
