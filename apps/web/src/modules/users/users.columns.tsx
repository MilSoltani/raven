import type { ColumnDef } from '@tanstack/react-table'
import type { User } from '@xenon/api/exports'
import { IconArrowsUpDown } from '@tabler/icons-react'
import { Button } from '@xenon/web/common/components/ui/button'
import { useTranslation } from 'react-i18next'
import { UserActionCell } from './components/user-action-cell'

export function useUserColumns(): ColumnDef<User>[] {
  const { t } = useTranslation('web')

  return [
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
          className="font-bold px-0"
        >
          {t('users.entity.name')}
          <IconArrowsUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: 'email',
      header: t('users.entity.email'),
    },
    {
      accessorKey: 'details',
      header: t('users.ui.details'),
      cell: ({ row }) => <UserActionCell userId={row.original.id} />,
      size: 20,
    },
  ]
}
