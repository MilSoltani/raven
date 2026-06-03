import { IconPlus, IconTrash } from '@tabler/icons-react'
import type { SortingState } from '@tanstack/react-table'
import type { Criteria } from '@xenon/api/exports'
import { CreateTicketSchema } from '@xenon/api/exports'
import { translationKey } from '@xenon/i18n'
import { AppDialog } from '@xenon/web/common/components/app.dialog'
import { AppDrawer } from '@xenon/web/common/components/app.drawer'
import { DataTable } from '@xenon/web/common/components/data.table'
import { AlertDialogAction } from '@xenon/web/common/components/ui/alert-dialog'
import { Button } from '@xenon/web/common/components/ui/button'
import {
	sortingToSort,
	sortToSorting,
} from '@xenon/web/common/utils/sorting-adapters'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useTicketColumns } from '../components/tickets.columns'
import { TicketsForm } from '../components/tickets.form'
import {
	useCreateTicket,
	useDeleteTicket,
	useTickets,
} from '../hooks/tickets.hooks'

export function TicketsPage() {
	const { t } = useTranslation('web')
	const [rowSelection, setRowSelection] = useState({})
	const [drawerOpen, setDrawerOpen] = useState(false)

	const [criteria, setCriteria] = useState<Criteria>({
		select: [
			'subject',
			'description',
			'priority',
			'status',
			'creatorId',
			'createdAt',
			'updatedAt',
			'creator',
		],
		page: 1,
		limit: 10,
		sort: {
			subject: 'asc',
		},
	})

	const { data, isLoading, isError, error } = useTickets(criteria)

	const createTicket = useCreateTicket()
	const deleteTicket = useDeleteTicket()
	const columns = useTicketColumns()

	if (isLoading) {
		return (
			<div>
				{t(translationKey('tickets.ui.loading'))}
				...
			</div>
		)
	}

	if (isError || !data) {
		return (
			<div>
				{t(translationKey('tickets.ui.loadingError'))}:{error?.message}
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
			<div className="flex flex-row justify-end gap-4">
				<AppDialog
					triggerButton={
						<Button
							variant="destructive"
							disabled={Object.entries(rowSelection).length === 0}
						>
							<IconTrash className="h-4 w-4 me-1" />
							{t(translationKey('tickets.form.delete'))}
						</Button>
					}
					title={t(translationKey('tickets.form.deleteDialogTitle'))}
					description={t(
						translationKey('tickets.form.deleteDialogDescription'),
					)}
					dialogAction={
						<AlertDialogAction
							variant={'destructive'}
							onClick={() => {
								Object.entries(rowSelection).forEach(([key, isSelected]) => {
									if (isSelected) {
										const index = Number(key)
										const ticketToDelete = items[index]

										if (ticketToDelete) {
											deleteTicket.mutate(ticketToDelete.id)
										}
									}
								})
								setRowSelection({})
							}}
						>
							<IconTrash className="h-4 w-4 me-1" />
							{t(translationKey('tickets.form.delete'))}
						</AlertDialogAction>
					}
				/>

				<AppDrawer
					open={drawerOpen}
					onOpenChange={setDrawerOpen}
					drawerTitle="New Ticket"
					drawerDescription=""
					drawerBody={
						<TicketsForm
							mode="create"
							ticket={{ subject: '' }}
							error={createTicket.error?.message}
							onSubmit={(data) => {
								createTicket.mutate(CreateTicketSchema.parse(data), {
									onSuccess: () => setDrawerOpen(false),
								})
							}}
							footer={
								<Button type="submit" disabled={createTicket.isPending}>
									{createTicket.isPending
										? t('tickets.form.creating')
										: t('tickets.form.create')}
								</Button>
							}
						/>
					}
					triggerButton={
						<Button variant="outline">
							<IconPlus className="h-4 w-4 me-1" />
							{t('tickets.form.create')}
						</Button>
					}
				/>
			</div>

			<DataTable
				columns={columns}
				data={items}
				pagination={safePagination}
				sorting={sorting}
				onPaginationChange={(p) =>
					setCriteria((prev) => ({
						...prev,
						page: p.page,
						limit: p.pageSize,
					}))
				}
				onSortingChange={(s) =>
					setCriteria((prev) => ({
						...prev,
						page: 1,
						sort: sortingToSort(s),
					}))
				}
				rowSelection={rowSelection}
				onRowSelectionChange={setRowSelection}
			/>
		</div>
	)
}
