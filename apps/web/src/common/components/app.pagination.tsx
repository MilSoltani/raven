import type { PaginationMeta } from '@xenon/api/exports'
import { Field, FieldLabel } from './ui/field'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

type AppPaginationProps = {
  pagination: PaginationMeta
  onPageChange: (page: number) => void
  onPageSizeChange: (pageSize: number) => void
  pageSizeOptions?: number[]
}

export function AppPagination({
  pagination,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 25, 50, 100],
}: AppPaginationProps) {
  const { page, pageSize, hasNextPage, hasPreviousPage } = pagination

  return (
    <div className="flex items-center justify-between gap-4">
      <Field
        orientation="horizontal"
        className="w-fit"
      >
        <FieldLabel htmlFor="rows-per-page">Rows per page</FieldLabel>

        <Select
          value={String(pageSize)}
          onValueChange={(v) => {
            const newSize = Number(v)
            onPageSizeChange(newSize)
            onPageChange(1)
          }}
        >
          <SelectTrigger
            id="rows-per-page"
            className="w-20"
          >
            <SelectValue />
          </SelectTrigger>

          <SelectContent align="start">
            <SelectGroup>
              {pageSizeOptions.map(size => (
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

      <Pagination className="w-auto">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              aria-disabled={!hasPreviousPage}
              className={!hasPreviousPage ? 'pointer-events-none opacity-50' : undefined}
              onClick={(e) => {
                e.preventDefault()
                if (hasPreviousPage)
                  onPageChange(page - 1)
              }}
            />
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              aria-disabled={!hasNextPage}
              className={!hasNextPage ? 'pointer-events-none opacity-50' : undefined}
              onClick={(e) => {
                e.preventDefault()
                if (hasNextPage)
                  onPageChange(page + 1)
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
