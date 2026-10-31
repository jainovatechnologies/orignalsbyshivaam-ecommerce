'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Menu, Phone, ShoppingBag, X } from 'lucide-react'
import { store } from '@/src/data/originals'
import { ActionButton } from './action-button'
import { useCart } from './cart-context'

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { openCart, totalCount } = useCart()

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#FAF8F4]/90 backdrop-blur-md transition-all">
        <div className="mx-auto flex h-[76px] max-w-[1780px] items-center justify-between px-5 sm:px-8 md:px-12 lg:px-16 2xl:px-20">
          {/* Logo with official logo-originals.png image - Redirects to Homepage */}
          <Link
            href="/"
            className="flex items-center gap-3 focus-visible:outline-none group cursor-pointer"
          >
            <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-[#E7E1D6] bg-white shadow-xs group-hover:scale-105 transition-transform">
              <Image
                src="/images/logo-originals.png"
                alt="ORIGINALS BY SHIVAAM Logo"
                fill
                sizes="44px"
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col leading-[0.85] tracking-[-0.06em] font-[family-name:var(--font-display)] font-extrabold text-[20px] text-[#14110F]">
              <span>ORIGINALS</span>
              <span className="font-[family-name:var(--font-body)] text-[9px] font-bold tracking-[0.2em] text-[#9C7A52] mt-1">
                BY SHIVAAM
              </span>
            </div>
          </Link>

          {/* Desktop Nav with Underline Active & Hover Effects (No Fill) */}
          <nav className="hidden items-center gap-6 lg:gap-7 text-[13px] font-bold md:flex text-[#14110F]">
            <Link
              href="/shop"
              className="group relative py-1.5 text-[13px] font-black text-[#D9480F] transition-colors cursor-pointer"
            >
              <span className="relative z-10 transition-transform duration-200 group-hover:-translate-y-0.5 inline-block">
                Shop All
              </span>
              {/* Active Underline Indicator */}
              <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#D9480F] rounded-full" />
            </Link>

            {[
              { href: '/#categories', label: 'Categories' },
              { href: '/#shoe-wall', label: 'Shoe Wall' },
              { href: '/#inside-store', label: 'Inside Store' },
              { href: '/#wholesale', label: 'Wholesale' },
              { href: '/#reviews', label: 'Reviews' },
              { href: '/#visit', label: 'Visit' },
              { href: '/#faq', label: 'FAQ' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative py-1.5 text-[13px] font-bold text-[#14110F]/75 hover:text-[#14110F] transition-colors cursor-pointer"
              >
                <span className="relative z-10 inline-block transition-transform duration-200 group-hover:-translate-y-0.5">
                  {item.label}
                </span>
                {/* Hover Underline Indicator */}
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D9480F] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center" />
              </Link>
            ))}

            <button
              type="button"
              onClick={openCart}
              className="btn-primary ml-1 flex items-center gap-2 rounded-full px-5 py-2 text-xs font-bold text-white shadow-xs hover:shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <ShoppingBag size={14} />
              <span>Bag ({totalCount})</span>
            </button>
          </nav>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2.5 md:hidden">
            <button
              type="button"
              onClick={openCart}
              className="btn-primary flex h-11 items-center gap-1.5 rounded-xl px-3 text-xs font-bold text-white shadow-xs cursor-pointer"
            >
              <ShoppingBag size={15} />
              <span>{totalCount}</span>
            </button>

            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#E7E1D6] bg-white text-[#14110F] cursor-pointer"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="border-b border-[#E7E1D6] bg-[#FAF8F4] px-6 py-6 md:hidden animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-4 text-base font-bold text-[#14110F]">
              <Link
                href="/shop"
                onClick={() => setMobileOpen(false)}
                className="py-2.5 px-1 text-[#D9480F] font-black cursor-pointer flex items-center justify-between border-b-2 border-[#D9480F]"
              >
                <span>Shop All Catalog</span>
                <span className="text-xs text-[#D9480F] font-bold">Active</span>
              </Link>
              {[
                { href: '/#categories', label: 'Categories' },
                { href: '/#shoe-wall', label: 'Shoe Wall' },
                { href: '/#inside-store', label: 'Inside Store' },
                { href: '/#wholesale', label: 'Wholesale' },
                { href: '/#reviews', label: 'Customer Reviews' },
                { href: '/#visit', label: 'Visit Store' },
                { href: '/#faq', label: 'FAQ' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-2 px-1 text-[#14110F] hover:text-[#D9480F] transition-all cursor-pointer font-bold border-b border-transparent hover:border-[#D9480F]/40"
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-2 flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false)
                    openCart()
                  }}
                  className="btn-primary w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-white flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <ShoppingBag size={17} />
                  <span>View Bag ({totalCount})</span>
                </button>
                <ActionButton
                  href={`tel:${store.phone.retail}`}
                  variant="secondary"
                  className="w-full text-center"
                >
                  <Phone size={17} />
                  <span>Call Store ({store.phone.retail})</span>
                </ActionButton>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  )
}
