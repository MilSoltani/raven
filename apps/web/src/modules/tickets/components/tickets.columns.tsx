import { IconArrowsUpDown } from '@tabler/icons-react'
import type { ColumnDef } from '@tanstack/react-table'
import type { Ticket } from '@xenon/api/exports'
import { translationKey } from '@xenon/i18n'
import { Button } from '@xenon/web/common/components/ui/button'
import { Checkbox } from '@xenon/web/common/components/ui/checkbox'
import { useTranslation } from 'react-i18next'
import { TicketActionCell } from './ticket-action-cell'

export function useTicketColumns(): ColumnDef<Ticket>[] {
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
					{t(translationKey('tickets.entity.subject'))}
					<IconArrowsUpDown className="ml-2 h-4 w-4" />
				</Button>
			),
		},
		{
			accessorKey: 'details',
			header: t(translationKey('tickets.ui.details')),
			cell: ({ row }) => <TicketActionCell ticketId={row.original.id} />,
			size: 20,
		},
	]
}
