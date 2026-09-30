const PREVIEW_PARAM = 'preview'

export function getPreviewToken(): string | null {
  if (typeof window === 'undefined') return null
  try {
    return new URLSearchParams(window.location.search).get(PREVIEW_PARAM)
  } catch {
    return null
  }
}

export function isPreviewMode(): boolean {
  return Boolean(getPreviewToken())
}
