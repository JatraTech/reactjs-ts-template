export function totalPages(count: number, pageSize: number) {
  return Math.max(1, Math.ceil(count / pageSize))
}
