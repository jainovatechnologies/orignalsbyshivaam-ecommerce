'use client'

import React from 'react'
import Image from 'next/image'
import { arrivals } from '@/src/data/originals'
import { ScrollReveal } from './scroll-reveal'

export function NewIn() {
  return (
    <section className="py-20 md:py-28 bg-[#F4EFE6] border-t border-[#E7E1D6]">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <ScrollReveal>
          <div className="max-w-2xl mb-12">
            <p className="text-[11px] font-extrabold tracking-[0.2em] text-[#D9480F] uppercase mb-2">
              03 / NEW IN
            </p>
            <h2 className="text-[38px] sm:text-[48px] md:text-[56px] font-extrabold tracking-[-0.055em] font-[family-name:var(--font-display)] text-[#14110F] leading-[0.95]">
              Fresh on<br />
              <em className="font-normal text-[#F15A22]">the wall.</em>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {arrivals.map((item, index) => (
            <ScrollReveal
              key={item.id}
              direction="up"
              delay={index * 0.15}
            >
              <div className="group overflow-hidden rounded-2xl border border-[#E7E1D6] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#EDE8DF]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    quality={70}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-[#14110F]/80 backdrop-blur-xs px-3 py-1 text-[10px] font-bold tracking-widest uppercase text-white">
                    0{index + 1} · {item.date}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-[#14110F]">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-[#81796F] font-medium">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
