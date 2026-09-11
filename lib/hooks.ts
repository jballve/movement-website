'use client'

import { useCallback, useSyncExternalStore } from 'react'

/** True when the CSS media query matches. Returns `serverFallback` during SSR and hydration. */
export function useMediaQuery(query: string, serverFallback = false): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mq = window.matchMedia(query)
      mq.addEventListener('change', onChange)
      return () => mq.removeEventListener('change', onChange)
    },
    [query]
  )
  return useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => serverFallback)
}

const noopSubscribe = () => () => {}

/** True when the browser reports a data-saver preference. */
export function useSaveData(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true,
    () => false
  )
}

const subscribeEverySecond = (onTick: () => void) => {
  const id = window.setInterval(onTick, 1_000)
  return () => window.clearInterval(id)
}

const subscribeEveryMinute = (onTick: () => void) => {
  const id = window.setInterval(onTick, 60_000)
  return () => window.clearInterval(id)
}

/**
 * Current time in whole seconds, re-rendering on each tick.
 * Returns null on the server and during hydration so markup stays stable.
 */
export function useNowSeconds(everyMinute = false): number | null {
  return useSyncExternalStore(
    everyMinute ? subscribeEveryMinute : subscribeEverySecond,
    () => Math.floor(Date.now() / 1000),
    () => null
  )
}

const subscribePageLoad = (onLoad: () => void) => {
  if (document.readyState === 'complete') return () => {}
  window.addEventListener('load', onLoad, { once: true })
  return () => window.removeEventListener('load', onLoad)
}

/** True once the page has finished loading, so deferred media never competes with LCP. */
export function usePageLoaded(): boolean {
  return useSyncExternalStore(subscribePageLoad, () => document.readyState === 'complete', () => false)
}
