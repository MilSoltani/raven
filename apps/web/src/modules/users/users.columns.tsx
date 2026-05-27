import type { User } from '@raven/api/exports'
import type { ColumnDef } from '@tanstack/react-table'
import type { useDeleteUser } from './hooks/users.hooks'
import { Button } from '@raven/web/common/components/ui/button'
import { IconArrowsUpDown, IconTrash } from '@tabler/icons-react'

export function createUsersColumns(deleteUser: ReturnType<typeof useDeleteUser>): ColumnDef<User>[] {
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
        <div>
          <Button
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation()
              deleteUser.mutate(row.original.id)
            }}
          >
            <IconTrash className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ]
}
