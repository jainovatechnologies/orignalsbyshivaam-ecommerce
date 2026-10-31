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
import {
  ArrowDownRight,
  MapPin,
  ShoppingBag,
  Star,
} from 'lucide-react'
import { hero, SHOES, HeroShoe } from '@/src/data/originals'

export function Hero() {
  const [shoeIndex, setShoeIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, normX: 0, normY: 0 })
  const [isFinePointer, setIsFinePointer] = useState(false)

  const stageRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()

  const currentShoe: HeroShoe = SHOES[shoeIndex] || SHOES[0]

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

  // Auto rotation: advance every 5s, pause on hover
  const changeShoe = useCallback((newIndex: number) => {
    const nextIdx = (newIndex + SHOES.length) % SHOES.length
    setShoeIndex(nextIdx)
  }, [])

  useEffect(() => {
    if (isHovered || shouldReduceMotion) return

    const timer = setInterval(() => {
      changeShoe(shoeIndex + 1)
    }, 5000)

    return () => clearInterval(timer)
  }, [isHovered, shouldReduceMotion, shoeIndex, changeShoe])

  // Keyboard navigation when stage is focused
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      changeShoe(shoeIndex + 1)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      changeShoe(shoeIndex - 1)
    }
  }

  // Pointer move handler for 3D tilt, parallax, and specular sheen
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!stageRef.current || !isFinePointer || shouldReduceMotion) return

    const rect = stageRef.current.getBoundingClientRect()
    const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2 // -1 to 1
    const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2 // -1 to 1

    setTilt({
      rotateY: Math.max(-16, Math.min(16, normX * 16)),
      rotateX: Math.max(-10, Math.min(10, -normY * 10)),
      normX,
      normY,
    })
  }

  const handlePointerLeave = () => {
    setIsHovered(false)
    setTilt({ rotateX: 0, rotateY: 0, normX: 0, normY: 0 })
  }

  // Parallax background movement: opposite direction
  const bgParallaxX = -tilt.normX * 18
  const bgParallaxY = -tilt.normY * 14

  // Sheen gradient sweep
  const sheenPercent = Math.max(0, Math.min(100, ((tilt.normX + 1) / 2) * 100))

  // Contact shadow reaction to tilt
  const tiltMagnitude = Math.min(
    1,
    Math.sqrt(tilt.normX * tilt.normX + tilt.normY * tilt.normY) / 1.414
  )
  const shadowScaleX = 1 - tiltMagnitude * 0.16
  const shadowOpacity = 1 - tiltMagnitude * 0.22

  return (
    <LazyMotion features={domAnimation}>
      <section
        aria-label="Hero"
        className="relative w-full min-h-[calc(100svh-76px)] lg:h-[calc(100svh-76px)] min-h-[600px] flex flex-col justify-between overflow-hidden bg-[#FAF8F4] text-[#14110F] select-none transition-colors duration-700"
      >
        {/* Dynamic Luminous Aura - morphs with active shoe */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden transition-all duration-1000"
        >
          {/* Active Shoe Signature Glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] sm:h-[650px] sm:w-[650px] rounded-full blur-[130px] opacity-70 transition-all duration-700"
            style={{ background: currentShoe.aura }}
          />
          <div className="absolute -top-32 -right-20 h-[450px] w-[450px] rounded-full bg-[#D9480F]/[0.04] blur-[130px]" />
        </div>

        {/* Architectural 3D Watermark Typography Behind Sneaker */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center z-0 overflow-hidden"
        >
          <m.span
            animate={
              shouldReduceMotion
                ? { x: 0, y: 0 }
                : { x: bgParallaxX * 1.4, y: bgParallaxY * 1.4 }
            }
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="font-[family-name:var(--font-display)] text-[clamp(110px,20vw,260px)] font-black leading-none tracking-[-0.08em] text-[#14110F]/[0.032] uppercase select-none"
          >
            {currentShoe.brand}
          </m.span>
        </div>

        {/* ========================================================= */}
        {/* MAIN HERO CONTAINER (Pixel-Aligned with Site Container)   */}
        {/* ========================================================= */}
        <div className="relative z-10 mx-auto w-full max-w-[1780px] px-5 sm:px-8 md:px-12 lg:px-16 2xl:px-20 h-full flex flex-col justify-between py-6 sm:py-8 lg:py-6">
          
          {/* MAIN 2-COLUMN HERO DISPLAY */}
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-6 lg:gap-10 xl:gap-14 my-auto">
            
            {/* ----------------------------------------------------- */}
            {/* LEFT COLUMN: ORIGINAL EDITORIAL TYPOGRAPHY & COPY     */}
            {/* ----------------------------------------------------- */}
            <div className="lg:col-span-5 flex flex-col justify-center z-20">
              
              {/* Single Clean Eyebrow */}
              <div className="flex items-center gap-2 text-[12px] font-extrabold uppercase tracking-[0.14em] text-[#14110F] mb-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#D9480F] shrink-0" />
                <span>{hero.eyebrow}</span>
              </div>

              {/* Iconic Headline: Originals Never Fade */}
              <h1 className="font-[family-name:var(--font-display)] text-[clamp(44px,min(7.5vw,12vh),108px)] font-black leading-[1.02] tracking-[-0.055em] text-[#14110F]">
                {/* Line 1: Originals */}
                <span className="block overflow-hidden pb-[0.14em] -mb-[0.14em]">
                  <m.span
                    initial={shouldReduceMotion ? { y: 0 } : { y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, delay: 0.0, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block"
                  >
                    {hero.headlineLine1}
                  </m.span>
                </span>
                {/* Line 2: Never Fade. */}
                <span className="block overflow-hidden pb-[0.14em] -mb-[0.14em]">
                  <m.span
                    initial={shouldReduceMotion ? { y: 0 } : { y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block text-[#F15A22]"
                  >
                    {hero.headlineLine2}
                  </m.span>
                </span>
              </h1>

              {/* Subline */}
              <p className="mt-4 text-[15px] sm:text-[17px] font-medium leading-relaxed text-[#14110F]/80 max-w-[28rem]">
                {hero.subline}
              </p>

              {/* Shorter, Sleeker CTA Buttons */}
              <div className="mt-5 flex flex-wrap items-center gap-2.5">
                <a
                  href="#shoe-wall"
                  className="btn-primary inline-flex h-[42px] items-center justify-center gap-2 rounded-full px-5 text-xs font-bold uppercase tracking-wider text-white shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <ShoppingBag size={14} />
                  <span>Browse Shoes</span>
                  <ArrowDownRight size={14} />
                </a>

                <a
                  href="#inside-store"
                  className="inline-flex h-[42px] items-center justify-center gap-1.5 rounded-full border border-[#14110F] bg-white/60 backdrop-blur-xs px-4 text-xs font-bold uppercase tracking-wider text-[#14110F] hover:bg-[#14110F] hover:text-white transition-all cursor-pointer"
                >
                  <MapPin size={14} />
                  <span>Visit Showroom</span>
                </a>
              </div>

              {/* Trust Strip & Brands */}
              <div className="mt-5 pt-3 border-t border-[#E7E1D6] max-w-md space-y-1">
                <div className="flex items-center gap-1.5 text-[13px] font-bold text-[#14110F]">
                  <Star size={14} className="text-[#D9480F] fill-[#D9480F]" />
                  <span>{hero.trustRating}</span>
                </div>
                <p className="text-[12px] font-semibold text-[#81796F] tracking-wide">
                  {hero.brandsLine}
                </p>
              </div>

              {/* Handwritten Note in Caveat */}
              <p className="mt-2.5 flex items-center gap-2 font-[family-name:var(--font-note)] text-[22px] font-bold text-[#9C7A52] -rotate-2 select-none">
                <span>{hero.handNote}</span>
                <ArrowDownRight size={20} className="text-[#9C7A52]" />
              </p>

            </div>

            {/* ----------------------------------------------------- */}
            {/* RIGHT COLUMN: 3D SNEAKER SHOWCASE (No Bulky Card)     */}
            {/* ----------------------------------------------------- */}
            <div className="lg:col-span-7 relative flex flex-col items-center justify-center z-10">
              
              {/* THE 3D INTERACTIVE SNEAKER STAGE */}
              <div
                ref={stageRef}
                role="region"
                aria-label="3D Sneaker Showcase"
                tabIndex={0}
                onKeyDown={handleKeyDown}
                onPointerEnter={() => setIsHovered(true)}
                onPointerLeave={handlePointerLeave}
                onPointerMove={handlePointerMove}
                className="relative w-full max-w-[640px] h-[320px] sm:h-[380px] md:h-[420px] flex items-center justify-center outline-none cursor-grab active:cursor-grabbing"
                style={{
                  perspective: '1400px',
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* 3D Spring Tilt Wrapper */}
                <m.div
                  animate={{
                    rotateX: isFinePointer && isHovered && !shouldReduceMotion ? tilt.rotateX : 0,
                    rotateY: isFinePointer && isHovered && !shouldReduceMotion ? tilt.rotateY : 0,
                    scale: isHovered && !shouldReduceMotion ? 1.03 : 1,
                  }}
                  transition={{ type: 'spring', stiffness: 150, damping: 20 }}
                  className="relative w-full h-full flex items-center justify-center"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Zero-Gravity Levitation Float */}
                  <m.div
                    animate={
                      shouldReduceMotion || isHovered
                        ? { y: 0, rotateZ: 0 }
                        : {
                            y: [-8, 8, -8],
                            rotateZ: [-1, 1, -1],
                          }
                    }
                    transition={{
                      y: { duration: 4.0, repeat: Infinity, ease: 'easeInOut' },
                      rotateZ: { duration: 5.5, repeat: Infinity, ease: 'easeInOut' },
                    }}
                    className="relative w-full h-full flex items-center justify-center"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* AnimatePresence for Shoe Change Transition */}
                    <AnimatePresence mode="wait">
                      <m.div
                        key={currentShoe.id}
                        initial={
                          shouldReduceMotion
                            ? { opacity: 1, scale: 1 }
                            : { opacity: 0, scale: 0.90, y: 20, rotateY: 12 }
                        }
                        animate={{ opacity: 1, scale: 1, y: 0, rotateY: 0 }}
                        exit={
                          shouldReduceMotion
                            ? { opacity: 0 }
                            : { opacity: 0, scale: 0.92, y: -20, rotateY: -12 }
                        }
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="relative w-full h-full flex items-center justify-center"
                        style={{ willChange: 'transform' }}
                      >
                        {/* High-Resolution Cutout Sneaker */}
                        <div className="relative w-[92%] h-[92%] max-w-[560px] max-h-[380px]">
                          <Image
                            src={`/images/no-bg/${currentShoe.cutout}`}
                            alt={currentShoe.name}
                            fill
                            priority
                            quality={85}
                            sizes="(max-width: 768px) 95vw, 560px"
                            className="object-contain object-center drop-shadow-2xl pointer-events-none select-none"
                          />
                        </div>

                        {/* Moving Specular Sheen Layer clipped to shoe */}
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            background:
                              'linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.6) 50%, transparent 70%)',
                            backgroundSize: '200% 200%',
                            backgroundPosition: `${sheenPercent}% 50%`,
                            mixBlendMode: 'soft-light',
                            WebkitMaskImage: `url(/images/no-bg/${currentShoe.cutout})`,
                            maskImage: `url(/images/no-bg/${currentShoe.cutout})`,
                            WebkitMaskSize: 'contain',
                            maskSize: 'contain',
                            WebkitMaskRepeat: 'no-repeat',
                            maskRepeat: 'no-repeat',
                            WebkitMaskPosition: 'center center',
                            maskPosition: 'center center',
                          }}
                        />
                      </m.div>
                    </AnimatePresence>
                  </m.div>
                </m.div>

                {/* Dynamic Contact Shadow reacting to tilt */}
                <m.div
                  aria-hidden="true"
                  animate={
                    shouldReduceMotion
                      ? { scaleX: 1, opacity: 1 }
                      : { scaleX: shadowScaleX, opacity: shadowOpacity }
                  }
                  transition={{ type: 'spring', stiffness: 150, damping: 20 }}
                  style={{
                    background:
                      'radial-gradient(ellipse at center, rgba(20,17,15,0.32) 0%, transparent 72%)',
                  }}
                  className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[62%] h-[22px] rounded-full pointer-events-none z-0"
                />
              </div>

            </div>

          </div>

        </div>
      </section>
    </LazyMotion>
  )
}
