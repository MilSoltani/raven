import type { PaginationMeta } from '@raven/api/exports'
import type { ColumnDef, SortingState } from '@tanstack/react-table'

import { Button } from '@raven/web/common/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@raven/web/common/components/ui/table'

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

type AppTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  pagination: PaginationMeta
  sorting: SortingState
  onPaginationChange: (pagination: PaginationMeta) => void
  onSortingChange: (sorting: SortingState) => void
}

export function AppTable<TData, TValue>({
  columns,
  data,
  pagination,
  sorting,
  onPaginationChange,
  onSortingChange,
}: AppTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,

    manualPagination: true,
    manualSorting: true,

    pageCount: pagination.totalPages,

    state: {
      pagination: {
        pageIndex: pagination.page - 1,
        pageSize: pagination.pageSize,
      },
      sorting,
    },

    onPaginationChange: (updater) => {
      const next
        = typeof updater === 'function'
          ? updater({
              pageIndex: pagination.page - 1,
              pageSize: pagination.pageSize,
            })
          : updater

      onPaginationChange({
        page: next.pageIndex + 1,
        pageSize: next.pageSize,
        totalItems: pagination.totalItems,
        totalPages: pagination.totalPages,
        hasNextPage: pagination.hasNextPage,
        hasPreviousPage: pagination.hasPreviousPage,
      })
    },

    onSortingChange: (updater) => {
      const next
        = typeof updater === 'function'
          ? updater(sorting)
          : updater

      onSortingChange(next)
    },

    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id}>
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
            {table.getRowModel().rows.length
              ? (
                  table.getRowModel().rows.map(row => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map(cell => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                )
              : (
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

      <div className="flex items-center justify-end space-x-2 py-4">
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
  )
}
