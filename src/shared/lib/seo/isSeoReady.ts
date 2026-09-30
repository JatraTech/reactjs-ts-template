export function isSeoReady(
  isLoading: boolean,
  data: unknown,
  options?: { allowWithoutData?: boolean },
): boolean {
  if (isLoading) return false
  if (options?.allowWithoutData) return true
  return data != null
}
