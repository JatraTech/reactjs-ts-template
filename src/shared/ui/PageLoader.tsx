import { createContext, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import type { RootState } from '@/app/store'
import { store } from '@/app/store'
import { useAppSelector } from '@/app/store/hooks'
import { BrandedLoadingOverlay } from '@/shared/ui/BrandedLoadingOverlay'

const CURTAIN_MS = 600
const SETTLED_DEBOUNCE_MS = 80
const MAX_WAIT_MS = 10_000

const PageLoaderSettledContext = createContext(true)

export function usePageLoaderSettled() {
  return useContext(PageLoaderSettledContext)
}

function selectContentPendingSince(state: RootState, since: number): boolean {
  for (const entry of Object.values(state.api.queries)) {
    if (entry?.status !== 'pending') continue
    if (entry.startedTimeStamp >= since) return true
  }
  return false
}

export function PageLoader({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const isFirstPath = useRef(true)
  const overlaySessionStart = useRef(Date.now())
  const [mounted, setMounted] = useState(true)
  const [exiting, setExiting] = useState(false)
  const [docComplete, setDocComplete] = useState(document.readyState === 'complete')

  const contentPending = useAppSelector((state) =>
    selectContentPendingSince(state, overlaySessionStart.current),
  )

  useLayoutEffect(() => {
    overlaySessionStart.current = Date.now()

    if (isFirstPath.current) {
      isFirstPath.current = false
      return
    }

    setMounted(true)
    setExiting(false)
  }, [pathname])

  useEffect(() => {
    if (document.readyState === 'complete') {
      setDocComplete(true)
      return
    }

    const onLoad = () => setDocComplete(true)
    window.addEventListener('load', onLoad, { once: true })
    return () => window.removeEventListener('load', onLoad)
  }, [])

  useEffect(() => {
    if (!mounted || exiting) return

    const prevHtmlOverflow = document.documentElement.style.overflow
    const prevBodyOverflow = document.body.style.overflow
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'

    return () => {
      document.documentElement.style.overflow = prevHtmlOverflow
      document.body.style.overflow = prevBodyOverflow
    }
  }, [mounted, exiting])

  useEffect(() => {
    if (!mounted || exiting) return

    const maxTimer = setTimeout(() => setExiting(true), MAX_WAIT_MS)
    return () => clearTimeout(maxTimer)
  }, [mounted, exiting, pathname])

  useEffect(() => {
    if (!exiting) return

    const unmountTimer = setTimeout(() => setMounted(false), CURTAIN_MS)
    return () => clearTimeout(unmountTimer)
  }, [exiting])

  useEffect(() => {
    if (!mounted || exiting) return
    if (contentPending) return
    if (!docComplete) return

    const settleTimer = setTimeout(() => {
      if (selectContentPendingSince(store.getState(), overlaySessionStart.current)) return
      if (document.readyState !== 'complete') return
      setExiting(true)
    }, SETTLED_DEBOUNCE_MS)

    return () => clearTimeout(settleTimer)
  }, [mounted, exiting, contentPending, docComplete, pathname])

  return (
    <PageLoaderSettledContext.Provider value={!mounted || exiting}>
      {mounted && <BrandedLoadingOverlay exiting={exiting} />}
      {children}
    </PageLoaderSettledContext.Provider>
  )
}
