import type { Criteria } from '@raven/api/exports'
import type { SortingState } from '@tanstack/react-table'
import { CreateUserPayloadSchema } from '@raven/api/exports'
import { AppDrawer } from '@raven/web/common/components/app.drawer'
import { DataTable } from '@raven/web/common/components/data.table'
import { Button } from '@raven/web/common/components/ui/button'
import { DrawerTrigger } from '@raven/web/common/components/ui/drawer'
import { sortingToSort, sortToSorting } from '@raven/web/common/utils/sorting-adapters'
import { IconPlus } from '@tabler/icons-react'
import { useState } from 'react'
import { UsersForm } from '../components/users.form'
import { useCreateUser, useUsers } from '../hooks/users.hooks'
import { useUsersColumns } from '../users.columns'

export function UsersPage() {
  const [criteria, setCriteria] = useState<Criteria>({
    select: ['name', 'email', 'createdAt', 'updatedAt'],
    page: 1,
    limit: 10,
    sort: {
      name: 'asc',
    },
  })

  const { data, isLoading, isError, error } = useUsers(criteria)

  const columns = useUsersColumns()

  const createUser = useCreateUser()

  if (isLoading) {
    return <div>Loading users...</div>
  }

  if (isError || !data) {
    return (
      <div>
        Error:
        {' '}
        {error?.message}
      </div>
    )
  }

  const { users, pagination } = data

  const safePagination = pagination ?? {
    page: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  }

  const sorting: SortingState = sortToSorting(criteria.sort)

  return (
    <div>
      <AppDrawer
        drawerTitle="New User"
        drawerDescription=""
        drawerBody={(
          <UsersForm
            mode="create"
            user={{ name: '', email: '' }}
            error={createUser.error?.message}
            onSubmit={(data) => {
              createUser.mutate(CreateUserPayloadSchema.parse(data))
            }}
            footer={(
              <DrawerTrigger asChild>
                <Button
                  type="submit"
                  disabled={createUser.isPending}
                >
                  create
                </Button>
              </DrawerTrigger>
            )}
          />
        )}
        triggerButton={(
          <Button variant="outline">
            <IconPlus className="h-4 w-4 me-2" />
            create
          </Button>
        )}
      />

      <DataTable
        columns={columns}
        data={users}
        pagination={safePagination}
        sorting={sorting}
        onPaginationChange={p =>
          setCriteria(prev => ({
            ...prev,
            page: p.page,
            limit: p.pageSize,
          }))}
        onSortingChange={s =>
          setCriteria(prev => ({
            ...prev,
            page: 1,
            sort: sortingToSort(s),
          }))}
      />
    </div>
  )
}
