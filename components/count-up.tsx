'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

interface CountUpProps {
  target: number
  decimals?: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
}

export function CountUp({
  target,
  decimals = 0,
  duration = 1.2,
  prefix = '',
  suffix = '',
  className = '',
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const shouldReduceMotion = useReducedMotion()
  const [value, setValue] = useState(shouldReduceMotion ? target : 0)

  useEffect(() => {
    if (!isInView) return
    if (shouldReduceMotion) {
      setValue(target)
      return
    }

    let start = 0
    // Start close to target if target is a high year like 2017 for cleaner count-up
    if (target > 1000) {
      start = target - 50
    }

    const startTime = performance.now()
    const totalMs = duration * 1000

    let animationFrameId: number

    const step = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / totalMs, 1)
      // Ease out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3)
      const current = start + (target - start) * easedProgress
      setValue(current)

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step)
      } else {
        setValue(target)
      }
    }

    animationFrameId = requestAnimationFrame(step)

    return () => cancelAnimationFrame(animationFrameId)
  }, [isInView, target, duration, shouldReduceMotion])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  )
}

