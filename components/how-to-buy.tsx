'use client'

import React from 'react'
import { m, useReducedMotion } from 'framer-motion'
import { CreditCard, PackageCheck, Search, ShoppingBag } from 'lucide-react'
import { ScrollReveal } from './scroll-reveal'

interface Step {
  num: string
  title: string
  description: string
  icon: React.ReactNode
}

const steps: Step[] = [
  {
    num: '01',
    title: 'Choose your pair',
    description:
      'Browse our live inventory on the shoe wall, filter by your favorite brand, and pick your exact UK size.',
    icon: <Search size={20} className="text-[#D9480F]" />,
  },
  {
    num: '02',
    title: 'Add to Bag',
    description:
      'Click "Add to Bag" to instantly reserve your pair with real-time in-store inventory verification.',
    icon: <ShoppingBag size={20} className="text-[#D9480F]" />,
  },
  {
    num: '03',
    title: 'Instant Secure Checkout',
    description:
      'Checkout smoothly in seconds with all major payment modes: UPI, Debit/Credit cards, NetBanking, or COD.',
    icon: <CreditCard size={20} className="text-[#D9480F]" />,
  },
  {
    num: '04',
    title: 'Doorstep Express Delivery',
    description:
      'Dispatched within 24 hours in tamper-proof packaging with live SMS/email tracking straight to your home.',
    icon: <PackageCheck size={20} className="text-[#D9480F]" />,
  },
]

export function HowToBuy() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="how-to-buy" className="py-20 md:py-28 bg-[#FAF8F4] border-t border-[#E7E1D6]">
      <div className="mx-auto max-w-[1780px] px-5 sm:px-8 md:px-12 lg:px-16 2xl:px-20">
        <ScrollReveal>
          <div className="max-w-2xl mb-16">
            <p className="text-[11px] font-extrabold tracking-[0.2em] text-[#D9480F] uppercase mb-2">
              SIMPLE E-COMMERCE PROCESS
            </p>
            <h2 className="text-[38px] sm:text-[48px] md:text-[56px] font-extrabold tracking-[-0.055em] font-[family-name:var(--font-display)] text-[#14110F] leading-[0.95]">
              How to <em>order.</em>
            </h2>
            <p className="mt-4 text-base text-[#14110F]/75">
              Four easy steps from choosing your silhouette to unboxing at your doorstep.
            </p>
          </div>
        </ScrollReveal>

        {/* Desktop: Horizontal layout with drawing line */}
        <div className="relative">
          {/* Continuous connecting horizontal line on desktop */}
          <div className="hidden lg:block absolute top-[28px] left-[5%] right-[5%] h-[2px] bg-[#E7E1D6]">
            <m.div
              initial={{ scaleX: shouldReduceMotion ? 1 : 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
              style={{ transformOrigin: 'left' }}
              className="h-full w-full bg-[#D9480F]"
            />
          </div>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {steps.map((step, index) => {
              return (
                <ScrollReveal
                  key={step.num}
                  direction="up"
                  delay={shouldReduceMotion ? 0 : index * 0.12}
                  className="relative flex flex-col"
                >
                  {/* Step Header with animated line & number */}
                  <div className="flex items-center gap-4 lg:flex-col lg:items-start">
                    <m.div
                      initial={{ scale: shouldReduceMotion ? 1 : 0.8, opacity: shouldReduceMotion ? 1 : 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{
                        duration: 0.5,
                        delay: shouldReduceMotion ? 0 : index * 0.15,
                        ease: 'easeOut',
                      }}
                      className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#14110F] bg-white font-[family-name:var(--font-display)] text-lg font-extrabold text-[#14110F] shadow-sm"
                    >
                      <span>{step.num}</span>
                    </m.div>

                    {/* Mobile vertical line connecting steps */}
                    <div className="block lg:hidden flex-1 h-[2px] bg-[#E7E1D6]">
                      <m.div
                        initial={{ scaleX: shouldReduceMotion ? 1 : 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        style={{ transformOrigin: 'left' }}
                        className="h-full w-full bg-[#D9480F]"
                      />
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className="mt-5 lg:mt-7 flex flex-col">
                    <div className="mb-2 flex items-center gap-2">
                      {step.icon}
                      <h3 className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-[#14110F]">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-sm leading-relaxed text-[#14110F]/70">
                      {step.description}
                    </p>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
