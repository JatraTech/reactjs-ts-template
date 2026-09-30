import { isPreviewMode } from '@/shared/lib/preview'

export function PreviewBanner() {
  if (!isPreviewMode()) return null

  return (
    <div
      className="sticky top-0 z-50 flex h-7 items-center justify-center border-b border-amber-200 bg-amber-50 px-3 text-xs font-medium leading-none text-amber-900"
      role="status"
    >
      <span className="truncate">
        Preview mode — draft content. Visitors still see the published site until you publish.
      </span>
    </div>
  )
}
