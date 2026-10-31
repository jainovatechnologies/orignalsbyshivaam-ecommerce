'use client'

import React from 'react'
import {
  ArrowDownRight,
  ArrowRight,
  CheckCircle2,
  MapPin,
  ShoppingBag,
  Star,
  Truck,
} from 'lucide-react'
import { store } from '@/src/data/originals'
import { ControlledVideo } from './controlled-video'

export function Hero() {
  return (
    <section className="relative w-full min-h-[calc(100dvh-76px)] lg:h-[calc(100dvh-76px)] min-h-[640px] flex flex-col justify-center overflow-hidden bg-[#FAF8F4] text-[#14110F]">
      
      {/* Subtle Background Architectural Ambient Glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 right-10 h-[500px] w-[500px] rounded-full bg-[#D9480F]/[0.035] blur-[100px]" />
        <div className="absolute bottom-10 left-1/3 h-[400px] w-[400px] rounded-full bg-[#C8A27A]/[0.06] blur-[120px]" />
      </div>

      {/* ========================================================= */}
      {/* MAIN CONTENT CONTAINER (ADAPTIVE ACROSS 1920 & MOBILE)   */}
      {/* ========================================================= */}
      <div className="relative z-10 mx-auto w-full max-w-[1780px] px-5 sm:px-8 md:px-12 lg:px-16 2xl:px-20 my-auto py-8 sm:py-10 lg:py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 2xl:gap-20 items-center">
          
          {/* ----------------------------------------------------- */}
          {/* LEFT COLUMN: MONUMENTAL E-COMMERCE HEADLINE & ACTIONS */}
          {/* ----------------------------------------------------- */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-center">
            
            {/* Top Eyebrow Badge (No repetitive text) */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-[#E7E1D6] bg-white px-3.5 py-1 text-[11px] font-extrabold tracking-widest uppercase text-[#14110F] shadow-2xs w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D9480F] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D9480F]" />
              </span>
              <span>EST. {store.established} · FLAGSHIP SHOWROOM, JAIPUR</span>
            </div>

            {/* Monumental Headline */}
            <h1 className="mt-4 sm:mt-5 font-[family-name:var(--font-display)] text-5xl sm:text-7xl md:text-8xl lg:text-[68px] xl:text-[82px] 2xl:text-[96px] font-black leading-[0.94] tracking-[-0.055em] text-[#14110F]">
              <span className="block pb-2 -mb-2">Originals</span>
              <span>Never </span>
              <span className="text-[#F15A22]">Fade.</span>
            </h1>

            {/* Clear Value Proposition Subtitle */}
            <p className="mt-4 text-sm sm:text-base lg:text-lg text-[#14110F]/75 max-w-xl leading-relaxed font-medium">
              India&apos;s independent sneaker &amp; performance footwear destination. 
              100% verified genuine silhouettes sourced directly for your daily rotation and street culture in Jaipur.
            </p>

            {/* Refined Sized CTA Buttons */}
            <div className="mt-6 sm:mt-7 flex flex-wrap items-center gap-3.5">
              <a
                href="#shoe-wall"
                className="group inline-flex items-center gap-2.5 rounded-full bg-[#D9480F] px-6 py-2.5 sm:px-7 sm:py-3 text-[13px] sm:text-sm font-bold text-white shadow-sm hover:bg-[#C23E0C] hover:scale-102 active:scale-98 transition-all cursor-pointer tracking-wide"
              >
                <ShoppingBag size={16} />
                <span>Shop The Shoe Wall</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#visit"
                className="group inline-flex items-center gap-2 rounded-full border border-[#E7E1D6] bg-white px-5 py-2.5 sm:px-6 sm:py-3 text-[13px] sm:text-sm font-bold text-[#14110F] hover:border-[#D9480F] hover:text-[#D9480F] hover:bg-[#FAF8F4] hover:scale-102 active:scale-98 transition-all cursor-pointer tracking-wide shadow-2xs"
              >
                <MapPin size={15} className="text-[#D9480F] group-hover:scale-110 transition-transform" />
                <span>Visit Showroom</span>
              </a>
            </div>

            {/* Strict Single-Line Trust Highlights Row */}
            <div className="mt-7 flex items-center gap-x-4 sm:gap-x-5 text-xs font-bold text-[#14110F] pt-5 border-t border-[#E7E1D6] max-w-2xl overflow-x-auto no-scrollbar flex-nowrap whitespace-nowrap">
              <div className="flex items-center gap-1.5 shrink-0">
                <Star size={14} className="text-[#D9480F] fill-[#D9480F]" />
                <span>5.0 on Google (68 reviews)</span>
              </div>
              <span className="h-3 w-px bg-[#E7E1D6] shrink-0" />
              <div className="flex items-center gap-1.5 shrink-0">
                <CheckCircle2 size={14} className="text-[#D9480F]" />
                <span>100% Genuine Pairs</span>
              </div>
              <span className="h-3 w-px bg-[#E7E1D6] shrink-0" />
              <div className="flex items-center gap-1.5 shrink-0 text-[#81796F]">
                <Truck size={14} className="text-[#D9480F]" />
                <span className="text-[#14110F]">Free Pan-India Delivery</span>
              </div>
            </div>

            {/* Scribble Note in cursive */}
            <p className="mt-5 flex items-center gap-2 font-[family-name:var(--font-note)] text-lg sm:text-xl font-bold text-[#9C7A52] -rotate-2 select-none">
              <span>Come in, try a pair.</span>
              <ArrowDownRight size={20} className="text-[#9C7A52]" />
            </p>

          </div>

          {/* ----------------------------------------------------- */}
          {/* RIGHT COLUMN: REFINED STORE VIDEO SHOWCASE CARD       */}
          {/* ----------------------------------------------------- */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-center items-center lg:items-end">
            <div className="relative w-full max-w-[440px] xl:max-w-[480px] 2xl:max-w-[520px] aspect-[4/4.3] rounded-[28px] overflow-hidden border border-[#E7E1D6] shadow-xl bg-[#EDE8DF] group">
              
              {/* Store Video with Autoplay and Poster Fallback */}
              <ControlledVideo
                src="/videos/hero-store.mp4"
                poster="/images/hero-store-poster.jpg"
                isHero={true}
                alt="Inside Originals By Shivaam Jaipur Showroom"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
              />

              {/* Subtle Inset Ring */}
              <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-inset ring-black/5" />
            </div>
          </div>

        </div>
      </div>

    </section>
  )
}
