'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import { m, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { MapPin, Sparkles } from 'lucide-react'
import { ScrollReveal } from './scroll-reveal'

export function InsideStore() {
  const containerRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()

  // Scroll-linked parallax (small, max 20px) on store-wide-1
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [-20, 20]
  )

  return (
    <section
      id="inside-store"
      ref={containerRef}
      className="py-20 md:py-28 bg-[#FAF8F4] relative overflow-hidden border-t border-[#E7E1D6]"
    >
      <div className="mx-auto max-w-[1780px] px-5 sm:px-8 md:px-12 lg:px-16 2xl:px-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14 items-center">
          {/* Left: Store wide image with parallax */}
          <ScrollReveal direction="up" delay={0.1} className="lg:col-span-7">
            <div className="relative h-[360px] sm:h-[460px] md:h-[520px] w-full rounded-[26px] overflow-hidden border border-[#E7E1D6] shadow-xl sm:shadow-2xl bg-[#EDE8DF]">
              <m.div
                style={{ y: parallaxY }}
                className="relative h-[115%] w-full -top-[7.5%]"
              >
                <Image
                  src="/images/store-wide-1.jpg"
                  alt="Inside the Originals By Shivaam store"
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  quality={70}
                  className="object-cover"
                />
              </m.div>

              <div className="pointer-events-none absolute bottom-4 left-4 rounded-full bg-[#14110F]/85 backdrop-blur-xs px-4 py-2 text-xs font-bold text-white flex items-center gap-2">
                <MapPin size={14} className="text-[#D9480F]" />
                <span>Malviya Nagar, Jaipur Showroom</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Store atmosphere copy & secondary images */}
          <ScrollReveal direction="up" delay={0.25} className="lg:col-span-5 flex flex-col justify-center">
            <p className="text-[11px] font-extrabold tracking-[0.2em] text-[#D9480F] uppercase mb-2">
              THE EXPERIENCE
            </p>
            <h2 className="text-[38px] sm:text-[48px] font-extrabold tracking-[-0.055em] font-[family-name:var(--font-display)] text-[#14110F] leading-[0.95]">
              Inside the<br />
              <em className="font-normal text-[#F15A22]">store.</em>
            </h2>
            <p className="mt-5 text-sm sm:text-base leading-relaxed text-[#14110F]/80">
              Stepping into our basement space feels different from standard mall
              outlets. Wood shelving, authentic sneaker culture, open shoe walls,
              and staff who actually know fit, cushioning, and drops.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="relative h-[160px] rounded-2xl overflow-hidden border border-[#E7E1D6] bg-[#EDE8DF]">
                <Image
                  src="/images/store-wall-1.jpg"
                  alt="Full shoe wall wooden shelves"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  quality={70}
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="relative h-[160px] rounded-2xl overflow-hidden border border-[#E7E1D6] bg-[#EDE8DF]">
                <Image
                  src="/images/store-floor-1.jpg"
                  alt="Store floor and details"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  quality={70}
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 text-xs font-bold text-[#81796F]">
              <Sparkles size={16} className="text-[#D9480F]" />
              <span>Real pairs on display · Try before you buy</span>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
