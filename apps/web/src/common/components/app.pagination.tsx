import type { PaginationMeta } from '@raven/api/exports'
import { generatePages } from '../utils/pages.generator'
import { Field, FieldLabel } from './ui/field'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from './ui/pagination'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select'

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
  pageSizeOptions = [1, 10, 25, 50, 100],
}: AppPaginationProps) {
  const { page, pageSize, totalPages, hasNextPage, hasPreviousPage } = pagination

  const pages = generatePages(page, totalPages)

  return (
    <div className="flex items-center justify-between gap-4">
      <Field
        orientation="horizontal"
        className="w-fit"
      >
        <FieldLabel htmlFor="select-rows-per-page">
          Rows per page
        </FieldLabel>

        <Select
          value={String(pageSize)}
          onValueChange={value =>
            onPageSizeChange(Number(value))}
        >
          <SelectTrigger
            id="select-rows-per-page"
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

      <Pagination className="mx-0 w-auto">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              aria-disabled={!hasPreviousPage}
              className={
                !hasPreviousPage
                  ? 'pointer-events-none opacity-50'
                  : undefined
              }
              onClick={(e) => {
                e.preventDefault()

                if (hasPreviousPage)
                  onPageChange(page - 1)
              }}
            />
          </PaginationItem>

          {pages.map((item, index) => {
            if (item === 'ellipsis') {
              return (
                <PaginationItem
                  key={`ellipsis-${index}`}
                >
                  <PaginationEllipsis />
                </PaginationItem>
              )
            }

            return (
              <PaginationItem key={item}>
                <PaginationLink
                  isActive={item === page}
                  onClick={(e) => {
                    e.preventDefault()

                    if (item !== page)
                      onPageChange(item)
                  }}
                >
                  {item}
                </PaginationLink>
              </PaginationItem>
            )
          })}

          <PaginationItem>
            <PaginationNext
              aria-disabled={!hasNextPage}
              className={
                !hasNextPage
                  ? 'pointer-events-none opacity-50'
                  : undefined
              }
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
