'use client'

import React, { useRef, useState, useEffect } from 'react'
import { m, useReducedMotion } from 'framer-motion'

interface ActionButtonProps {
  children: React.ReactNode
  href?: string
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  className?: string
  magnetic?: boolean
  onClick?: () => void
  target?: string
  rel?: string
  type?: 'button' | 'submit' | 'reset'
  'aria-label'?: string
}

export function ActionButton({
  children,
  href,
  variant = 'primary',
  className = '',
  magnetic = false,
  onClick,
  target,
  rel,
  type = 'button',
  'aria-label': ariaLabel,
}: ActionButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [canMagnetic, setCanMagnetic] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isFinePointer = window.matchMedia('(pointer: fine)').matches
      setCanMagnetic(isFinePointer && !shouldReduceMotion && magnetic)
    }
  }, [magnetic, shouldReduceMotion])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canMagnetic || !ref.current) return
    const { clientX, clientY } = e
    const { width, height, left, top } = ref.current.getBoundingClientRect()
    const middleX = clientX - (left + width / 2)
    const middleY = clientY - (top + height / 2)
    setPosition({ x: middleX * 0.28, y: middleY * 0.28 })
  }

  const handleMouseLeave = () => {
    if (canMagnetic) {
      setPosition({ x: 0, y: 0 })
    }
  }

  // Base styles:
  // Primary buttons: background #D9480F, text #FFFFFF, font-weight 700, min-height 44px.
  // Explicit inline styles and classes ensure white text never gets overridden.
  const isPrimary = variant === 'primary'

  const baseClasses =
    'inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold tracking-tight transition-all duration-200 select-none cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9480F]'

  const variantClasses = isPrimary
    ? 'btn-primary bg-[#D9480F] !text-white hover:bg-[#c43f0c] shadow-sm active:translate-y-px'
    : variant === 'secondary'
      ? 'btn-secondary border border-[#E7E1D6] bg-white !text-[#14110F] hover:border-[#D9480F] hover:!text-[#D9480F] hover:bg-[#FAF8F4]'
      : variant === 'outline'
        ? 'border border-[#E7E1D6] bg-white/70 text-[#14110F] hover:bg-white'
        : 'bg-transparent text-[#14110F] hover:bg-[#14110F]/5'

  const primaryStyle: React.CSSProperties = isPrimary
    ? {
        backgroundColor: '#D9480F',
        color: '#FFFFFF',
        cursor: 'pointer',
      }
    : {
        cursor: 'pointer',
      }

  return (
    <m.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={canMagnetic ? { x: position.x, y: position.y } : { x: 0, y: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, mass: 0.5 }}
      className="inline-flex cursor-pointer"
    >
      {href ? (
        <a
          href={href}
          target={target}
          rel={rel}
          data-variant={variant}
          style={primaryStyle}
          className={`${baseClasses} ${variantClasses} ${className}`}
          aria-label={ariaLabel}
          onClick={onClick}
        >
          {children}
        </a>
      ) : (
        <button
          type={type}
          onClick={onClick}
          data-variant={variant}
          style={primaryStyle}
          className={`${baseClasses} ${variantClasses} ${className}`}
          aria-label={ariaLabel}
        >
          {children}
        </button>
      )}
    </m.div>
  )
}
