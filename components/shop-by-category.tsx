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
  href: string
}

const categories: CategoryItem[] = [
  {
    id: 'Footwear',
    number: '01',
    title: 'Footwear',
    subtitle: 'ASICS, HOKA, Nike & iconic silhouettes curated for daily rotation',
    image: '/images/store-wall-1.jpg',
    alt: 'Footwear wall on wooden shelves at Originals By Shivaam',
    actionLabel: 'Explore Shoes',
    href: '#shoe-wall',
  },
  {
    id: 'Apparel',
    number: '02',
    title: 'Apparel',
    subtitle: 'Streetwear layers, heavyweight tees & everyday essentials for your fit',
    image: '/images/store-wide-1.jpg',
    alt: 'Streetwear apparel and mannequins inside the store',
    actionLabel: 'Explore Apparel',
    href: '#shoe-wall',
  },
  {
    id: 'Caps',
    number: '03',
    title: 'Caps & Hats',
    subtitle: 'Washed vintage dad caps, snapbacks & structured street headwear',
    image: '/images/category-caps.jpg',
    alt: 'Streetwear caps and headwear collection',
    actionLabel: 'Explore Caps',
    href: '#shoe-wall',
  },
  {
    id: 'Accessories',
    number: '04',
    title: 'Accessories',
    subtitle: 'Handcrafted genuine leather wallets, utility gear & daily carry',
    image: '/images/product-9.jpg',
    alt: 'Handcrafted leather wallet and accessories',
    actionLabel: 'Explore Gear',
    href: '#shoe-wall',
  },
]

export function ShopByCategory() {
  return (
    <section id="categories" className="py-12 md:py-16 bg-white border-t border-[#E7E1D6]">
      <div className="mx-auto max-w-[1780px] px-5 sm:px-8 md:px-12 lg:px-16 2xl:px-20">
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 md:mb-10 gap-3">
            <div>
              <p className="text-[11px] font-extrabold tracking-[0.2em] text-[#D9480F] uppercase mb-1.5">
                01 / CATEGORIES
              </p>
              <h2 className="text-[30px] sm:text-[38px] md:text-[44px] font-extrabold tracking-[-0.05em] font-[family-name:var(--font-display)] text-[#14110F] leading-[1.02]">
                Shop by <em>category.</em>
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#14110F]/70 max-w-xs sm:text-right">
              Performance runners to street headwear. Everything on our Jaipur showroom floor.
            </p>
          </div>
        </ScrollReveal>

        {/* 4-Column Compact Light Card Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
          {categories.map((cat, index) => (
            <ScrollReveal
              key={cat.id}
              direction="up"
              delay={index * 0.08}
              className="h-[360px] sm:h-[390px] md:h-[410px]"
            >
              <a
                href={cat.href}
                className="group relative flex h-full w-full flex-col overflow-hidden rounded-[22px] border border-[#E7E1D6] bg-white shadow-2xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
              >
                {/* Photo Container */}
                <div className="relative h-[62%] sm:h-[64%] w-full overflow-hidden bg-[#EDE8DF]">
                  <Image
                    src={cat.image}
                    alt={cat.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 380px"
                    quality={75}
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-106"
                  />

                  {/* Clean Light Floating Tag */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="inline-flex items-center rounded-full bg-white/95 backdrop-blur-md px-3 py-0.5 text-[10px] font-bold text-[#14110F] border border-[#E7E1D6] shadow-2xs tracking-wider">
                      {cat.number} · {cat.id}
                    </span>
                  </div>
                </div>

                {/* Info Container */}
                <div className="flex flex-1 flex-col justify-between p-4 sm:p-4.5 bg-white">
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-lg sm:text-xl font-extrabold text-[#14110F] tracking-tight group-hover:text-[#D9480F] transition-colors">
                      {cat.title}
                    </h3>
                    <p className="mt-1 text-xs sm:text-[13px] text-[#81796F] leading-relaxed line-clamp-2 min-h-[2.5rem]">
                      {cat.subtitle}
                    </p>
                  </div>

                  {/* Action Link Row */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#E7E1D6]">
                    <span className="text-[11px] font-bold text-[#D9480F] tracking-wide">
                      {cat.actionLabel}
                    </span>
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FAF8F4] border border-[#E7E1D6] text-[#14110F] group-hover:bg-[#D9480F] group-hover:border-[#D9480F] group-hover:text-white transition-all duration-300 shadow-2xs">
                      <ArrowUpRight size={13} />
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
