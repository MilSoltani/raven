import type { User } from '@raven/api/exports'
import type { ColumnDef } from '@tanstack/react-table'
import { Button } from '@raven/web/common/components/ui/button'
import { IconArrowsUpDown } from '@tabler/icons-react'
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
          {t('entity.name')}
          <IconArrowsUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: 'email',
      header: t('entity.email'),
    },
    {
      accessorKey: 'details',
      header: t('ui.details'),
      cell: ({ row }) => <UserActionCell userId={row.original.id} />,
      size: 20,
    },
  ]
}
