import type { User } from '@raven/api/exports'
import type { ColumnDef } from '@tanstack/react-table'
import { Button } from '@raven/web/common/components/ui/button'
import { IconArrowsUpDown } from '@tabler/icons-react'
import { UserActionCell } from './components/user-action-cell'

export const userColumns: ColumnDef<User>[] = [
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
    cell: ({ row }) => <UserActionCell user={row.original} />,
    size: 20,
  },
]
