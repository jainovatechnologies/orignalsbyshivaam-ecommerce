'use client'

import React from 'react'
import Image from 'next/image'
import { CountUp } from './count-up'
import { store } from '@/src/data/originals'
import { ScrollReveal } from './scroll-reveal'

export function OurStory() {
  return (
    <section className="py-20 md:py-28 bg-[#FAF8F4] border-t border-[#E7E1D6]">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-center">
          {/* Owner Image */}
          <ScrollReveal direction="up" delay={0.1} className="lg:col-span-6">
            <div className="relative aspect-square w-full max-w-[500px] mx-auto rounded-[28px] overflow-hidden border border-[#E7E1D6] shadow-xl sm:shadow-2xl bg-[#EDE8DF]">
              <Image
                src="/images/owner-1.jpg"
                alt="Founder of Originals By Shivaam"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={70}
                className="object-cover"
              />
            </div>
          </ScrollReveal>

          {/* Story Text */}
          <ScrollReveal direction="up" delay={0.25} className="lg:col-span-6">
            <p className="text-[11px] font-extrabold tracking-[0.2em] text-[#D9480F] uppercase mb-2">
              OUR STORY
            </p>

            <h2 className="text-[38px] sm:text-[52px] md:text-[64px] font-extrabold tracking-[-0.06em] font-[family-name:var(--font-display)] text-[#14110F] leading-[0.93]">
              Started in{' '}
              <span className="text-[#F15A22]">
                <CountUp target={store.established} duration={1.2} />
              </span>
              .<br />
              <em>Still original.</em>
            </h2>

            <p className="mt-6 text-base sm:text-lg leading-relaxed text-[#14110F]/80">
              Originals By Shivaam was built on a simple conviction: sneakerheads
              and daily runners in Jaipur shouldn’t have to gamble on online
              resellers or settle for mediocre pairs.
            </p>

            <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#14110F]/70">
              Operating out of our Malviya Nagar basement showroom, we curate
              verified performance runners and lifestyle silhouettes. Every pair
              is genuine, every deal is straight, and every customer gets
              personal attention.
            </p>

            <div className="mt-8 flex items-center gap-6 border-t border-[#E7E1D6] pt-6">
              <div>
                <span className="block font-[family-name:var(--font-display)] text-2xl font-extrabold text-[#14110F]">
                  Since{' '}
                  <CountUp target={store.established} duration={1.2} />
                </span>
                <span className="text-xs font-semibold text-[#81796F]">
                  Jaipur Footwear Hub
                </span>
              </div>
              <div className="h-8 w-px bg-[#E7E1D6]" />
              <div>
                <strong className="block text-xl font-extrabold text-[#F15A22]">
                  Real Brands. Real You.
                </strong>
                <span className="text-xs font-semibold text-[#81796F]">
                  Store Tagline
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
