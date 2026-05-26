import type { CreateUserPayload, Criteria } from '@raven/api/exports'
import type { SortingState } from '@tanstack/react-table'
import type { UseFormSetError } from 'react-hook-form'
import { AppTable } from '@raven/web/common/components/app.table'
import { Button } from '@raven/web/common/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@raven/web/common/components/ui/dialog'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { UsersForm } from '../components/users-form'
import { useCreateUser, useUsers } from '../hooks/users.hooks'
import { usersColumns } from '../users.columns'

export function UsersPage() {
  const { t } = useTranslation('ui')
  const [open, setOpen] = useState(false)

  const [criteria, setCriteria] = useState<Criteria>({
    select: ['name', 'email'],
    page: 1,
    limit: 10,
    sort: { name: 'asc' },
  })

  const sorting: SortingState = criteria.sort
    ? Object.entries(criteria.sort).map(([id, dir]) => ({
        id,
        desc: dir === 'desc',
      }))
    : []

  const { data, isLoading, isError, error } = useUsers(criteria)

  const create = useCreateUser()

  const handleCreate = (
    data: CreateUserPayload,
    setError: UseFormSetError<CreateUserPayload>,
  ) => {
    create.mutate(data, {
      onError: (err) => {
        setError('root.serverError', { message: err.message })
      },

      onSuccess: () => {
        setOpen(false)
      },
    })
  }

  if (isLoading)
    return <div>Loading users...</div>

  if (isError || !data) {
    return (
      <div>
        Error:
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

  const handleSortingChange = (sorting: SortingState) => {
    if (!sorting.length)
      return

    const s = sorting[0]

    setCriteria(prev => ({
      ...prev,
      sort: {
        [s.id]: s.desc ? 'desc' : 'asc',
      },
    }))
  }

  return (
    <div>
      <Dialog
        open={open}
        onOpenChange={setOpen}
      >

        <DialogTrigger asChild>
          <Button variant="outline">{t('NEW_USER')}</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>{t('NEW_USER')}</DialogTitle>
          </DialogHeader>

          <UsersForm
            onSubmit={handleCreate}
            isPending={create.isPending}
          />
        </DialogContent>
      </Dialog>

      <AppTable
        columns={usersColumns}
        data={users}
        pagination={safePagination}
        sorting={sorting}
        onSortingChange={handleSortingChange}
        onPaginationChange={p =>
          setCriteria(prev => ({
            ...prev,
            page: p.page,
            limit: p.pageSize,
          }))}
      />

    </div>

  )
}
