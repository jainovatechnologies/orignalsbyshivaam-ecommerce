'use client'

import React from 'react'
import { ArrowDownRight, ArrowRight, CheckCircle2, MapPin, Sparkles, Star } from 'lucide-react'
import { m, useReducedMotion } from 'framer-motion'
import { ActionButton } from './action-button'
import { ControlledVideo } from './controlled-video'
import { store } from '@/src/data/originals'

export function Hero() {
  const shouldReduceMotion = useReducedMotion()

  const words = [
    { text: 'Originals', isAccent: false },
    { text: 'Never', isAccent: false },
    { text: 'Fade.', isAccent: true },
  ]

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  }

  const wordVariants = {
    hidden: { y: shouldReduceMotion ? '0%' : '110%' },
    visible: {
      y: '0%',
      transition: {
        duration: shouldReduceMotion ? 0 : 0.7,
        ease: [0.215, 0.61, 0.355, 1],
      },
    },
  }

  return (
    <section className="relative flex flex-col justify-center overflow-hidden bg-[#FAF8F4] min-h-[calc(100dvh-76px)] lg:h-[calc(100dvh-76px)] py-8 sm:py-10 lg:py-0">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8 my-auto">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-14">
          {/* Hero Left Content */}
          <div className="lg:col-span-6 xl:col-span-6">
            {/* Top Eyebrow Badge with live pulse */}
            <div className="mb-3 sm:mb-4 inline-flex items-center gap-2 rounded-full border border-[#E7E1D6] bg-white px-3.5 py-1.5 shadow-2xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D9480F] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D9480F]" />
              </span>
              <span className="text-[11px] font-extrabold tracking-[0.16em] text-[#14110F] uppercase">
                EST. {store.established} · MALVIYA NAGAR, JAIPUR
              </span>
            </div>

            {/* Monumental Headline */}
            <m.h1
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-[44px] sm:text-[56px] md:text-[66px] lg:text-[68px] xl:text-[80px] leading-[1.02] font-extrabold tracking-[-0.06em] font-[family-name:var(--font-display)] text-[#14110F]"
            >
              <span className="block overflow-hidden pb-3 sm:pb-4 -mb-2 sm:-mb-3">
                <m.span variants={wordVariants} className="inline-block pb-2 sm:pb-3">
                  Originals
                </m.span>
              </span>
              <span className="block overflow-hidden pb-3 sm:pb-4">
                <m.span variants={wordVariants} className="inline-block pb-2 sm:pb-3">
                  Never{' '}
                </m.span>
                <m.span
                  variants={wordVariants}
                  className="inline-block pb-2 sm:pb-3 text-[#F15A22]"
                >
                  Fade.
                </m.span>
              </span>
            </m.h1>

            <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-[15px] xl:text-base leading-relaxed text-[#14110F]/75 max-w-lg">
              Real brands. Real you. Verified sneakers and lifestyle footwear
              sourced for your daily rotation and independent culture in Jaipur.
            </p>

            {/* Quick Trust Highlights */}
            <div className="mt-4 lg:mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold text-[#81796F] border-y border-[#E7E1D6] py-2.5 max-w-lg">
              <div className="flex items-center gap-1.5 text-[#14110F]">
                <Star size={14} className="text-[#D9480F] fill-[#D9480F]" />
                <span>5.0 on Google (68 reviews)</span>
              </div>
              <span className="h-3 w-px bg-[#E7E1D6] hidden sm:block" />
              <div className="flex items-center gap-1.5 text-[#14110F]">
                <CheckCircle2 size={14} className="text-[#D9480F]" />
                <span>100% Genuine Pairs</span>
              </div>
              <span className="h-3 w-px bg-[#E7E1D6] hidden sm:block" />
              <div className="flex items-center gap-1.5 text-[#14110F]">
                <Sparkles size={14} className="text-[#D9480F]" />
                <span>Free Pan-India Delivery</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-5 lg:mt-6 flex flex-wrap items-center gap-3">
              <ActionButton
                href="#shoe-wall"
                variant="primary"
                magnetic={true}
                className="shadow-2xs"
              >
                <span>Browse the Shoe Wall</span>
                <ArrowDownRight size={16} />
              </ActionButton>
              <ActionButton
                href="#wholesale"
                variant="secondary"
                magnetic={true}
              >
                <span>Wholesale enquiry</span>
                <ArrowRight size={16} />
              </ActionButton>
            </div>

            {/* Scribble Note in cursive */}
            <p className="mt-3 sm:mt-4 flex items-center gap-2 font-[family-name:var(--font-note)] text-xl lg:text-2xl font-bold text-[#9C7A52] -rotate-2 select-none">
              <span>Come in, try a pair.</span>
              <ArrowDownRight size={20} className="text-[#9C7A52]" />
            </p>
          </div>

          {/* Hero Visual: Modern Video Gallery Display */}
          <div className="lg:col-span-6 xl:col-span-6 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[390px] sm:max-w-[450px] lg:max-w-[420px] xl:max-w-[480px] aspect-[4/4.3] rounded-[24px] lg:rounded-[28px] overflow-hidden border border-[#E7E1D6] shadow-xl bg-[#EDE8DF]">
              <ControlledVideo
                src="/videos/hero-store.mp4"
                poster="/images/hero-store-poster.jpg"
                isHero={true}
                alt="Inside Originals By Shivaam store"
              />

              {/* Floating Top Badge */}
              <div className="absolute top-3.5 left-3.5 z-20">
                <div className="flex items-center gap-2 rounded-full bg-white/95 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-[#14110F] border border-[#E7E1D6] shadow-2xs">
                  <span className="h-2 w-2 rounded-full bg-[#D9480F] animate-pulse" />
                  <span>Store Live Feed</span>
                </div>
              </div>

              {/* Floating Bottom Location Pill */}
              <div className="absolute bottom-3.5 right-3.5 z-20">
                <div className="flex items-center gap-1.5 rounded-full bg-[#14110F]/85 backdrop-blur-md px-3 py-1 text-[11px] font-semibold text-white border border-white/10 shadow-md">
                  <MapPin size={12} className="text-[#D9480F]" />
                  <span>Malviya Nagar, Jaipur</span>
                </div>
              </div>

              <div className="pointer-events-none absolute inset-0 rounded-[24px] lg:rounded-[28px] ring-1 ring-inset ring-black/5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
