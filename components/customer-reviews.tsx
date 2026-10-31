'use client'

import React from 'react'
import { CheckCircle2, Star, ThumbsUp } from 'lucide-react'
import { reviews, store } from '@/src/data/originals'
import { CountUp } from './count-up'
import { ScrollReveal } from './scroll-reveal'

export function CustomerReviews() {
  // Split reviews into two distinct rows and duplicate each 4x for continuous infinite loop
  const rowOne = [reviews[0], reviews[1], reviews[2]]
  const rowTwo = [reviews[3], reviews[4], reviews[5]]

  const marqueeRowOne = [...rowOne, ...rowOne, ...rowOne, ...rowOne]
  const marqueeRowTwo = [...rowTwo, ...rowTwo, ...rowTwo, ...rowTwo]

  return (
    <section id="reviews" className="py-20 md:py-28 bg-white border-t border-[#E7E1D6] overflow-hidden">
      <div className="mx-auto max-w-[1780px] px-5 sm:px-8 md:px-12 lg:px-16 2xl:px-20 mb-12">
        {/* Header with Google Rating and Count-Up */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-[11px] font-extrabold tracking-[0.2em] text-[#D9480F] uppercase mb-2">
                VERIFIED GOOGLE REVIEWS
              </p>
              <h2 className="text-[38px] sm:text-[48px] md:text-[56px] font-extrabold tracking-[-0.055em] font-[family-name:var(--font-display)] text-[#14110F] leading-[0.95]">
                What customers <em>say.</em>
              </h2>
            </div>

            {/* Rating Badge with count-up for 5.0 */}
            <div className="flex items-center gap-4 rounded-2xl border border-[#E7E1D6] bg-[#FAF8F4] px-6 py-4 shadow-sm self-start md:self-auto">
              <div className="flex flex-col items-center">
                <span className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-extrabold text-[#14110F] leading-none">
                  <CountUp target={store.rating.score} decimals={1} duration={1.2} />
                </span>
                <div className="flex gap-1 mt-1 text-[#F15A22]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="#F15A22" stroke="none" />
                  ))}
                </div>
              </div>
              <div className="h-10 w-px bg-[#E7E1D6]" />
              <div>
                <p className="text-xs font-black text-[#14110F]">
                  {store.rating.platform} Rating
                </p>
                <p className="text-[11px] text-[#81796F] font-semibold mt-0.5">
                  Based on {store.rating.reviewCount} verified buyer reviews
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* 2-Row Modern Clean Marquee Carousel */}
      <div className="relative w-full space-y-6">
        {/* Left & Right Soft Edge Gradient Fades */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-36 md:w-52 bg-gradient-to-r from-white via-white/80 to-transparent z-10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-36 md:w-52 bg-gradient-to-l from-white via-white/80 to-transparent z-10"
        />

        {/* Row 1: Forward Moving Infinite Marquee (Clean Modern Cards) */}
        <div className="flex w-max items-center animate-brand-marquee">
          {marqueeRowOne.map((review, i) => (
            <div
              key={`row1-${review.id}-${i}`}
              className="w-[310px] sm:w-[380px] px-3 shrink-0"
            >
              <div className="flex flex-col justify-between h-[180px] rounded-2xl border border-[#E7E1D6] bg-white p-5 sm:p-6 shadow-sm hover:shadow-xl hover:border-[#C8A27A] hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex gap-1 text-[#F15A22]">
                      {[...Array(5)].map((_, starIdx) => (
                        <Star key={starIdx} size={14} fill="#F15A22" stroke="none" />
                      ))}
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 size={11} />
                      <span>Verified</span>
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm font-semibold text-[#14110F] leading-snug line-clamp-3">
                    “{review.quote}”
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-[#E7E1D6] pt-3 mt-2">
                  <span className="font-extrabold text-xs text-[#14110F]">
                    {review.author}
                  </span>
                  <span className="text-[10px] font-bold text-[#D9480F] bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-md">
                    {review.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Row 2: Reverse Moving Infinite Marquee (Clean Modern Cards) */}
        <div className="flex w-max items-center animate-marquee-reverse">
          {marqueeRowTwo.map((review, i) => (
            <div
              key={`row2-${review.id}-${i}`}
              className="w-[310px] sm:w-[380px] px-3 shrink-0"
            >
              <div className="flex flex-col justify-between h-[180px] rounded-2xl border border-[#E7E1D6] bg-white p-5 sm:p-6 shadow-sm hover:shadow-xl hover:border-[#C8A27A] hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex gap-1 text-[#F15A22]">
                      {[...Array(5)].map((_, starIdx) => (
                        <Star key={starIdx} size={14} fill="#F15A22" stroke="none" />
                      ))}
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 size={11} />
                      <span>Verified</span>
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm font-semibold text-[#14110F] leading-snug line-clamp-3">
                    “{review.quote}”
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-[#E7E1D6] pt-3 mt-2">
                  <span className="font-extrabold text-xs text-[#14110F]">
                    {review.author}
                  </span>
                  <span className="text-[10px] font-bold text-[#D9480F] bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-md">
                    {review.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
