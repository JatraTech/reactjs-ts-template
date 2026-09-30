type PreviewContentErrorProps = {
  message?: string
}

export function PreviewContentError({
  message = 'Preview unavailable — save the post and refresh, or check Publishing is configured.',
}: PreviewContentErrorProps) {
  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
      {message}
    </div>
  )
}
