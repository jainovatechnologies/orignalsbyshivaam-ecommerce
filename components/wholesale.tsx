'use client'

import React from 'react'
import { ArrowRight, Phone, MessageCircle, ShieldCheck, Truck, PackageCheck } from 'lucide-react'
import { store } from '@/src/data/originals'
import { ControlledVideo } from './controlled-video'
import { ScrollReveal } from './scroll-reveal'
import { ActionButton } from './action-button'

const steps = [
  { num: '01', title: 'Enquire', desc: 'Share size & brand requirements' },
  { num: '02', title: 'Size Runs', desc: 'Pick verified pairs & master cartons' },
  { num: '03', title: 'Invoice', desc: 'Lock tier pricing & GST billing' },
  { num: '04', title: 'Dispatch', desc: 'Insured freight dispatch from Jaipur' },
]

export function Wholesale() {
  const whatsappUrl = `https://wa.me/91${store.whatsapp}?text=${encodeURIComponent(
    'Hi Originals By Shivaam, I am interested in B2B wholesale footwear supply. Please share current available lots and price sheet.'
  )}`

  return (
    <section id="wholesale" className="py-16 md:py-24 bg-white text-[#14110F] border-t border-[#E7E1D6]">
      <div className="mx-auto max-w-[1780px] px-5 sm:px-8 md:px-12 lg:px-16 2xl:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: B2B Information & Actions */}
          <ScrollReveal direction="up" delay={0.1} className="lg:col-span-7 flex flex-col justify-center">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 text-[11px] font-extrabold tracking-[0.2em] text-[#D9480F] uppercase mb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D9480F]" />
              <span>04 / B2B WHOLESALE & SUPPLY</span>
            </div>

            {/* Clean Editorial Headline */}
            <h2 className="text-[32px] sm:text-[42px] md:text-[50px] font-extrabold tracking-[-0.05em] font-[family-name:var(--font-display)] text-[#14110F] leading-[1.02]">
              Verified footwear supply.<br />
              <em className="font-normal text-[#F15A22]">Master carton fulfillment.</em>
            </h2>

            <p className="mt-3.5 text-sm sm:text-base text-[#14110F]/75 leading-relaxed max-w-xl">
              Steady, authenticated inventory for retailers and resellers across India.
              Curate your size runs, get transparent tiered batch pricing, and receive fast insured dispatch direct from our Jaipur facility.
            </p>

            {/* 4 Compact Step Chips */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {steps.map((step) => (
                <div
                  key={step.num}
                  className="flex flex-col rounded-xl bg-[#FAF8F4] border border-[#E7E1D6] p-3 transition-all hover:border-[#D9480F]/40 hover:-translate-y-0.5"
                >
                  <span className="text-[11px] font-extrabold text-[#D9480F]">
                    {step.num}
                  </span>
                  <strong className="text-xs sm:text-[13px] font-bold text-[#14110F] mt-0.5">
                    {step.title}
                  </strong>
                  <span className="text-[10px] sm:text-[11px] text-[#81796F] mt-0.5 leading-tight line-clamp-2">
                    {step.desc}
                  </span>
                </div>
              ))}
            </div>

            {/* Action Buttons Row - Equal Width 1 Row on Mobile */}
            <div className="mt-7 grid grid-cols-2 gap-2 sm:flex sm:w-auto sm:items-center sm:gap-3">
              <ActionButton
                href={whatsappUrl}
                variant="primary"
                magnetic={true}
                target="_blank"
                rel="noopener noreferrer"
                containerClassName="w-full sm:w-auto"
                className="w-full px-2.5 sm:px-6 py-2.5 text-xs sm:text-sm font-bold text-center justify-center shadow-sm"
              >
                <MessageCircle size={15} className="shrink-0" />
                <span className="truncate sm:overflow-visible">
                  <span className="sm:hidden">WhatsApp</span>
                  <span className="hidden sm:inline">Wholesale on WhatsApp</span>
                </span>
                <ArrowRight size={14} className="shrink-0 hidden xs:inline sm:inline" />
              </ActionButton>

              <ActionButton
                href={`tel:${store.phone.retail}`}
                variant="secondary"
                magnetic={true}
                containerClassName="w-full sm:w-auto"
                className="w-full px-2.5 sm:px-6 py-2.5 text-xs sm:text-sm font-bold text-center justify-center"
              >
                <Phone size={14} className="shrink-0" />
                <span className="truncate sm:overflow-visible">Call B2B Desk</span>
              </ActionButton>
            </div>

            {/* Trust Badges Strip */}
            <div className="mt-6 pt-4 border-t border-[#E7E1D6] flex flex-wrap items-center gap-4 text-xs font-semibold text-[#81796F]">
              <div className="flex items-center gap-1.5 text-[#14110F]">
                <Truck size={14} className="text-[#D9480F]" />
                <span>Pan-India Freight</span>
              </div>
              <span className="text-[#D9480F]">·</span>
              <div className="flex items-center gap-1.5 text-[#14110F]">
                <ShieldCheck size={14} className="text-[#D9480F]" />
                <span>100% Insured Transit</span>
              </div>
              <span className="text-[#D9480F]">·</span>
              <div className="flex items-center gap-1.5 text-[#14110F]">
                <PackageCheck size={14} className="text-[#D9480F]" />
                <span>Immediate MOQ Sheets</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Clean Video Showcase */}
          <ScrollReveal direction="up" delay={0.2} className="lg:col-span-5 flex flex-col justify-center">
            <div className="relative aspect-[4/3] w-full rounded-[22px] overflow-hidden border border-[#E7E1D6] shadow-md bg-[#EDE8DF] group">
              <ControlledVideo
                src="/videos/wholesale-dispatch.mp4"
                poster="/images/wholesale-dispatch-poster.jpg"
                isHero={false}
                alt="Wholesale dispatch operations at Originals By Shivaam Jaipur"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
              />

              {/* Floating Top Status Badge */}
              <div className="absolute top-3.5 left-3.5 z-20">
                <div className="flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-[#14110F] border border-[#E7E1D6] shadow-2xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D9480F] animate-pulse" />
                  <span>Jaipur Hub · Dispatch Ready</span>
                </div>
              </div>

              {/* Floating Bottom Pill */}
              <div className="absolute bottom-3.5 right-3.5 z-20">
                <div className="flex items-center gap-1.5 rounded-full bg-[#14110F]/85 backdrop-blur-md px-3 py-1 text-[11px] font-semibold text-white border border-white/10 shadow-md">
                  <span>Verified Master Cartons</span>
                </div>
              </div>

              <div className="pointer-events-none absolute inset-0 rounded-[22px] ring-1 ring-inset ring-black/5" />
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  )
}
