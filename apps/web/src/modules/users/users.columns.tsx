import type { User } from '@raven/api/exports'
import type { ColumnDef } from '@tanstack/react-table'
import type { useDeleteUser, useUpdateUser } from './hooks/users.hooks'

import { Button } from '@raven/web/common/components/ui/button'

import { IconArrowsUpDown, IconEdit } from '@tabler/icons-react'
import { UsersDetails } from './components/users.details'

export function createUsersColumns(
  deleteUser: ReturnType<typeof useDeleteUser>,
  updateUser: ReturnType<typeof useUpdateUser>,
): ColumnDef<User>[] {
  return [
    {
      accessorKey: 'id',
      header: 'Id',
    },
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
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
      header: 'actions',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <UsersDetails
            user={row.original}
            updateUser={updateUser}
            deleteUser={deleteUser}
          />

          <Button
            variant="outline"
            size="icon"
          >
            <IconEdit className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ]
}
