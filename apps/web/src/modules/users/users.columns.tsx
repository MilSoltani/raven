import type { User } from '@raven/api/exports'
import type { ColumnDef } from '@tanstack/react-table'
import { AppDrawer } from '@raven/web/common/components/app.drawer'
import { Button } from '@raven/web/common/components/ui/button'
import { IconArrowsUpDown } from '@tabler/icons-react'
import { useMemo } from 'react'
import { UsersDetails } from './components/users.details'
import { useDeleteUser, useUpdateUser } from './hooks/users.hooks'

export function useUsersColumns(): ColumnDef<User>[] {
  const deleteUser = useDeleteUser()
  const updateUser = useUpdateUser()

  return useMemo(
    () => [
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
            <AppDrawer
              drawerTitle="User Details"
              drawerDescription=""
              drawerBody={(
                <UsersDetails
                  user={row.original}
                  updateUser={updateUser}
                  deleteUser={deleteUser}
                />
              )}
              editPageUrl={`/users/${row.original.id}`}
            />
          </div>
        ),
        size: 20,
      },
    ],
    [deleteUser, updateUser],
  )
}
