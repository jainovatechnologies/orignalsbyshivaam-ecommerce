'use client'

import React from 'react'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { ScrollReveal } from './scroll-reveal'

export function RetailWholesaleSplit() {
  return (
    <section className="py-20 md:py-28 bg-[#FAF8F4]">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {/* Retail Article */}
          <ScrollReveal direction="up" delay={0.1}>
            <article className="group overflow-hidden rounded-[22px] border border-[#E7E1D6] bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg">
              <div className="relative h-[280px] sm:h-[340px] w-full overflow-hidden bg-[#EDE8DF]">
                <Image
                  src="/images/store-wide-1.jpg"
                  alt="Inside the Originals By Shivaam showroom in Malviya Nagar"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={70}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="p-7 sm:p-9">
                <p className="text-[11px] font-extrabold tracking-[0.2em] text-[#D9480F] uppercase mb-2">
                  FOR YOUR ROTATION
                </p>
                <h2 className="text-[36px] sm:text-[46px] font-extrabold tracking-[-0.055em] font-[family-name:var(--font-display)] text-[#14110F] leading-[0.95]">
                  Retail: walk in,<br />
                  <em className="font-normal text-[#F15A22]">try on.</em>
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-[#14110F]/70">
                  Experience the wall in person. Step into our Malviya Nagar
                  basement showroom, compare silhouettes, test your sizing, and walk
                  out with your fresh pair.
                </p>
                <a
                  href="#visit"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-[#14110F] underline underline-offset-4 decoration-[#F15A22] hover:decoration-[#14110F] transition-colors cursor-pointer"
                >
                  <span>Visit the store</span>
                  <ArrowRight size={16} />
                </a>
              </div>
            </article>
          </ScrollReveal>

          {/* Wholesale Article */}
          <ScrollReveal direction="up" delay={0.25}>
            <article className="group overflow-hidden rounded-[22px] border border-[#E7E1D6] bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg">
              <div className="relative h-[280px] sm:h-[340px] w-full overflow-hidden bg-[#EDE8DF]">
                <Image
                  src="/images/boxes-stack-1.jpg"
                  alt="Shoeboxes stacked for wholesale dispatch at Originals By Shivaam"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={70}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="p-7 sm:p-9">
                <p className="text-[11px] font-extrabold tracking-[0.2em] text-[#D9480F] uppercase mb-2">
                  FOR YOUR BUSINESS
                </p>
                <h2 className="text-[36px] sm:text-[46px] font-extrabold tracking-[-0.055em] font-[family-name:var(--font-display)] text-[#14110F] leading-[0.95]">
                  Wholesale:<br />
                  <em className="font-normal text-[#F15A22]">bulk orders.</em>
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-[#14110F]/70">
                  Supply your retail store, boutique, or enterprise roster with
                  steady, verified inventory. Transparent carton deals and fast
                  dispatch across India.
                </p>
                <a
                  href="#wholesale"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-[#14110F] underline underline-offset-4 decoration-[#F15A22] hover:decoration-[#14110F] transition-colors cursor-pointer"
                >
                  <span>Start an enquiry</span>
                  <ArrowRight size={16} />
                </a>
              </div>
            </article>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
