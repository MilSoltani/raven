import type { User } from '@raven/api/exports'
import type { ColumnDef } from '@tanstack/react-table'
import type { useDeleteUser } from './hooks/users.hooks'
import { Button } from '@raven/web/common/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@raven/web/common/components/ui/dropdown-menu'
import { IconArrowsUpDown, IconDotsFilled } from '@tabler/icons-react'

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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0"
            >
              <IconDotsFilled className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem
              variant="destructive"
              onClick={(e) => {
                e.stopPropagation()
                deleteUser.mutate(row.original.id)
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]
}
