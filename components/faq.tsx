'use client'

import React, { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { faqs } from '@/src/data/originals'
import { ScrollReveal } from './scroll-reveal'

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 md:py-28 bg-[#FAF8F4] border-t border-[#E7E1D6]">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Heading */}
          <ScrollReveal direction="up" delay={0.1} className="lg:col-span-5">
            <div>
              <p className="text-[11px] font-extrabold tracking-[0.2em] text-[#D9480F] uppercase mb-2">
                06 / QUICK ANSWERS
              </p>
              <h2 className="text-[38px] sm:text-[48px] md:text-[56px] font-extrabold tracking-[-0.055em] font-[family-name:var(--font-display)] text-[#14110F] leading-[0.95]">
                Before you<br />
                <em className="font-normal text-[#F15A22]">drop in.</em>
              </h2>
              <p className="mt-5 text-sm sm:text-base leading-relaxed text-[#14110F]/70">
                Clear questions on authenticity, trial visits, wholesale bulk
                supply, and nationwide courier dispatches.
              </p>
            </div>
          </ScrollReveal>

          {/* Right Column: Accordion List */}
          <ScrollReveal direction="up" delay={0.25} className="lg:col-span-7">
            <div className="border-t border-[#14110F] divide-y divide-[#E7E1D6]">
              {faqs.map(([question, answer], index) => {
                const isOpen = openIndex === index
                return (
                  <div key={question} className="py-2">
                    <button
                      type="button"
                      onClick={() => toggle(index)}
                      aria-expanded={isOpen}
                      className="flex w-full min-h-[64px] items-center justify-between text-left font-[family-name:var(--font-display)] text-lg font-bold text-[#14110F] transition-colors hover:text-[#D9480F] cursor-pointer"
                    >
                      <span className="pr-4">{question}</span>
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FAF8F4] text-[#14110F]">
                        {isOpen ? <X size={18} /> : <Plus size={18} />}
                      </div>
                    </button>

                    <div
                      className={`grid transition-all duration-300 ease-in-out ${
                        isOpen ? 'grid-rows-[1fr] opacity-100 pb-5' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="text-sm leading-relaxed text-[#81796F]">
                          {answer}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
