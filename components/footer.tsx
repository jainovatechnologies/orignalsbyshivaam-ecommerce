'use client'

import React from 'react'
import Image from 'next/image'
import { ArrowRight, Compass, Phone, ShoppingBag, ShieldCheck } from 'lucide-react'
import { store } from '@/src/data/originals'
import { InstagramIcon } from './icons'
import { useCart } from './cart-context'

export function Footer() {
  const { openCart, totalCount } = useCart()
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Originals By Shivaam C-350 Basement Pradhan Marg Block C Malviya Nagar Jaipur 302017'
  )}`

  return (
    <>
      <footer className="border-t border-[#E7E1D6] bg-[#F4EFE6] pt-16 pb-28 md:pb-16 text-[#14110F]">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8 items-start">
            {/* Logo Column */}
            <div className="md:col-span-5">
              <a
                href="#top"
                className="flex items-center gap-3 cursor-pointer group"
              >
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-[#E7E1D6] bg-white shadow-xs group-hover:scale-105 transition-transform">
                  <Image
                    src="/images/logo-originals.png"
                    alt="ORIGINALS BY SHIVAAM Logo"
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col leading-[0.85] tracking-[-0.06em] font-[family-name:var(--font-display)] font-extrabold text-2xl text-[#14110F]">
                  <span>ORIGINALS</span>
                  <span className="font-[family-name:var(--font-body)] text-[10px] font-bold tracking-[0.2em] text-[#9C7A52] mt-1">
                    BY SHIVAAM
                  </span>
                </div>
              </a>
              <p className="mt-4 text-xs sm:text-sm text-[#81796F] max-w-sm leading-relaxed">
                Independent premium footwear retailer and wholesale supplier based in
                Malviya Nagar, Jaipur. 100% verified authentic sneakers with express insured Pan-India shipping.
              </p>
            </div>

            {/* Quick Links Column */}
            <div className="md:col-span-3 flex flex-col gap-3 text-sm font-bold">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#D9480F] mb-1">
                E-Commerce & Support
              </span>
              <button
                type="button"
                onClick={openCart}
                className="flex items-center gap-2 hover:text-[#D9480F] transition-colors cursor-pointer text-left font-bold"
              >
                <ShoppingBag size={16} className="text-[#D9480F]" />
                <span>Shopping Bag ({totalCount})</span>
              </button>
              <a
                href={store.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#D9480F] transition-colors cursor-pointer"
              >
                <InstagramIcon size={16} />
                <span>Instagram (8K+)</span>
              </a>
              <a
                href={`tel:${store.phone.retail}`}
                className="flex items-center gap-2 hover:text-[#D9480F] transition-colors cursor-pointer"
              >
                <Phone size={16} />
                <span>Support: {store.phone.retail}</span>
              </a>
            </div>

            {/* Address Column */}
            <div className="md:col-span-4">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#D9480F] mb-2 block">
                Flagship Showroom
              </span>
              <address className="not-italic text-sm text-[#14110F]/80 leading-relaxed max-w-xs">
                {store.address}
              </address>
              <p className="mt-3 text-xs text-[#81796F] font-medium">
                {store.hours}
              </p>
            </div>
          </div>

          {/* Bottom Disclaimers */}
          <div className="mt-12 pt-8 border-t border-[#E7E1D6] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#81796F]">
            <p>
              Brand names belong to their owners. Originals By Shivaam is an
              independent retailer and wholesaler.
            </p>
            <p className="shrink-0 font-medium">
              Website by Jainova Technologies
            </p>
          </div>
        </div>
      </footer>

      {/* Mobile Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t border-[#E7E1D6] bg-white/95 backdrop-blur-md px-4 py-2.5 md:hidden pb-[calc(10px+env(safe-area-inset-bottom))]">
        <button
          type="button"
          onClick={openCart}
          aria-label="Shopping Bag"
          className="flex min-h-[44px] min-w-[44px] flex-col items-center justify-center gap-1 text-[10px] font-bold text-[#14110F] cursor-pointer"
        >
          <div className="relative">
            <ShoppingBag size={20} className="text-[#D9480F]" />
            {totalCount > 0 && (
              <span className="absolute -top-1 -right-2 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#14110F] text-[8px] font-extrabold text-white">
                {totalCount}
              </span>
            )}
          </div>
          <span>Bag</span>
        </button>
        <a
          href="#shoe-wall"
          aria-label="Shoes"
          className="flex min-h-[44px] min-w-[44px] flex-col items-center justify-center gap-1 text-[10px] font-bold text-[#14110F] cursor-pointer"
        >
          <ArrowRight size={20} className="text-[#D9480F]" />
          <span>Shop</span>
        </a>
        <a
          href={`tel:${store.phone.retail}`}
          aria-label="Call"
          className="flex min-h-[44px] min-w-[44px] flex-col items-center justify-center gap-1 text-[10px] font-bold text-[#14110F] cursor-pointer"
        >
          <Phone size={20} className="text-[#D9480F]" />
          <span>Call</span>
        </a>
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Directions"
          className="flex min-h-[44px] min-w-[44px] flex-col items-center justify-center gap-1 text-[10px] font-bold text-[#14110F] cursor-pointer"
        >
          <Compass size={20} className="text-[#D9480F]" />
          <span>Map</span>
        </a>
      </div>
    </>
  )
}
