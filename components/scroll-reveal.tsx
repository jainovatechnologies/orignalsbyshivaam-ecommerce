'use client'

import React from 'react'
import { m, useReducedMotion } from 'framer-motion'

interface ScrollRevealProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  distance?: number
  className?: string
  amount?: number
}

export function ScrollReveal({
  children,
  delay = 0,
  duration = 0.65,
  direction = 'up',
  distance = 35,
  className = '',
  amount = 0.15,
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion()

  const getInitialPosition = () => {
    if (shouldReduceMotion || direction === 'none') return { x: 0, y: 0 }
    switch (direction) {
      case 'up':
        return { x: 0, y: distance }
      case 'down':
        return { x: 0, y: -distance }
      case 'left':
        return { x: distance, y: 0 }
      case 'right':
        return { x: -distance, y: 0 }
    }
  }

  const { x, y } = getInitialPosition()

  return (
    <m.div
      initial={{ opacity: shouldReduceMotion ? 1 : 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{
        duration: shouldReduceMotion ? 0 : duration,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.215, 0.61, 0.355, 1],
      }}
      className={className}
    >
      {children}
    </m.div>
  )
}

