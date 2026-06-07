import { IconFilter, IconFilterOff } from '@tabler/icons-react'
import type { SortingState } from '@tanstack/react-table'
import type { Criteria, TicketPriority, TicketStatus } from '@xenon/api/exports'
import { TicketPriorityEnum, TicketStatusEnum } from '@xenon/api/exports'
import { translationKey } from '@xenon/i18n'
import { DataTable } from '@xenon/web/common/components/data.table'
import { DeleteDialog } from '@xenon/web/common/components/delete.dialog'
import { FilterDropdown } from '@xenon/web/common/components/filter.dropdown'
import { Button } from '@xenon/web/common/components/ui/button'
import { Input } from '@xenon/web/common/components/ui/input'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@xenon/web/common/components/ui/popover'
import {
	sortingToSort,
	sortToSorting,
} from '@xenon/web/common/utils/sorting-adapters'
import * as React from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CreateTicket } from '../components/CreateTicket'
import { useTicketColumns } from '../components/tickets.columns'
import { useDeleteTicket, useTickets } from '../hooks/tickets.hooks'

export function TicketsPage() {
	const { t } = useTranslation('web')
	const [rowSelection, setRowSelection] = useState({})
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

	function handleResetFilters() {
		setPage(1)
		setLimit(10)
		setSort({ subject: 'asc' })
		setSubject(undefined)
		setId(undefined)
		setCreator(undefined)
		setAgent(undefined)
	}

	return (
		<div>
			<div className="flex flex-row justify-between gap-4">
				<div></div>

				<div className="flex flex-row justify-end gap-2">
					<DeleteDialog
						selectedIds={Object.entries(rowSelection)
							.filter(([, isSelected]) => isSelected)
							.map(([key]) => Number(key))
							.map((index) => items[index]?.id)
							.filter(Boolean)}
						disabled={
							Object.entries(rowSelection)
								.filter(([, isSelected]) => isSelected)
								.map(([key]) => Number(key))
								.map((index) => items[index]?.id)
								.filter(Boolean).length === 0
						}
						title={t(translationKey('tickets.form.deleteDialogTitle'))}
						description={t(
							translationKey('tickets.form.deleteDialogDescription'),
						)}
						triggerLabel={t(translationKey('tickets.form.delete'))}
						actionLabel={t(translationKey('tickets.form.delete'))}
						onDelete={(id) => deleteTicket.mutate(id)}
						onResetSelection={() => setRowSelection({})}
					/>

					<CreateTicket />

					<Popover open={filtersOpen} onOpenChange={setFiltersOpen}>
						<PopoverTrigger asChild>
							<Button variant="outline">
								<IconFilter className="h-4 w-4 me-1" />
								Filter the table
							</Button>
						</PopoverTrigger>
						<PopoverContent align="end" className="w-100">
							<div className="grid gap-4">
								<div className="grid gap-2">
									<div className="grid grid-cols-2 items-center gap-2">
										<Input
											id="id"
											type="search"
											placeholder="Id"
											value={id || ''}
											onChange={(e) => setId(e.target.value || undefined)}
											className="w-fill"
										/>

										<Input
											id="subject"
											type="search"
											placeholder="Subject"
											value={subject || ''}
											onChange={(e) => setSubject(e.target.value || undefined)}
											className="w-fill"
										/>
									</div>
									<div className="grid grid-cols-2 items-center gap-2">
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
									<div className="grid grid-cols-2 items-center gap-2">
										<FilterDropdown
											label="Select Status"
											options={TicketStatusEnum.options}
											selectedFilters={statusFilter}
											onFilterChange={setStatusFilter}
										/>
										<FilterDropdown
											label="Select Priorities"
											options={TicketPriorityEnum.options}
											selectedFilters={priorityFilter}
											onFilterChange={setPriorityFilter}
										/>
									</div>
								</div>
							</div>

							<Button onClick={() => handleResetFilters()} variant="secondary">
								<IconFilterOff className="h-4 w-4 me-1" />
								Reset Filters
							</Button>
						</PopoverContent>
					</Popover>
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
