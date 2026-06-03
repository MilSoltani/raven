import { IconArrowsUpDown } from '@tabler/icons-react'
import type { ColumnDef } from '@tanstack/react-table'
import type { User } from '@xenon/api/exports'
import { translationKey } from '@xenon/i18n'
import { Button } from '@xenon/web/common/components/ui/button'
import { Checkbox } from '@xenon/web/common/components/ui/checkbox'
import { useTranslation } from 'react-i18next'
import { UserActionCell } from './user-action-cell'

export function useUserColumns(): ColumnDef<User>[] {
	const { t } = useTranslation('web')

	return [
		{
			id: 'select',
			header: ({ table }) => (
				<Checkbox
					checked={
						table.getIsAllPageRowsSelected() ||
						(table.getIsSomePageRowsSelected() && 'indeterminate')
					}
					onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
					aria-label="Select all"
				/>
			),
			cell: ({ row }) => (
				<Checkbox
					checked={row.getIsSelected()}
					onCheckedChange={(value) => row.toggleSelected(!!value)}
					aria-label="Select row"
				/>
			),
			size: 20,
		},
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
					{t(translationKey('users.entity.name'))}
					<IconArrowsUpDown className="ml-2 h-4 w-4" />
				</Button>
			),
		},
		{
			accessorKey: 'email',
			header: t(translationKey('users.entity.email')),
		},
		{
			accessorKey: 'details',
			header: t(translationKey('users.ui.details')),
			cell: ({ row }) => <UserActionCell userId={row.original.id} />,
			size: 20,
		},
	]
}
