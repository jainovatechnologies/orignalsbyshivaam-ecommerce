'use client'

import React from 'react'
import { ArrowRight, Phone, Truck } from 'lucide-react'
import { m, useReducedMotion } from 'framer-motion'
import { store } from '@/src/data/originals'
import { ActionButton } from './action-button'
import { ControlledVideo } from './controlled-video'
import { ScrollReveal } from './scroll-reveal'

const steps = [
  { num: '01', title: 'Enquire', desc: 'Share your retail requirements' },
  { num: '02', title: 'Choose', desc: 'Pick brand lots and size runs' },
  { num: '03', title: 'Confirm', desc: 'Lock batch pricing and invoice' },
  { num: '04', title: 'Dispatch', desc: 'Express insured freight dispatch' },
]

export function Wholesale() {
  const shouldReduceMotion = useReducedMotion()

  const boxVariants = {
    hidden: {
      y: shouldReduceMotion ? 0 : -50,
      opacity: shouldReduceMotion ? 1 : 0,
    },
    visible: (index: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        delay: shouldReduceMotion ? 0 : index * 0.12,
        ease: [0.34, 1.56, 0.64, 1],
      },
    }),
  }

  return (
    <section id="wholesale" className="py-20 md:py-28 bg-white text-[#14110F] border-t border-[#E7E1D6]">
      <div className="mx-auto max-w-[1780px] px-5 sm:px-8 md:px-12 lg:px-16 2xl:px-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14 items-center">
          {/* Left Column: Copy & Steps in clean Light Theme */}
          <ScrollReveal direction="up" delay={0.1} className="lg:col-span-6">
            <div>
              <p className="text-[11px] font-extrabold tracking-[0.2em] text-[#D9480F] uppercase mb-2">
                04 / WHOLESALE
              </p>
              <h2 className="text-[38px] sm:text-[52px] md:text-[66px] font-extrabold tracking-[-0.06em] font-[family-name:var(--font-display)] text-[#14110F] leading-[0.93]">
                Build your<br />
                <em className="font-normal text-[#F15A22]">box stack.</em>
              </h2>
              <p className="mt-5 text-base sm:text-lg text-[#14110F]/80 leading-relaxed">
                From first enquiry to dispatch, we keep it simple. Verified
                footwear inventory, master carton fulfillment, and steady supply
                for boutiques and resellers across India.
              </p>

              {/* Wholesale Steps as clean light cards */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-[#E7E1D6] pt-6">
                {steps.map((step) => (
                  <div
                    key={step.num}
                    className="flex flex-col rounded-xl bg-[#FAF8F4] border border-[#E7E1D6] p-3.5 shadow-2xs"
                  >
                    <span className="text-xs font-bold text-[#D9480F]">
                      {step.num}
                    </span>
                    <strong className="text-sm font-bold text-[#14110F] mt-1">
                      {step.title}
                    </strong>
                    <span className="text-[11px] text-[#81796F] mt-0.5 leading-tight">
                      {step.desc}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <ActionButton
                  href={`tel:${store.phone.retail}`}
                  variant="primary"
                  magnetic={true}
                  className="shadow-sm"
                >
                  <Phone size={16} />
                  <span>Call B2B Wholesale Desk</span>
                  <ArrowRight size={16} />
                </ActionButton>
                <span className="text-xs text-[#81796F] font-medium">
                  MOQ & tier price sheets provided immediately
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Video & Staggered Falling Boxes in Light Theme */}
          <ScrollReveal direction="up" delay={0.25} className="lg:col-span-6 flex flex-col gap-6">
            {/* Wholesale Video in light container */}
            <div className="relative aspect-video w-full rounded-[22px] overflow-hidden border border-[#E7E1D6] shadow-xl sm:shadow-2xl bg-[#EDE8DF]">
              <ControlledVideo
                src="/videos/wholesale-dispatch.mp4"
                poster="/images/wholesale-dispatch-poster.jpg"
                isHero={false}
                alt="Wholesale dispatch operations at Originals By Shivaam"
              />
              <div className="absolute top-3 left-3 rounded-full bg-white/95 backdrop-blur-md px-3 py-1 text-[10px] font-bold tracking-wider uppercase text-[#14110F] flex items-center gap-1.5 border border-[#E7E1D6] shadow-xs">
                <Truck size={12} className="text-[#D9480F]" />
                <span>Daily Dispatch Hub</span>
              </div>
            </div>

            {/* Boxes dropping in with stagger on scroll (light container) */}
            <div className="rounded-[22px] bg-[#FAF8F4] border border-[#E7E1D6] p-6 flex flex-col items-center shadow-xs">
              <p className="text-xs font-extrabold uppercase tracking-widest text-[#81796F] mb-4">
                Carton Stacking Ready
              </p>

              <div className="flex flex-col items-center -space-y-2">
                {[0, 1, 2, 3].map((index) => (
                  <m.div
                    key={index}
                    custom={index}
                    variants={boxVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    className="flex h-14 w-[220px] sm:w-[260px] items-center justify-between rounded-lg border border-[#C74412] bg-[#D9480F] px-4 font-[family-name:var(--font-display)] font-extrabold text-white shadow-md"
                    style={{
                      transform: `rotate(${index % 2 === 0 ? '-2deg' : '2deg'})`,
                    }}
                  >
                    <span className="text-sm tracking-tight">ORIGINALS</span>
                    <span className="text-[9px] font-bold tracking-widest text-white/90">
                      BY SHIVAAM
                    </span>
                  </m.div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
