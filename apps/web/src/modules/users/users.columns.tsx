import type { User } from '@raven/api/exports'
import type { ColumnDef } from '@tanstack/react-table'
import { UpdateUserPayloadSchema } from '@raven/api/exports'
import { AppDrawer } from '@raven/web/common/components/app.drawer'
import { Button } from '@raven/web/common/components/ui/button'
import { DrawerTrigger } from '@raven/web/common/components/ui/drawer'
import { IconArrowsUpDown, IconLayoutSidebarRightExpandFilled } from '@tabler/icons-react'
import { useMemo, useState } from 'react'
import { UsersForm } from './components/users.form'
import { useUpdateUser } from './hooks/users.hooks'

export function useUsersColumns(): ColumnDef<User>[] {
  const [createDrawerOpen, setCreateDrawerOpen] = useState(false)

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
              isOpen={createDrawerOpen}
              setIsOpen={setCreateDrawerOpen}
              drawerTitle="User Details"
              drawerDescription=""
              drawerBody={(
                <UsersForm
                  mode="edit"
                  user={row.original}
                  error={updateUser.error?.message}
                  onSubmit={(data) => {
                    updateUser.mutate({
                      id: row.original.id,
                      data: UpdateUserPayloadSchema.parse(data),
                    })
                  }}
                  footer={(
                    <DrawerTrigger asChild>
                      <Button
                        type="submit"
                        disabled={updateUser.isPending}
                      >
                        update
                      </Button>
                    </DrawerTrigger>
                  )}
                />
              )}
              pageLinkUrl={`/users/${row.original.id}`}
              triggerButton={(
                <Button
                  variant="outline"
                  size="icon"
                >
                  <IconLayoutSidebarRightExpandFilled className="h-4 w-4" />
                </Button>
              )}
            />
          </div>
        ),
        size: 20,
      },
    ],
    [updateUser],
  )
}
