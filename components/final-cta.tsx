'use client'

import React from 'react'
import { ShoppingBag, MapPin, ArrowRight } from 'lucide-react'
import { ActionButton } from './action-button'
import { ScrollReveal } from './scroll-reveal'

export function FinalCTA() {
  return (
    <section className="py-28 md:py-36 bg-white border-t border-[#E7E1D6] text-center">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <ScrollReveal>
          <p className="text-[11px] font-extrabold tracking-[0.2em] text-[#D9480F] uppercase mb-3">
            SHOP ONLINE · VISIT IN JAIPUR
          </p>

          <h2 className="text-[48px] sm:text-[68px] md:text-[84px] font-extrabold tracking-[-0.065em] font-[family-name:var(--font-display)] text-[#14110F] leading-[0.92]">
            Originals<br />
            <em className="font-normal text-[#F15A22]">Never Fade.</em>
          </h2>

          <p className="mx-auto mt-6 max-w-lg text-base sm:text-lg text-[#14110F]/75">
            Order online with fast insured Pan-India express delivery, or visit our flagship showroom in Malviya Nagar, Jaipur.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <ActionButton
              href="#shoe-wall"
              variant="primary"
              magnetic={true}
              className="shadow-sm px-8"
            >
              <ShoppingBag size={18} />
              <span>Shop the Shoe Wall</span>
              <ArrowRight size={16} />
            </ActionButton>
            <ActionButton
              href="#visit"
              variant="secondary"
              magnetic={true}
              className="px-8"
            >
              <MapPin size={18} />
              <span>Visit Showroom</span>
            </ActionButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
