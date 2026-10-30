'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { ArrowRight, Menu, Phone, ShoppingBag, X } from 'lucide-react'
import { store } from '@/src/data/originals'
import { ActionButton } from './action-button'
import { useCart } from './cart-context'

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { openCart, totalCount } = useCart()

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-[#E7E1D6] bg-[#FAF8F4]/95 backdrop-blur-md transition-all">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 md:px-8">
          {/* Logo with official logo-originals.png image */}
          <a
            href="#top"
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
          </a>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-7 text-[13px] font-bold md:flex text-[#14110F]">
            <a
              href="#categories"
              className="transition-colors hover:text-[#D9480F] cursor-pointer"
            >
              Categories
            </a>
            <a
              href="#shoe-wall"
              className="transition-colors hover:text-[#D9480F] cursor-pointer"
            >
              Shoe Wall
            </a>
            <a
              href="#inside-store"
              className="transition-colors hover:text-[#D9480F] cursor-pointer"
            >
              Inside Store
            </a>
            <a
              href="#wholesale"
              className="transition-colors hover:text-[#D9480F] cursor-pointer"
            >
              Wholesale
            </a>
            <a
              href="#reviews"
              className="transition-colors hover:text-[#D9480F] cursor-pointer"
            >
              Reviews
            </a>
            <a
              href="#visit"
              className="transition-colors hover:text-[#D9480F] cursor-pointer"
            >
              Visit
            </a>
            <a
              href="#faq"
              className="transition-colors hover:text-[#D9480F] cursor-pointer"
            >
              FAQ
            </a>
            <button
              type="button"
              onClick={openCart}
              className="btn-primary flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <ShoppingBag size={15} />
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
              <a
                href="#categories"
                onClick={() => setMobileOpen(false)}
                className="py-1 cursor-pointer"
              >
                Categories
              </a>
              <a
                href="#shoe-wall"
                onClick={() => setMobileOpen(false)}
                className="py-1 cursor-pointer"
              >
                Shoe Wall
              </a>
              <a
                href="#inside-store"
                onClick={() => setMobileOpen(false)}
                className="py-1 cursor-pointer"
              >
                Inside Store
              </a>
              <a
                href="#wholesale"
                onClick={() => setMobileOpen(false)}
                className="py-1 cursor-pointer"
              >
                Wholesale
              </a>
              <a
                href="#reviews"
                onClick={() => setMobileOpen(false)}
                className="py-1 cursor-pointer"
              >
                Customer Reviews
              </a>
              <a
                href="#visit"
                onClick={() => setMobileOpen(false)}
                className="py-1 cursor-pointer"
              >
                Visit Store
              </a>
              <a
                href="#faq"
                onClick={() => setMobileOpen(false)}
                className="py-1 cursor-pointer"
              >
                FAQ
              </a>
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
