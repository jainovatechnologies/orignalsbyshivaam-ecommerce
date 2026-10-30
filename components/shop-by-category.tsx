'use client'

import React from 'react'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { ScrollReveal } from './scroll-reveal'

interface CategoryItem {
  id: string
  number: string
  title: string
  subtitle: string
  image: string
  alt: string
  actionLabel: string
}

const categories: CategoryItem[] = [
  {
    id: 'Footwear',
    number: '01',
    title: 'Footwear',
    subtitle: 'ASICS, HOKA, Nike & iconic rotation silhouettes',
    image: '/images/store-wall-1.jpg',
    alt: 'Footwear wall on wooden shelves at Originals By Shivaam',
    actionLabel: 'Explore Footwear',
  },
  {
    id: 'Apparel',
    number: '02',
    title: 'Apparel',
    subtitle: 'Streetwear layers, tees & everyday essentials',
    image: '/images/store-wide-1.jpg',
    alt: 'Streetwear apparel and mannequins inside the store',
    actionLabel: 'Explore Apparel',
  },
  {
    id: 'Accessories',
    number: '03',
    title: 'Accessories',
    subtitle: 'Handcrafted leather goods, wallets & gear',
    image: '/images/product-9.jpg',
    alt: 'Handcrafted leather wallet and accessories',
    actionLabel: 'Explore Accessories',
  },
]

export function ShopByCategory() {
  return (
    <section id="categories" className="py-20 md:py-28 bg-white border-t border-[#E7E1D6]">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
            <div>
              <p className="text-[11px] font-extrabold tracking-[0.2em] text-[#D9480F] uppercase mb-2">
                01 / CATEGORIES
              </p>
              <h2 className="text-[38px] sm:text-[48px] md:text-[56px] font-extrabold tracking-[-0.055em] font-[family-name:var(--font-display)] text-[#14110F] leading-[0.95]">
                Shop by <em>category.</em>
              </h2>
            </div>
            <p className="text-sm text-[#14110F]/70 max-w-sm">
              From performance runners to street-ready layers. Explore what is on
              the floor in Jaipur.
            </p>
          </div>
        </ScrollReveal>

        {/* 3-Column Clean Light Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {categories.map((cat, index) => (
            <ScrollReveal
              key={cat.id}
              direction="up"
              delay={index * 0.12}
              className="h-[460px] sm:h-[490px]"
            >
              <a
                href="#shoe-wall"
                className="group relative flex h-full w-full flex-col overflow-hidden rounded-[26px] border border-[#E7E1D6] bg-white shadow-xs hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
              >
                {/* Photo Container (top 60% of card) */}
                <div className="relative h-[62%] w-full overflow-hidden bg-[#EDE8DF]">
                  <Image
                    src={cat.image}
                    alt={cat.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    quality={75}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                  />

                  {/* Clean Light Floating Tag */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center rounded-full bg-white/95 backdrop-blur-md px-3.5 py-1 text-[11px] font-bold text-[#14110F] border border-[#E7E1D6] shadow-2xs tracking-wider">
                      {cat.number} · {cat.id}
                    </span>
                  </div>
                </div>

                {/* Info Container (bottom 38% of card) */}
                <div className="flex flex-1 flex-col justify-between p-6 bg-white">
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-extrabold text-[#14110F] tracking-tight group-hover:text-[#D9480F] transition-colors">
                      {cat.title}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-[#81796F] leading-relaxed line-clamp-2">
                      {cat.subtitle}
                    </p>
                  </div>

                  {/* Action Link Row */}
                  <div className="mt-4 flex items-center justify-between pt-3 border-t border-[#E7E1D6]">
                    <span className="text-xs font-bold text-[#D9480F] tracking-wide">
                      {cat.actionLabel}
                    </span>
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FAF8F4] border border-[#E7E1D6] text-[#14110F] group-hover:bg-[#D9480F] group-hover:border-[#D9480F] group-hover:text-white transition-all duration-300 shadow-2xs">
                      <ArrowUpRight size={16} />
                    </div>
                  </div>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
