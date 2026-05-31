import type { Criteria } from '@raven/api/exports'
import type { SortingState } from '@tanstack/react-table'
import { CreateUserPayloadSchema } from '@raven/api/exports'
import { AppDrawer } from '@raven/web/common/components/app.drawer'
import { DataTable } from '@raven/web/common/components/data.table'
import { Button } from '@raven/web/common/components/ui/button'
import { sortingToSort, sortToSorting } from '@raven/web/common/utils/sorting-adapters'
import { IconPlus } from '@tabler/icons-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { UsersForm } from '../components/users.form'
import { useCreateUser, useUsers } from '../hooks/users.hooks'
import { useUserColumns } from '../users.columns'

export function UsersPage() {
  const { t } = useTranslation('web')

  const [drawerOpen, setDrawerOpen] = useState(false)

  const [criteria, setCriteria] = useState<Criteria>({
    select: ['name', 'email', 'createdAt', 'updatedAt'],
    page: 1,
    limit: 10,
    sort: {
      name: 'asc',
    },
  })

  const { data, isLoading, isError, error } = useUsers(criteria)

  const createUser = useCreateUser()
  const columns = useUserColumns()

  if (isLoading) {
    return (
      <div>
        {t('users.ui.loading')}
        ...
      </div>
    )
  }

  if (isError || !data) {
    return (
      <div>
        {t('users.ui.loadingError')}
        :
        {error?.message}
      </div>
    )
  }

  const { items, meta } = data

  const safePagination = meta ?? {
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
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        drawerTitle="New User"
        drawerDescription=""
        drawerBody={(
          <UsersForm
            mode="create"
            user={{ name: '', email: '' }}
            error={createUser.error?.message}
            onSubmit={(data) => {
              createUser.mutate(
                CreateUserPayloadSchema.parse(data),
                { onSuccess: () => setDrawerOpen(false) },
              )
            }}
            footer={(
              <Button
                type="submit"
                disabled={createUser.isPending}
              >
                {createUser.isPending
                  ? t('users.form.creating')
                  : t('users.form.create')}
              </Button>
            )}
          />
        )}
        triggerButton={(
          <Button variant="outline">
            <IconPlus className="h-4 w-4 me-2" />
            {t('users.form.create')}
          </Button>
        )}
      />

      <DataTable
        columns={columns}
        data={items}
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
