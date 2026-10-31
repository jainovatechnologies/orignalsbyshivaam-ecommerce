'use client'

import React from 'react'
import { ScrollReveal } from './scroll-reveal'

const sizeTable = [
  { uk: 5, us: 6, eu: 38, cm: '23.5' },
  { uk: 6, us: 7, eu: 39, cm: '24.5' },
  { uk: 7, us: 8, eu: 40, cm: '25.5' },
  { uk: 8, us: 9, eu: 41, cm: '26.5' },
  { uk: 9, us: 10, eu: 42, cm: '27.5' },
  { uk: 10, us: 11, eu: 43, cm: '28.5' },
  { uk: 11, us: 12, eu: 44, cm: '29.5' },
  { uk: 12, us: 13, eu: 45, cm: '30.5' },
]

export function SizeGuide() {
  return (
    <section className="py-20 md:py-28 bg-[#FAF8F4] border-t border-[#E7E1D6]">
      <div className="mx-auto max-w-[1780px] px-5 sm:px-8 md:px-12 lg:px-16 2xl:px-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          {/* Left Column */}
          <ScrollReveal direction="up" className="lg:col-span-5">
            <div>
              <p className="text-[11px] font-extrabold tracking-[0.2em] text-[#D9480F] uppercase mb-2">
                SIZE CONVERSION
              </p>
              <h2 className="text-[38px] sm:text-[48px] md:text-[56px] font-extrabold tracking-[-0.055em] font-[family-name:var(--font-display)] text-[#14110F] leading-[0.95]">
                Find your<br />
                <em className="font-normal text-[#F15A22]">right fit.</em>
              </h2>
              <p className="mt-5 text-sm sm:text-base leading-relaxed text-[#14110F]/75">
                Footwear sizes vary subtly between ASICS, HOKA, and Nike. Standard
                Indian sneakerheads typically refer to UK sizing.
              </p>
              <div className="mt-6 rounded-2xl border border-[#E7E1D6] bg-white p-5 shadow-2xs">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#14110F]">
                  Fit Pro-Tip
                </h4>
                <p className="mt-1.5 text-xs leading-relaxed text-[#14110F]/70">
                  Performance runners (ASICS Nimbus/Kayano and HOKA) often fit best
                  true-to-size or half a size up for running socks. If you are
                  between sizes, we recommend sizing up for daily comfort!
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Size Table */}
          <ScrollReveal direction="up" delay={0.2} className="lg:col-span-7">
            <div className="overflow-hidden rounded-2xl border border-[#E7E1D6] shadow-xs">
              <div className="grid grid-cols-4 bg-[#14110F] py-3.5 px-4 text-xs font-extrabold uppercase tracking-widest text-white">
                <div>UK</div>
                <div>US</div>
                <div>EU</div>
                <div>CM</div>
              </div>

              <div className="divide-y divide-[#E7E1D6] bg-white">
                {sizeTable.map((row) => (
                  <div
                    key={row.uk}
                    className="grid grid-cols-4 py-3.5 px-4 text-sm font-semibold text-[#14110F] hover:bg-[#FAF8F4] transition-colors"
                  >
                    <div className="font-bold text-[#D9480F]">UK {row.uk}</div>
                    <div>US {row.us}</div>
                    <div>EU {row.eu}</div>
                    <div className="text-[#81796F]">{row.cm} cm</div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
