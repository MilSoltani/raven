import type { PaginationMeta } from '@raven/api/exports'
import type { ColumnDef, SortingState } from '@tanstack/react-table'

import { Button } from '@raven/web/common/components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@raven/web/common/components/ui/select'

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
import { Field, FieldLabel } from './ui/field'

type PaginationState = {
  page: number
  pageSize: number
}

type AppTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  pagination: PaginationMeta
  sorting: SortingState
  onPaginationChange: (pagination: PaginationState) => void
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
    <div className="mt-1">
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

      <div className="mt-1 flex items-center justify-between gap-4">
        <Field
          orientation="horizontal"
          className="w-fit"
        >
          <FieldLabel htmlFor="select-rows-per-page">
            Rows per page
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
              className="w-20"
              id="select-rows-per-page"
            >
              <SelectValue />
            </SelectTrigger>

            <SelectContent align="start">
              <SelectGroup>
                {[10, 25, 50, 100].map(size => (
                  <SelectItem
                    key={size}
                    value={String(size)}
                  >
                    {size}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>

        <div className="flex items-center space-x-2">
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
