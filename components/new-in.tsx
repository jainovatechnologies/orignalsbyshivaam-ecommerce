'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowDownRight, ArrowRight, Flame, Sparkles } from 'lucide-react'
import { arrivals } from '@/src/data/originals'
import { ScrollReveal } from './scroll-reveal'

export function NewIn() {
  return (
    <section id="new-in" className="py-16 md:py-24 bg-[#FAF8F4] border-t border-[#E7E1D6]">
      <div className="mx-auto max-w-[1780px] px-5 sm:px-8 md:px-12 lg:px-16 2xl:px-20">
        
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-14 gap-4">
            <div>
              <div className="flex items-center gap-2 text-[11px] font-extrabold tracking-[0.2em] text-[#D9480F] uppercase mb-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#D9480F]" />
                <span>03 / WEEKLY DROPS</span>
              </div>
              <h2 className="text-[32px] sm:text-[44px] md:text-[52px] font-extrabold tracking-[-0.055em] font-[family-name:var(--font-display)] text-[#14110F] leading-[0.98]">
                Fresh on<br />
                <em className="font-normal text-[#F15A22]">the wall.</em>
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <p className="text-xs sm:text-sm text-[#14110F]/70 max-w-sm">
                Direct unboxings and daily size runs landing on our Malviya Nagar showroom floor. First come, first served.
              </p>
              <a
                href="#shoe-wall"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#D9480F] hover:text-[#14110F] transition-colors whitespace-nowrap cursor-pointer"
              >
                <span>View Full Wall</span>
                <ArrowDownRight size={16} />
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* 3 High-Heat Editorial Drop Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
          {arrivals.map((item, index) => {
            const discountPercent = Math.round(((item.mrp - item.ourPrice) / item.mrp) * 100)
            return (
              <ScrollReveal
                key={item.id}
                direction="up"
                delay={index * 0.12}
                className="flex flex-col"
              >
                <div className="group relative flex flex-col justify-between rounded-[24px] border border-[#E7E1D6] bg-white overflow-hidden shadow-xs hover:shadow-xl hover:border-[#D9480F]/40 hover:-translate-y-1.5 transition-all duration-300">
                  
                  {/* Image Showcase Container */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#EDE8DF]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      quality={80}
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                    />

                    {/* Top Status & Date Pill */}
                    <div className="absolute top-3.5 left-3.5 z-10 flex items-center gap-1.5">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#14110F]/90 backdrop-blur-md px-3 py-1 text-[10px] font-extrabold tracking-wider uppercase text-white shadow-sm">
                        <Flame size={12} className="text-[#F15A22]" />
                        <span>{item.date}</span>
                      </span>
                    </div>

                    {/* Discount Badge */}
                    <div className="absolute top-3.5 right-3.5 z-10">
                      <span className="inline-flex items-center rounded-full bg-[#D9480F] px-2.5 py-1 text-[10px] font-black tracking-wider uppercase text-white shadow-sm">
                        {discountPercent}% OFF
                      </span>
                    </div>

                    {/* Category Overlay Pill */}
                    <div className="absolute bottom-3 left-3 z-10">
                      <span className="inline-flex items-center rounded-full bg-white/95 backdrop-blur-md px-3 py-0.5 text-[10px] font-bold text-[#14110F] border border-[#E7E1D6] shadow-2xs">
                        {item.badge}
                      </span>
                    </div>
                  </div>

                  {/* Card Content & Details */}
                  <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between bg-white">
                    <div>
                      {/* Brand & Stock Alert */}
                      <div className="flex items-center justify-between text-[11px] font-bold mb-1.5">
                        <span className="text-[#D9480F] uppercase tracking-wider font-extrabold">
                          {item.brand}
                        </span>
                        <span className="text-[#81796F]">
                          {item.stockNote}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-[family-name:var(--font-display)] text-xl sm:text-2xl font-extrabold text-[#14110F] tracking-tight group-hover:text-[#D9480F] transition-colors">
                        {item.title}
                      </h3>

                      {/* Subtitle */}
                      <p className="mt-1.5 text-xs sm:text-[13px] text-[#81796F] leading-relaxed line-clamp-2">
                        {item.subtitle}
                      </p>
                    </div>

                    {/* Price and CTA Row */}
                    <div className="mt-5 pt-4 border-t border-[#E7E1D6] flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <strong className="text-lg sm:text-xl font-black text-[#14110F]">
                          ₹{item.ourPrice.toLocaleString('en-IN')}
                        </strong>
                        <span className="text-xs text-[#81796F] line-through font-medium">
                          ₹{item.mrp.toLocaleString('en-IN')}
                        </span>
                      </div>

                      <a
                        href="#shoe-wall"
                        className="inline-flex h-[36px] items-center justify-center gap-1.5 rounded-full bg-[#FAF8F4] border border-[#E7E1D6] px-4 text-xs font-bold text-[#14110F] group-hover:bg-[#D9480F] group-hover:border-[#D9480F] group-hover:text-white transition-all duration-300 shadow-2xs cursor-pointer"
                      >
                        <span>View Pair</span>
                        <ArrowRight size={13} />
                      </a>
                    </div>

                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>

      </div>
    </section>
  )
}
