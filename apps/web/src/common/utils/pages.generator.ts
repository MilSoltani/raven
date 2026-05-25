export function generatePages(
  currentPage: number,
  totalPages: number,
): Array<number | 'ellipsis'> {
  if (totalPages <= 7) {
    return Array.from(
      { length: totalPages },
      (_, index) => index + 1,
    )
  }

  const pages: Array<number | 'ellipsis'> = []

  const windowStart = Math.max(
    2,
    currentPage - 1,
  )

  const windowEnd = Math.min(
    totalPages - 1,
    currentPage + 1,
  )

  pages.push(1)

  if (windowStart > 2)
    pages.push('ellipsis')

  for (
    let page = windowStart;
    page <= windowEnd;
    page++
  ) {
    pages.push(page)
  }

  if (windowEnd < totalPages - 1)
    pages.push('ellipsis')

  pages.push(totalPages)

  return pages
}
