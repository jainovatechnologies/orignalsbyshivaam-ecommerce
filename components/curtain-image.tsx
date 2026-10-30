'use client'

import React, { useState } from 'react'
import Image, { ImageProps } from 'next/image'
import { m, useReducedMotion } from 'framer-motion'

interface CurtainImageProps {
  src: string
  alt: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
  containerClassName?: string
  sizes?: string
  priority?: boolean
  quality?: number
  zoomOnHover?: boolean
  objectFit?: 'cover' | 'contain' | 'fill'
  objectPosition?: string
}

export function CurtainImage({
  src,
  alt,
  fill = true,
  width,
  height,
  className = '',
  containerClassName = '',
  sizes = '(max-width: 768px) 100vw, 50vw',
  priority = false,
  quality = 70,
  zoomOnHover = false,
  objectFit = 'cover',
  objectPosition,
}: CurtainImageProps) {
  const [hasError, setHasError] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  if (hasError) {
    const filename = src.split('/').pop() || src
    return (
      <div
        className={`relative flex min-h-[160px] w-full h-full items-center justify-center bg-[#EDE8DF] text-xs text-[#847D73] font-medium tracking-wide ${containerClassName}`}
      >
        <span className="border border-dashed border-[#B7AD9E] px-3 py-1.5">
          {filename}
        </span>
      </div>
    )
  }

  // Curtain clip-path variants: reveals once on scroll
  const curtainVariants = {
    hidden: {
      clipPath: shouldReduceMotion
        ? 'inset(0% 0% 0% 0%)'
        : 'inset(100% 0% 0% 0%)',
    },
    visible: {
      clipPath: 'inset(0% 0% 0% 0%)',
      transition: {
        duration: shouldReduceMotion ? 0 : 0.85,
        ease: [0.25, 1, 0.5, 1],
      },
    },
  }

  return (
    <m.div
      variants={curtainVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className={`relative w-full h-full overflow-hidden ${containerClassName}`}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 ease-out ${
          zoomOnHover ? 'hover:scale-105' : ''
        }`}
      >
        {fill ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            quality={quality}
            priority={priority}
            onError={() => setHasError(true)}
            className={`object-${objectFit} ${className}`}
            style={objectPosition ? { objectPosition } : undefined}
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width || 600}
            height={height || 600}
            sizes={sizes}
            quality={quality}
            priority={priority}
            onError={() => setHasError(true)}
            className={`object-${objectFit} ${className}`}
            style={objectPosition ? { objectPosition } : undefined}
          />
        )}
      </div>
    </m.div>
  )
}

