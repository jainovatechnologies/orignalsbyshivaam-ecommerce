'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import {
  LazyMotion,
  domAnimation,
  m,
  AnimatePresence,
  useReducedMotion,
} from 'framer-motion'

export const SHOES = [
  '/images/no-bg/unnamed__1_-removebg-preview.png',
  '/images/no-bg/unnamed__2_-removebg-preview.png',
  '/images/no-bg/unnamed__4_-removebg-preview.png',
  '/images/no-bg/unnamed__5_-removebg-preview.png',
  '/images/no-bg/unnamed__7_-removebg-preview.png',
] as const

export function ProductHero() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [dragX, setDragX] = useState(0)
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 })
  const [isFinePointer, setIsFinePointer] = useState(false)
  const [hasEntered, setHasEntered] = useState(false)
  const [initialSpinActive, setInitialSpinActive] = useState(false)
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({})

  const stageRef = useRef<HTMLDivElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)
  const pointerStartRef = useRef<{ x: number; y: number } | null>(null)
  const pointerIdRef = useRef<number | null>(null)

  const shouldReduceMotion = useReducedMotion()

  const validShoes = SHOES.filter((src) => !failedImages[src])
  const activeList = validShoes.length > 0 ? validShoes : SHOES
  const safeIndex = index % activeList.length
  const currentShoe = activeList[safeIndex]

  // Detect desktop fine pointer capability
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(pointer: fine)')
      setIsFinePointer(mediaQuery.matches)
      const handler = (e: MediaQueryListEvent) => setIsFinePointer(e.matches)
      mediaQuery.addEventListener('change', handler)
      return () => mediaQuery.removeEventListener('change', handler)
    }
  }, [])

  // Entry sequence: First shoe rises, then initial intro spin at 1.8s
  useEffect(() => {
    const entryTimer = setTimeout(() => {
      setHasEntered(true)
    }, 1500)

    const spinTimer = setTimeout(() => {
      setInitialSpinActive(true)
      const spinResetTimer = setTimeout(() => {
        setInitialSpinActive(false)
      }, 1100)
      return () => clearTimeout(spinResetTimer)
    }, 1800)

    return () => {
      clearTimeout(entryTimer)
      clearTimeout(spinTimer)
    }
  }, [])

  // Auto rotation every 3600ms (pauses while pointer is over stage, focused, or dragging)
  const advanceShoe = useCallback((dir: 1 | -1 = 1) => {
    setDirection(dir)
    setIndex((prev) => (prev + dir + activeList.length) % activeList.length)
  }, [activeList.length])

  useEffect(() => {
    if (isHovered || isFocused || isDragging) return

    const interval = setInterval(() => {
      advanceShoe(1)
    }, 3600)

    return () => clearInterval(interval)
  }, [isHovered, isFocused, isDragging, advanceShoe])

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      advanceShoe(1)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      advanceShoe(-1)
    }
  }

  // Pointer drag interactions
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    pointerStartRef.current = { x: e.clientX, y: e.clientY }
    pointerIdRef.current = e.pointerId
    setIsDragging(true)
    setDragX(0)
    try {
      e.currentTarget.setPointerCapture(e.pointerId)
    } catch {}
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging && pointerStartRef.current) {
      const deltaX = e.clientX - pointerStartRef.current.x
      setDragX(deltaX)
    } else if (isFinePointer && boxRef.current) {
      const rect = boxRef.current.getBoundingClientRect()
      const normX = (e.clientX - rect.left) / rect.width - 0.5
      const normY = (e.clientY - rect.top) / rect.height - 0.5
      setTilt({
        rotateY: Math.max(-10, Math.min(10, normX * 20)),
        rotateX: Math.max(-10, Math.min(10, -normY * 20)),
      })
    }
  }

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging && pointerStartRef.current) {
      const deltaX = e.clientX - pointerStartRef.current.x
      if (deltaX < -90) {
        advanceShoe(1)
      } else if (deltaX > 90) {
        advanceShoe(-1)
      }
    }
    setIsDragging(false)
    setDragX(0)
    pointerStartRef.current = null
    if (pointerIdRef.current !== null) {
      try {
        e.currentTarget.releasePointerCapture(pointerIdRef.current)
      } catch {}
      pointerIdRef.current = null
    }
  }

  const handlePointerLeave = () => {
    setIsHovered(false)
    if (!isDragging) {
      setTilt({ rotateX: 0, rotateY: 0 })
    }
  }

  // Drag clamped transforms
  const clampedDragRotateY = Math.max(-60, Math.min(60, dragX / 8))
  const clampedDragX = dragX * 0.5

  // 3D Spin transition variants (ScaleX [0.15 -> 1], RotateY [±80 -> 0])
  const spinVariants = {
    enter: (dir: 1 | -1) => ({
      scaleX: 0.15,
      rotateY: dir > 0 ? 80 : -80,
      opacity: 0.85,
    }),
    center: {
      scaleX: 1,
      rotateY: 0,
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0.8 : 0.55,
        ease: [0.65, 0, 0.35, 1],
      },
    },
    exit: (dir: 1 | -1) => ({
      scaleX: 0.15,
      rotateY: dir > 0 ? -80 : 80,
      opacity: 0.85,
      transition: {
        duration: shouldReduceMotion ? 0.8 : 0.55,
        ease: [0.65, 0, 0.35, 1],
      },
    }),
  }

  return (
    <div
      ref={stageRef}
      role="group"
      aria-roledescription="carousel"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className="relative w-screen h-[100svh] min-h-[100svh] overflow-hidden bg-[#FAF8F4] flex flex-col justify-end select-none outline-none cursor-grab active:cursor-grabbing focus-visible:outline-2 focus-visible:outline-[#2A9D8F] focus-visible:outline-offset-[3px]"
      style={{
        perspective: '1400px',
        transformStyle: 'preserve-3d',
        touchAction: 'pan-y',
      }}
    >
      {/* Hidden preloader for instant swaps */}
      <div className="hidden" aria-hidden="true">
        {SHOES.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt=""
            width={1100}
            height={800}
            quality={70}
            priority={i === 0}
            sizes="100vw"
          />
        ))}
      </div>

      {/* Main Product Box - Bottom edge sits exactly on the shelf line */}
      <div className="relative w-full flex flex-col items-center justify-end z-20 pointer-events-none">
        <div
          ref={boxRef}
          className="relative w-[min(72vw,1100px)] h-[62vh] flex items-end justify-center"
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Floor Shadow: sits on top of the shelf, synchronizes scaleX & opacity with the spin */}
          <m.div
            key={`shadow-${index}`}
            initial={{ scaleX: 0.4, opacity: 0.35 }}
            animate={{
              scaleX: isDragging ? Math.max(0.4, 1 - Math.abs(clampedDragRotateY) / 60 * 0.6) : 1,
              opacity: isDragging ? Math.max(0.35, 1 - Math.abs(clampedDragRotateY) / 60 * 0.6) : 0.85,
            }}
            transition={{
              duration: 0.55,
              ease: [0.65, 0, 0.35, 1],
            }}
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(20, 17, 15, 0.28) 0%, transparent 70%)',
              filter: 'blur(10px)',
            }}
            className="absolute -bottom-[11px] left-1/2 -translate-x-1/2 w-[70%] h-[22px] pointer-events-none z-10"
          />

          {/* Initial Rising Sequence Container */}
          <m.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 1.1,
              delay: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative w-full h-full flex items-end justify-center"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* AnimatePresence with mode="wait" for Fake 3D Spin Swaps */}
            <AnimatePresence mode="wait" custom={direction}>
              <m.div
                key={safeIndex}
                custom={direction}
                variants={spinVariants}
                initial="enter"
                animate={
                  initialSpinActive
                    ? {
                        scaleX: [1, 0.15, 1],
                        rotateY: [0, 80, 0],
                        opacity: 1,
                        transition: { duration: 1.1, ease: [0.65, 0, 0.35, 1] },
                      }
                    : 'center'
                }
                exit="exit"
                style={{
                  transformStyle: 'preserve-3d',
                  willChange: 'transform',
                  transform: isDragging
                    ? `translateX(${clampedDragX}px) rotateY(${clampedDragRotateY}deg)`
                    : undefined,
                }}
                className="absolute inset-0 w-full h-full flex items-end justify-center"
              >
                {/* Desktop Pointer Tilt Wrapper */}
                <m.div
                  animate={{
                    rotateX: isFinePointer && !isDragging ? tilt.rotateX : 0,
                    rotateY: isFinePointer && !isDragging ? tilt.rotateY : 0,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 160,
                    damping: 18,
                  }}
                  className="relative w-full h-full flex items-end justify-center"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Continuous Idle Sway & Float Levitation */}
                  <m.div
                    animate={
                      !hasEntered || isDragging
                        ? { rotateY: 0, y: 0 }
                        : {
                            rotateY: [-14, 14, -14],
                            y: [0, -10, 0],
                          }
                    }
                    transition={{
                      rotateY: {
                        duration: 5.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      },
                      y: {
                        duration: 3.2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      },
                    }}
                    className="relative w-full h-full flex items-end justify-center"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {currentShoe && !failedImages[currentShoe] ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={currentShoe}
                          alt=""
                          fill
                          priority={index === 0}
                          quality={70}
                          sizes="100vw"
                          className="object-contain object-bottom pointer-events-none select-none"
                          style={{
                            filter: 'drop-shadow(0 28px 26px rgba(20, 17, 15, 0.22))',
                          }}
                          onError={() =>
                            setFailedImages((prev) => ({ ...prev, [currentShoe]: true }))
                          }
                        />
                      </div>
                    ) : null}
                  </m.div>
                </m.div>
              </m.div>
            </AnimatePresence>
          </m.div>
        </div>
      </div>

      {/* Wood Shelf Bar: Full-width at bottom 26vh of the viewport */}
      <div className="relative w-full z-10 shrink-0">
        <m.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            delay: 0.6,
            duration: 1.0,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            transformOrigin: 'left',
            background: 'linear-gradient(to bottom, #C8A27A, #9C7A52)',
          }}
          className="w-full h-[10px] md:h-[14px] border-t border-white/35 rounded-none"
        />

        {/* Soft Shelf Depth Shadow */}
        <div
          aria-hidden="true"
          className="w-full h-[40px] pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at top, rgba(20, 17, 15, 0.18) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Viewport Bottom Spacer (26vh shelf elevation minus shelf and shadow height) */}
      <div className="w-full h-[calc(26vh-54px)] shrink-0" aria-hidden="true" />
    </div>
  )
}

export default function TestPage() {
  return (
    <LazyMotion features={domAnimation}>
      <main className="w-screen min-h-[100svh] overflow-hidden bg-[#FAF8F4]">
        <ProductHero />
      </main>
    </LazyMotion>
  )
}
