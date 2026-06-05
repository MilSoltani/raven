import type {
	ColumnDef,
	RowSelectionState,
	SortingState,
} from '@tanstack/react-table'
import {
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table'
import type { PaginationMeta } from '@xenon/api/exports'
import { Button } from '@xenon/web/common/components/ui/button'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@xenon/web/common/components/ui/select'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@xenon/web/common/components/ui/table'
import { Field, FieldLabel } from './ui/field'

type PaginationState = {
	page: number
	pageSize: number
}

type DataTableProps<TData, TValue> = {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
	pagination: PaginationMeta
	sorting: SortingState
	onPaginationChange: (pagination: PaginationState) => void
	onSortingChange: (sorting: SortingState) => void
	rowSelection?: RowSelectionState
	onRowSelectionChange?: (rowSelection: RowSelectionState) => void
}

export function DataTable<TData, TValue>({
	columns,
	data,
	pagination,
	sorting,
	onPaginationChange,
	onSortingChange,
	rowSelection,
	onRowSelectionChange,
}: DataTableProps<TData, TValue>) {
	const table = useReactTable({
		data,
		columns,
		manualPagination: true,
		manualSorting: true,
		pageCount: pagination.totalPages,
		onPaginationChange: (updater) => {
			const next =
				typeof updater === 'function'
					? updater({
							pageIndex: pagination.page - 1,
							pageSize: pagination.pageSize,
						})
					: updater
			onPaginationChange({
				page: next.pageIndex + 1,
				pageSize: next.pageSize,
			})
		},
		onSortingChange: (updater) => {
			const next = typeof updater === 'function' ? updater(sorting) : updater

			onSortingChange(next)
		},
		getCoreRowModel: getCoreRowModel(),
		onRowSelectionChange: (updater) => {
			if (onRowSelectionChange) {
				const next =
					typeof updater === 'function' ? updater(rowSelection ?? {}) : updater
				onRowSelectionChange(next)
			}
		},
		state: {
			pagination: {
				pageIndex: pagination.page - 1,
				pageSize: pagination.pageSize,
			},
			sorting,
			rowSelection: rowSelection ?? {},
			columnVisibility: {
				select: !!rowSelection,
			},
		},
	})

	return (
		<div className="mt-1">
			<div className="overflow-hidden rounded-md border">
				<Table className="table-auto">
					<TableHeader className="sticky top-0 z-10 bg-muted">
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead
										key={header.id}
										className="font-bold"
										style={{ width: `${header.getSize()}px` }}
									>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>

					<TableBody>
						{table.getRowModel().rows.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									className={
										row.getIsSelected()
											? 'bg-muted/60 hover:bg-muted/80 data-[state=selected]:bg-muted/70'
											: 'hover:bg-muted/40'
									}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell
											key={cell.id}
											style={{ width: cell.column.getSize() }}
										>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			<div className="mt-1 flex items-center justify-between gap-4">
				<div className="flex-1 text-muted-foreground text-xs">
					{table.getFilteredSelectedRowModel().rows.length} row(s) selected.
				</div>

				<Field orientation="horizontal" className="w-fit">
					<FieldLabel
						htmlFor="select-rows-per-page"
						className="text-muted-foreground text-xs"
					>
						Per page
					</FieldLabel>

					<Select
						value={String(pagination.pageSize)}
						onValueChange={(value) => {
							const newSize = Number(value)

							table.setPageIndex(0)

							onPaginationChange({
								page: 1,
								pageSize: newSize,
							})
						}}
					>
						<SelectTrigger
							className="w-20 me-10 text-xs"
							id="select-rows-per-page"
						>
							<SelectValue />
						</SelectTrigger>

						<SelectContent align="start">
							<SelectGroup>
								{[10, 25, 50, 100].map((size) => (
									<SelectItem key={size} value={String(size)}>
										{size}
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>
				</Field>

				<div className="flex items-center space-x-2">
					<div className="text-muted-foreground text-xs">
						{`page ${pagination.page} of ${pagination.totalPages}`}
					</div>

					<Button
						variant="outline"
						size="sm"
						onClick={() => table.previousPage()}
						disabled={!pagination.hasPreviousPage}
					>
						Previous
					</Button>

					<Button
						variant="outline"
						size="sm"
						onClick={() => table.nextPage()}
						disabled={!pagination.hasNextPage}
					>
						Next
					</Button>
				</div>
			</div>
		</div>
	)
}
