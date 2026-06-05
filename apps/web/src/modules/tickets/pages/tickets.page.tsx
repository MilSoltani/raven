import {
	IconFilter,
	IconFilterOff,
	IconPlus,
	IconTrash,
} from '@tabler/icons-react'
import type { SortingState } from '@tanstack/react-table'
import type { Criteria, TicketPriority, TicketStatus } from '@xenon/api/exports'
import {
	CreateTicketSchema,
	TicketPriorityEnum,
	TicketStatusEnum,
} from '@xenon/api/exports'
import { translationKey } from '@xenon/i18n'
import { AppDialog } from '@xenon/web/common/components/app.dialog'
import { AppSheet } from '@xenon/web/common/components/app.sheet'
import { DataTable } from '@xenon/web/common/components/data.table'
import { FilterDropdown } from '@xenon/web/common/components/filter.dropdown'
import { AlertDialogAction } from '@xenon/web/common/components/ui/alert-dialog'
import { Button } from '@xenon/web/common/components/ui/button'
import {
	Command,
	CommandDialog,
	CommandGroup,
	CommandList,
	CommandSeparator,
} from '@xenon/web/common/components/ui/command'
import { Input } from '@xenon/web/common/components/ui/input'
import {
	sortingToSort,
	sortToSorting,
} from '@xenon/web/common/utils/sorting-adapters'
import * as React from 'react'
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
	const [sheetOpen, setSheetOpen] = useState(false)
	const [filtersOpen, setFiltersOpen] = useState(false)

	const [statusFilter, setStatusFilter] = useState<TicketStatus[]>([
		'OPEN',
		'WORKING',
		'PENDING',
	])

	const [priorityFilter, setPriorityFilter] = useState<TicketPriority[]>([])

	const [page, setPage] = useState(1)
	const [limit, setLimit] = useState(10)
	const [sort, setSort] = useState<Criteria['sort']>({ subject: 'asc' })
	const [subject, setSubject] = useState<string | undefined>()
	const [id, setId] = useState<string | undefined>()
	const [creator, setCreator] = useState<string | undefined>()
	const [agent, setAgent] = useState<string | undefined>()

	const criteria = React.useMemo<Criteria>(
		() => ({
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
			page,
			limit,
			sort,
			filter: {
				subject: {
					contains: subject,
				},
				id: {
					equals: id,
				},
				creator: {
					name: {
						contains: creator,
					},
				},
				agent: {
					name: {
						contains: agent,
					},
				},
				status: {
					in: statusFilter,
				},
				priority: {
					in: priorityFilter,
				},
			},
		}),
		[
			subject,
			id,
			creator,
			agent,
			statusFilter,
			priorityFilter,
			page,
			limit,
			sort,
		],
	)

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

	const handleResetFilters = () => {
		setId(undefined)
		setSubject(undefined)
		setCreator(undefined)
		setAgent(undefined)
		setStatusFilter(['OPEN', 'WORKING', 'PENDING']) // or your default layout
		setPriorityFilter([])
		setPage(1)

		setFiltersOpen(false)
	}

	return (
		<div>
			<div className="flex flex-row justify-between gap-4">
				<div>
					<Button
						onClick={() => setFiltersOpen(true)}
						variant="outline"
						className="w-fit"
					>
						<IconFilter className="h-4 w-4 me-1" />
						Filter the table
					</Button>

					<CommandDialog open={filtersOpen} onOpenChange={setFiltersOpen}>
						<Command>
							<div className="px-1">
								<div className="pt-2 flex flex-row gap-2">
									<Input
										id="id"
										type="search"
										placeholder="Id"
										value={id || ''}
										onChange={(e) => setId(e.target.value || undefined)}
										className="w-1/4"
									/>

									<Input
										id="subject"
										type="search"
										placeholder="Subject"
										value={subject || ''}
										onChange={(e) => setSubject(e.target.value || undefined)}
										className="w-3/4"
									/>
								</div>

								<div className="pt-2 flex flex-row gap-2">
									<Input
										id="creator.name"
										type="search"
										placeholder="Creator name"
										value={creator || ''}
										onChange={(e) => setCreator(e.target.value || undefined)}
										className="w-full"
									/>
									<Input
										id="agent.name"
										type="search"
										placeholder="Agent name"
										value={agent || ''}
										onChange={(e) => setAgent(e.target.value || undefined)}
										className="w-full"
									/>
								</div>
							</div>
							<CommandList>
								<div className="grid grid-cols-2 py-2">
									<CommandGroup>
										<FilterDropdown
											label="Select Status"
											options={TicketStatusEnum.options}
											selectedFilters={statusFilter}
											onFilterChange={setStatusFilter}
										/>
									</CommandGroup>

									<CommandGroup>
										<FilterDropdown
											label="Select Priorities"
											options={TicketPriorityEnum.options}
											selectedFilters={priorityFilter}
											onFilterChange={setPriorityFilter}
										/>
									</CommandGroup>
								</div>

								<CommandSeparator />

								<div className="flex flex-row justify-end">
									<Button
										onClick={() => handleResetFilters()}
										variant="secondary"
									>
										<IconFilterOff className="h-4 w-4 me-1" />
										Reset Filters
									</Button>
								</div>
							</CommandList>
						</Command>
					</CommandDialog>
				</div>

				<div className="flex flex-row justify-end gap-2">
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

					<AppSheet
						open={sheetOpen}
						onOpenChange={setSheetOpen}
						sheetTitle="New Ticket"
						sheetDescription=""
						sheetBody={
							<TicketsForm
								mode="create"
								ticket={{ subject: '' }}
								error={createTicket.error?.message}
								onSubmit={(data) => {
									createTicket.mutate(CreateTicketSchema.parse(data), {
										onSuccess: () => setSheetOpen(false),
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
			</div>

			<DataTable
				columns={columns}
				data={items}
				pagination={safePagination}
				sorting={sorting}
				onPaginationChange={(p) => {
					setPage(p.page)
					setLimit(p.pageSize)
				}}
				onSortingChange={(s) => {
					setPage(1)
					setSort(sortingToSort(s))
				}}
				rowSelection={rowSelection}
				onRowSelectionChange={setRowSelection}
			/>
		</div>
	)
}
