import type { Criteria } from '@raven/api/exports'
import type { SortingState } from '@tanstack/react-table'
import { DataTable } from '@raven/web/common/components/data.table'
import {
  sortingToSort,
  sortToSorting,
} from '@raven/web/common/utils/sorting-adapters'

import { useMemo, useState } from 'react'

import { useDeleteUser, useUpdateUser, useUsers } from '../hooks/users.hooks'

import { createUsersColumns } from '../users.columns'

export function UsersPage() {
  const [criteria, setCriteria] = useState<Criteria>({
    select: ['name', 'email', 'createdAt', 'updatedAt'],
    page: 1,
    limit: 10,
    sort: {
      name: 'asc',
    },
  })

  const {
    data,
    isLoading,
    isError,
    error,
  } = useUsers(criteria)

  const deleteUser = useDeleteUser()
  const updateUser = useUpdateUser()

  const columns = useMemo(
    () => createUsersColumns(deleteUser, updateUser),
    [deleteUser, updateUser],
  )

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
