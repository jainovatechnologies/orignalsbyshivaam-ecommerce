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
import { ActionButton } from './action-button'

const transitionConfig = {
  duration: 0.65,
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
}

const shoeSlideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '70%' : '-70%',
    y: 12,
    rotateY: direction > 0 ? 20 : -20,
    rotateZ: direction > 0 ? 8 : -8,
    scale: 0.9,
    opacity: 0,
    filter: 'blur(6px)',
  }),
  center: {
    x: '0%',
    y: 0,
    rotateY: 0,
    rotateZ: 0,
    scale: 1.18,
    opacity: 1,
    filter: 'blur(0px)',
    transition: transitionConfig,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? '-70%' : '70%',
    y: -12,
    rotateY: direction > 0 ? -20 : 20,
    rotateZ: direction > 0 ? -8 : 8,
    scale: 0.9,
    opacity: 0,
    filter: 'blur(6px)',
    transition: transitionConfig,
  }),
  reducedEnter: {
    opacity: 0,
  },
  reducedCenter: {
    opacity: 1,
    transition: { duration: 0.35 },
  },
  reducedExit: {
    opacity: 0,
    transition: { duration: 0.35 },
  },
}

function ShoeSlide({
  shoe,
  direction,
  sheenPercent,
  shouldReduceMotion,
}: {
  shoe: HeroShoe
  direction: number
  sheenPercent: number
  shouldReduceMotion: boolean | null
}) {
  return (
    <m.div
      key={shoe.id}
      custom={direction}
      variants={shoeSlideVariants}
      initial={shouldReduceMotion ? 'reducedEnter' : 'enter'}
      animate={shouldReduceMotion ? 'reducedCenter' : 'center'}
      exit={shouldReduceMotion ? 'reducedExit' : 'exit'}
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      style={{
        transformStyle: 'preserve-3d',
        willChange: 'transform, opacity, filter',
      }}
    >
      {/* High-Resolution Cutout Sneaker - Large & Full View */}
      <div className="relative w-full h-full max-w-[760px] max-h-[500px] flex items-center justify-center">
        <Image
          src={`/images/no-bg/${shoe.cutout}`}
          alt={shoe.name}
          fill
          priority
          quality={90}
          sizes="(max-width: 768px) 100vw, 760px"
          className="object-contain object-center drop-shadow-2xl pointer-events-none select-none scale-120 sm:scale-110"
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
          WebkitMaskImage: `url(/images/no-bg/${shoe.cutout})`,
          maskImage: `url(/images/no-bg/${shoe.cutout})`,
          WebkitMaskSize: 'contain',
          maskSize: 'contain',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          WebkitMaskPosition: 'center center',
          maskPosition: 'center center',
        }}
      />
    </m.div>
  )
}

export function Hero() {
  const [shoeIndex, setShoeIndex] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)
  const [isHovered, setIsHovered] = useState(false)
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, normX: 0, normY: 0 })
  const [isFinePointer, setIsFinePointer] = useState(false)

  const stageRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()

  const currentShoe: HeroShoe = SHOES[shoeIndex] || SHOES[0]

  const paginate = useCallback((newDirection: 1 | -1, targetIndex?: number) => {
    setDirection(newDirection)
    if (typeof targetIndex === 'number') {
      setShoeIndex((targetIndex + SHOES.length) % SHOES.length)
    } else {
      setShoeIndex((prev) => (prev + newDirection + SHOES.length) % SHOES.length)
    }
  }, [])

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

  // Preload all shoe cutout images for instant, smooth switching
  useEffect(() => {
    SHOES.forEach((shoe) => {
      const img = new window.Image()
      img.src = `/images/no-bg/${shoe.cutout}`
    })
  }, [])

  // Infinite auto rotation: advance every 3 seconds, pause when hovering over shoe
  useEffect(() => {
    if (isHovered) return

    const timer = setInterval(() => {
      paginate(1)
    }, 3000)

    return () => clearInterval(timer)
  }, [isHovered, paginate])

  // Keyboard navigation when stage is focused
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      paginate(1)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      paginate(-1)
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
        className="relative w-full overflow-hidden bg-[#FAF8F4] text-[#14110F] select-none transition-colors duration-700 lg:h-[calc(100svh-76px)] lg:min-h-[640px] flex flex-col justify-center"
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
          <AnimatePresence mode="popLayout" custom={direction} initial={false}>
            <m.span
              key={currentShoe.brand + '-' + shoeIndex}
              custom={direction}
              animate={
                shouldReduceMotion
                  ? { opacity: 0.032 }
                  : { x: bgParallaxX * 1.4, y: bgParallaxY * 1.4, opacity: 0.032 }
              }
              initial={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, x: direction > 0 ? 80 : -80 }
              }
              exit={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, x: direction > 0 ? -80 : 80 }
              }
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="font-[family-name:var(--font-display)] text-[clamp(90px,22vw,260px)] font-black leading-none tracking-[-0.08em] text-[#14110F] uppercase select-none absolute opacity-[0.06] sm:opacity-[0.035]"
            >
              {currentShoe.brand}
            </m.span>
          </AnimatePresence>
        </div>

        {/* ========================================================= */}
        {/* MAIN HERO CONTAINER (Pixel-Aligned with Site Container)   */}
        {/* ========================================================= */}
        <div className="relative z-10 mx-auto w-full max-w-[1780px] px-5 sm:px-8 md:px-12 lg:px-16 2xl:px-20 py-8 sm:py-10 lg:py-6 flex flex-col justify-center">

          {/* MAIN 2-COLUMN HERO DISPLAY */}
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-6 sm:gap-8 lg:gap-10 xl:gap-14">

            {/* ----------------------------------------------------- */}
            {/* LEFT COLUMN: ORIGINAL EDITORIAL TYPOGRAPHY & COPY     */}
            {/* ----------------------------------------------------- */}
            <div className="lg:col-span-5 flex flex-col justify-center z-20">

              {/* Boutique Eyebrow Pill - Only visible on desktop, hidden on phone */}
              <div className="hidden md:inline-flex items-center gap-2 rounded-full bg-white/90 border border-[#E7E1D6] px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-[#14110F] shadow-2xs mb-3 self-start">
                <span className="h-1.5 w-1.5 rounded-full bg-[#D9480F] animate-pulse shrink-0" />
                <span>100% Authentic Sneakers · Jaipur</span>
              </div>

              {/* Iconic Headline: Originals Never Fade */}
              <h1 className="font-[family-name:var(--font-display)] text-[clamp(36px,9vw,52px)] sm:text-[clamp(44px,min(7.5vw,12vh),108px)] font-black leading-[0.96] sm:leading-[1.02] tracking-[-0.055em] text-[#14110F]">
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
              <p className="mt-3 sm:mt-4 text-[14px] sm:text-[17px] font-medium leading-relaxed text-[#14110F]/80 max-w-[28rem]">
                Curated streetwear & hype silhouettes from Malviya Nagar showroom. Walk-in trials or Pan-India express order.
              </p>

              {/* Shorter, Sleeker CTA Buttons - Equal Width in 1 Row on Mobile */}
              <div className="mt-4 sm:mt-5 grid grid-cols-2 gap-2.5 sm:flex sm:w-auto sm:items-center sm:gap-2.5">
                <ActionButton
                  href="#shoe-wall"
                  variant="primary"
                  magnetic={true}
                  containerClassName="w-full sm:w-auto"
                  className="w-full px-2.5 sm:px-5 py-2.5 text-xs font-bold text-center justify-center shadow-sm"
                >
                  <ShoppingBag size={14} className="shrink-0" />
                  <span className="truncate">Browse Shoes</span>
                  <ArrowDownRight size={14} className="shrink-0 hidden xs:inline sm:inline" />
                </ActionButton>

                <ActionButton
                  href="#inside-store"
                  variant="secondary"
                  magnetic={true}
                  containerClassName="w-full sm:w-auto"
                  className="w-full px-2.5 sm:px-5 py-2.5 text-xs font-bold text-center justify-center"
                >
                  <MapPin size={14} className="shrink-0" />
                  <span className="truncate">Visit Showroom</span>
                </ActionButton>
              </div>

              {/* Trust Badges Strip */}
              <div className=" mt-4 pt-3.5 border-t border-[#E7E1D6]/80 flex flex-wrap items-center gap-x-3.5 gap-y-1.5 text-xs font-semibold text-[#81796F]">
                <div className="flex items-center gap-1.5 text-[#14110F]">
                  <Star size={13} className="text-[#D9480F] fill-[#D9480F] shrink-0" />
                  <span className="font-bold">5.0 Star</span>
                  <span className="text-[#81796F] font-normal">(68+ Reviews)</span>
                </div>
                <span className="text-[#D9480F]">·</span>
                <div className="flex items-center gap-1.5 text-[#14110F]">
                  <span>Pan-India Courier</span>
                </div>
                <span className="hidden sm:inline text-[#D9480F]">·</span>
                <div className="hidden sm:flex items-center gap-1.5 text-[#14110F]">
                  <span>Walk-ins Welcome</span>
                </div>
              </div>

            </div>

            {/* ----------------------------------------------------- */}
            {/* RIGHT COLUMN: 3D SNEAKER SHOWCASE                     */}
            {/* ----------------------------------------------------- */}
            <div className="lg:col-span-7 relative flex flex-col items-center justify-center z-10 w-full">

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
                className="relative w-full max-w-[640px] h-[260px] xs:h-[300px] sm:h-[380px] md:h-[420px] flex items-center justify-center outline-none cursor-grab active:cursor-grabbing"
                style={{
                  perspective: '1400px',
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Active Sneaker Floating Model Badge */}
                {/* <div className="absolute top-0 right-0 sm:top-2 sm:right-2 z-20 pointer-events-none">
                  <div className="flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-[#14110F] border border-[#E7E1D6] shadow-2xs">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#D9480F] animate-pulse" />
                    <span className="tracking-wide uppercase">{currentShoe.name}</span>
                  </div>
                </div> */}

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
                    {/* AnimatePresence for Simultaneous Ek-Jaa-Raha-Hai, Ek-Aa-Raha-Hai Transition */}
                    <AnimatePresence mode="popLayout" custom={direction} initial={false}>
                      <ShoeSlide
                        key={currentShoe.id}
                        shoe={currentShoe}
                        direction={direction}
                        sheenPercent={sheenPercent}
                        shouldReduceMotion={shouldReduceMotion}
                      />
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
                  className="absolute bottom-1 left-1/2 -translate-x-1/2 w-[75%] h-[20px] sm:h-[26px] rounded-full pointer-events-none z-0"
                />
              </div>

            </div>

          </div>

        </div>
      </section>
    </LazyMotion>
  )
}
