'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

// 6 Horizontal slice bands for pure RGB Glitch jitter
const SLICE_BANDS = [
  { clip: 'inset(0% 0% 83.333% 0%)' },
  { clip: 'inset(16.666% 0% 66.666% 0%)' },
  { clip: 'inset(33.333% 0% 50% 0%)' },
  { clip: 'inset(50% 0% 33.333% 0%)' },
  { clip: 'inset(66.666% 0% 16.666% 0%)' },
  { clip: 'inset(83.333% 0% 0% 0%)' },
]

export default function TestPage() {
  // Phase 1 -> Phase 2 transition state
  const [isSettled, setIsSettled] = useState(false)

  // Phase 3: Pure RGB Glitch State (200ms horizontal jitter)
  const [isGlitching, setIsGlitching] = useState(false)
  const [glitchOffsets, setGlitchOffsets] = useState<number[]>([0, 0, 0, 0, 0, 0])

  // Phase 4: Minimal Inspection Slider
  const [sliderPos, setSliderPos] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)

  // 1. High-End 3D Entry Sequence (0.0s - 1.2s)
  useEffect(() => {
    const settleTimer = setTimeout(() => {
      setIsSettled(true)
    }, 1200)

    // Optional glitch trigger after entry settle
    const autoGlitchTimer = setTimeout(() => {
      triggerGlitch()
    }, 2400)

    return () => {
      clearTimeout(settleTimer)
      clearTimeout(autoGlitchTimer)
    }
  }, [])

  // 3. Pure RGB Glitch Transition (200ms total)
  const triggerGlitch = useCallback(() => {
    if (isGlitching) return
    setIsGlitching(true)

    const startTime = performance.now()
    const duration = 200 // 200ms

    const interval = setInterval(() => {
      const elapsed = performance.now() - startTime
      if (elapsed >= duration) {
        clearInterval(interval)
        // Snap back cleanly to 0px offset
        setGlitchOffsets([0, 0, 0, 0, 0, 0])
        setIsGlitching(false)
      } else {
        // Random horizontal slice jitter (-25px to +25px)
        const offsets = Array.from({ length: 6 }, () => 
          Math.floor(Math.random() * 51) - 25
        )
        setGlitchOffsets(offsets)
      }
    }, 30)
  }, [isGlitching])

  // 4. Slider Drag Handling
  const updateSlider = useCallback((clientX: number) => {
    if (!trackRef.current) return
    const rect = trackRef.current.getBoundingClientRect()
    const offsetX = clientX - rect.left
    const percent = Math.max(5, Math.min(95, (offsetX / rect.width) * 100))
    setSliderPos(percent)
  }, [])

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true)
    updateSlider(e.clientX)
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    triggerGlitch()
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging) {
      updateSlider(e.clientX)
    }
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDragging) {
      setIsDragging(false)
      try {
        ;(e.target as HTMLElement).releasePointerCapture(e.pointerId)
      } catch {
        // ignore
      }
    }
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#FAF8F4] overflow-hidden select-none">
      
      {/* 0. Center-Stage 3D Canvas (perspective: 1200px) */}
      <div 
        className="relative w-full max-w-[700px] aspect-[4/3] flex items-center justify-center"
        style={{ perspective: 1200 }}
      >
        {/* Soft Ambient Dynamic Floor Shadow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: isSettled ? [0.28, 0.18, 0.28] : 0.28,
            scale: isSettled ? [1, 0.88, 1] : 1,
          }}
          transition={{
            duration: 3.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-10 w-[65%] h-8 rounded-[100%] bg-black/35 blur-xl pointer-events-none"
        />

        {/* 1. High-End 3D Entry Sequence (0.0s - 1.2s) */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.5,
            rotateY: 180,
            y: 60,
          }}
          animate={{
            opacity: 1,
            scale: 1.0,
            rotateY: 0,
            y: 0,
          }}
          transition={{
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1], // 1.2s cubic-bezier(0.16, 1, 0.3, 1)
          }}
          style={{ transformStyle: 'preserve-3d' }}
          className="relative w-full h-full flex items-center justify-center"
        >
          {/* 2. Levitation & Ambient 3D Motion (Loop) */}
          <motion.div
            animate={isSettled ? {
              y: [0, -14, 0],
              rotateX: [0, 3, 0],
              rotateY: [-2, 2, -2],
            } : {
              y: 0,
              rotateX: 0,
              rotateY: 0,
            }}
            transition={{
              duration: 3.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{ transformStyle: 'preserve-3d' }}
            onClick={triggerGlitch}
            className="relative w-[85%] aspect-[4/3] flex items-center justify-center cursor-pointer"
          >
            {/* Standard Product View & Inspection Reveal Layer */}
            {!isGlitching ? (
              <div className="relative w-full h-full">
                {/* Base Product Asset */}
                <Image
                  src="/images/test-product.png"
                  alt="Product Asset"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 700px"
                  className="object-contain drop-shadow-2xl pointer-events-none"
                />

                {/* Inspection Reveal Layer (Clipped by Slider) */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    clipPath: `inset(0 0 0 ${sliderPos}%)`,
                  }}
                >
                  <div
                    className="relative w-full h-full"
                    style={{
                      filter: 'invert(0.9) contrast(1.3) hue-rotate(190deg)',
                    }}
                  >
                    <Image
                      src="/images/test-product.png"
                      alt="Product Inspection View"
                      fill
                      sizes="(max-width: 768px) 100vw, 700px"
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Subtle Divider Hairline */}
                <div
                  className="absolute top-4 bottom-4 w-px bg-black/25 pointer-events-none"
                  style={{
                    left: `${sliderPos}%`,
                  }}
                />
              </div>
            ) : (
              /* 3. Pure RGB Glitch Transition (200ms Slices & Chromatic Aberration) */
              <div className="relative w-full h-full">
                {/* Cyan RGB Split Underlay */}
                <div
                  className="absolute inset-0 opacity-80"
                  style={{
                    filter: 'hue-rotate(180deg) invert(0.15) drop-shadow(-4px 0px 0px rgba(0, 255, 255, 0.85))',
                    transform: 'translateX(-3px)',
                  }}
                >
                  <Image
                    src="/images/test-product.png"
                    alt="Glitch Cyan"
                    fill
                    sizes="(max-width: 768px) 100vw, 700px"
                    className="object-contain"
                  />
                </div>

                {/* Magenta RGB Split Underlay */}
                <div
                  className="absolute inset-0 opacity-80"
                  style={{
                    filter: 'drop-shadow(4px 0px 0px rgba(255, 0, 128, 0.85))',
                    transform: 'translateX(3px)',
                  }}
                >
                  <Image
                    src="/images/test-product.png"
                    alt="Glitch Magenta"
                    fill
                    sizes="(max-width: 768px) 100vw, 700px"
                    className="object-contain"
                  />
                </div>

                {/* 6 Horizontal Slice Jitter Bands */}
                {SLICE_BANDS.map((band, idx) => {
                  const xOffset = glitchOffsets[idx] || 0
                  return (
                    <div
                      key={idx}
                      className="absolute inset-0"
                      style={{
                        clipPath: band.clip,
                        transform: `translateX(${xOffset}px)`,
                        transition: 'transform 0.03s ease-out',
                        filter: 'hue-rotate(180deg) invert(0.15)',
                      }}
                    >
                      <Image
                        src="/images/test-product.png"
                        alt={`Glitch Band ${idx}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 700px"
                        className="object-contain"
                      />
                    </div>
                  )
                })}
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* 4. Minimal Inspection Slider (Handle Pill '</>' Only) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-[340px] sm:max-w-[400px] h-10 mt-2 flex items-center justify-center px-4"
      >
        <div
          ref={trackRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="relative w-full h-8 flex items-center cursor-ew-resize touch-none select-none"
        >
          {/* Subtle Minimal Track Line */}
          <div className="w-full h-[2px] bg-[#E7E1D6] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#14110F]/30"
              style={{ width: `${sliderPos}%` }}
            />
          </div>

          {/* Floating Slider Handle Pill ('</>') */}
          <div
            style={{
              left: `calc(${sliderPos}% - 18px)`,
            }}
            className="absolute top-1/2 -translate-y-1/2 flex h-7 w-9 items-center justify-center rounded-full bg-white border border-[#E7E1D6] text-[#14110F] shadow-sm hover:scale-105 active:scale-95 transition-transform font-mono text-[11px] font-black cursor-grab active:cursor-grabbing"
          >
            &lt;/&gt;
          </div>
        </div>
      </motion.div>

    </div>
  )
}

