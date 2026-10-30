'use client'

import React from 'react'
import { brandLogos } from '@/src/data/originals'

// Repeat the 6 brand logos 4 times to ensure seamless infinite looping across any screen width
const marqueeBrands = [
  ...brandLogos,
  ...brandLogos,
  ...brandLogos,
  ...brandLogos,
]

export function BrandStrip() {
  return (
    <section
      aria-label="Stocked Footwear Brands"
      className="relative w-full overflow-hidden border-y border-[#E7E1D6] bg-[#F4EFE6] py-6 sm:py-7"
    >
      {/* Soft gradient edge masks for smooth enter/exit */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 md:w-36 bg-gradient-to-r from-[#F4EFE6] via-[#F4EFE6]/90 to-transparent z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 md:w-36 bg-gradient-to-l from-[#F4EFE6] via-[#F4EFE6]/90 to-transparent z-10"
      />

      {/* Infinite continuous scrolling marquee track */}
      <div className="flex w-max items-center animate-brand-marquee">
        {marqueeBrands.map((brand, index) => (
          <div
            key={`${brand.name}-${index}`}
            className="group flex items-center justify-center px-7 sm:px-11 md:px-14 shrink-0 transition-transform duration-200 hover:scale-105"
            title={brand.name}
          >
            <img
              src={brand.logo}
              alt={`${brand.name} official logo`}
              loading="lazy"
              className={`${brand.className || 'h-7 sm:h-8 md:h-9'} w-auto max-w-[130px] sm:max-w-[150px] object-contain opacity-85 group-hover:opacity-100 transition-opacity duration-200`}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
