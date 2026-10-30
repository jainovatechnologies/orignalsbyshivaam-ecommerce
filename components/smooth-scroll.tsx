'use client'

import { useEffect } from 'react'

export function SmoothScroll() {
  useEffect(() => {
    // Lenis smooth scroll only on desktop (pointer: fine); native scroll on touch and under reduced motion
    const isDesktop = window.matchMedia('(pointer: fine)').matches
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!isDesktop || prefersReduced) {
      return
    }

    let lenisInstance: any = null
    let rafId: number

    import('lenis').then(({ default: Lenis }) => {
      lenisInstance = new Lenis({
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
      })

      function raf(time: number) {
        lenisInstance?.raf(time)
        rafId = requestAnimationFrame(raf)
      }
      rafId = requestAnimationFrame(raf)
    }).catch(() => {
      // Graceful fallback to native scroll
    })

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      if (lenisInstance) lenisInstance.destroy()
    }
  }, [])

  return null
}

