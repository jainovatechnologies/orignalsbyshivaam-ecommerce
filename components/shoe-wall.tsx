'use client'

import React, { useState, useMemo, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ShoppingBag, X, Zap, ShieldCheck, ExternalLink } from 'lucide-react'
import { m, useReducedMotion } from 'framer-motion'
import {
  brands,
  products,
  SHOW_SAMPLE_PRICES,
  Product,
} from '@/src/data/originals'
import { ScrollReveal } from './scroll-reveal'
import { useCart } from './cart-context'
import { ActionButton } from './action-button'

export function ShoeWall() {
  const [selectedBrand, setSelectedBrand] = useState<string>('All')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [selectedSize, setSelectedSize] = useState<string>('UK 8')
  const shouldReduceMotion = useReducedMotion()
  const { addToCart } = useCart()

  // Prevent background scrolling when product drawer is open
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedProduct])

  const filterOptions = [
    'All',
    'ASICS',
    'HOKA',
    'Nike',
    'adidas',
    'New Balance',
    'Skechers',
    'Apparel',
    'Caps',
    'Accessories',
  ]

  const filteredProducts = useMemo(() => {
    if (selectedBrand === 'All') return products
    return products.filter((p) => p.brand === selectedBrand || p.category === selectedBrand)
  }, [selectedBrand])

  // Limit to exactly 2 rows on the homepage (10 items on 5-col grid)
  const displayedProducts = useMemo(() => {
    return filteredProducts.slice(0, 10)
  }, [filteredProducts])

  const handleQuickAdd = (product: Product, size: string) => {
    addToCart(product, size)
    setSelectedProduct(null)
  }

  return (
    <section id="shoe-wall" className="py-20 md:py-28 bg-white relative border-t border-[#E7E1D6]">
      <div className="mx-auto max-w-[1780px] px-5 sm:px-8 md:px-12 lg:px-16 2xl:px-20">
        {/* Section Heading & View All Button */}
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-[11px] font-extrabold tracking-[0.2em] text-[#D9480F] uppercase mb-2">
                02 / THE SHOE WALL
              </p>
              <h2 className="text-[38px] sm:text-[52px] md:text-[68px] font-extrabold tracking-[-0.06em] font-[family-name:var(--font-display)] text-[#14110F] leading-[0.93]">
                Pick your next<br />
                <em className="font-normal text-[#F15A22]">everyday icon.</em>
              </h2>
              <p className="mt-5 text-base sm:text-lg text-[#14110F]/80">
                Select your UK size and order online with fast Pan-India express delivery.
              </p>
            </div>

            <div className="shrink-0 pb-1">
              <ActionButton
                href={selectedBrand === 'All' ? '/shop' : `/shop?brand=${encodeURIComponent(selectedBrand)}`}
                variant="primary"
                magnetic={true}
                className="shadow-sm"
              >
                <ShoppingBag size={15} />
                <span>View All ({filteredProducts.length})</span>
                <ArrowRight size={15} />
              </ActionButton>
            </div>
          </div>
        </ScrollReveal>

        {/* Filter Row */}
        <ScrollReveal delay={0.1}>
          <div className="mt-10 mb-8 flex gap-2.5 overflow-x-auto pb-2 no-scrollbar">
            {filterOptions.map((brand) => (
              <button
                key={brand}
                type="button"
                onClick={() => setSelectedBrand(brand)}
                className={`rounded-full px-5 py-2.5 text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  selectedBrand === brand
                    ? 'bg-[#14110F] text-white shadow-sm'
                    : 'border border-[#E7E1D6] bg-white text-[#14110F] hover:bg-[#FAF8F4]'
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Product Grid - Compact 5-col / 4-col sleek layout (Showing 2 rows) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {displayedProducts.map((product, idx) => {
            const price = product.ourPrice || 4499
            const mrp = product.mrp || 8999
            const discountPercent = Math.round(((mrp - price) / mrp) * 100)
            return (
              <ScrollReveal
                key={product.id}
                direction="up"
                delay={shouldReduceMotion ? 0 : Math.min((idx % 5) * 0.06, 0.25)}
                className="flex flex-col"
              >
                <div className="group relative flex flex-col justify-between rounded-xl sm:rounded-2xl border border-[#E7E1D6] bg-white p-2.5 sm:p-3 shadow-2xs hover:shadow-lg hover:border-[#D9480F]/40 hover:-translate-y-1 transition-all duration-300">
                  <Link
                    href={`/products/${product.id}`}
                    className="flex flex-col text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9480F] rounded-lg"
                  >
                    {/* Media container - Clean & clear image */}
                    <div className="relative aspect-square w-full overflow-hidden rounded-lg sm:rounded-xl bg-[#F6F4EE]">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                        quality={75}
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-106"
                      />
                    </div>

                    {/* Info block */}
                    <div className="pt-2.5 pb-0.5 flex flex-col">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[9px] font-black uppercase tracking-wider text-[#9C7A52]">
                          {product.brand}
                        </span>
                        {discountPercent > 0 && (
                          <span className="rounded bg-[#D9480F]/10 border border-[#D9480F]/20 px-1.5 py-0.5 text-[9px] font-extrabold text-[#D9480F]">
                            {discountPercent}% OFF
                          </span>
                        )}
                      </div>
                      <h3 className="text-xs sm:text-[13px] font-bold text-[#14110F] line-clamp-1 group-hover:text-[#D9480F] transition-colors mt-0.5">
                        {product.name}
                      </h3>

                      <div className="flex items-baseline gap-1.5 mt-1.5">
                        <strong className="text-xs sm:text-sm font-black text-[#14110F]">
                          ₹{price.toLocaleString('en-IN')}
                        </strong>
                        <span className="text-[10px] sm:text-[11px] text-[#81796F] line-through font-medium">
                          ₹{mrp.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </Link>

                  {/* Add to Bag Action */}
                  <div className="mt-2 pt-2 border-t border-[#E7E1D6]/70">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        addToCart(product, 'UK 8')
                      }}
                      className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-[#D9480F] py-1.5 sm:py-2 px-2 text-[11px] font-bold text-white shadow-2xs hover:bg-[#C23E0C] active:scale-98 transition-all cursor-pointer"
                      title="Add to Bag"
                    >
                      <ShoppingBag size={13} />
                      <span>Add to Bag · UK 8</span>
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>

        {/* Quick View / Product Detail Drawer */}
        {selectedProduct && (
          <div
            className="fixed inset-0 z-50 flex justify-end bg-[#14110F]/65 backdrop-blur-xs animate-in fade-in duration-200"
            onClick={() => setSelectedProduct(null)}
          >
            <aside
              className="relative h-full w-full max-w-[440px] bg-[#FAF8F4] border-l border-[#E7E1D6] p-5 sm:p-6 shadow-2xl flex flex-col justify-between overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col gap-3">
                {/* Header & Close */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black uppercase tracking-widest text-[#D9480F]">
                    {selectedProduct.brand} · 100% Authentic
                  </span>
                  <button
                    type="button"
                    aria-label="Close details"
                    onClick={() => setSelectedProduct(null)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white border border-[#E7E1D6] text-[#14110F] hover:bg-[#EDE8DF] transition-colors cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Prominent High-Quality Image - Properly framed with object-cover */}
                <div className="relative h-52 sm:h-60 w-full rounded-2xl overflow-hidden bg-[#EDE8DF] border border-[#E7E1D6] shrink-0 shadow-2xs">
                  <Image
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 440px"
                    className="object-cover object-center"
                    priority
                  />
                </div>

                {/* Title & Pricing */}
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-[family-name:var(--font-display)] text-xl sm:text-2xl font-black tracking-tight text-[#14110F] line-clamp-1">
                      {selectedProduct.name}
                    </h3>
                    <Link
                      href={`/products/${selectedProduct.id}`}
                      className="text-xs font-bold text-[#D9480F] hover:underline shrink-0 flex items-center gap-1"
                    >
                      <span>Full Specs</span>
                      <ExternalLink size={12} />
                    </Link>
                  </div>

                  <div className="mt-2 rounded-xl border border-[#E7E1D6] bg-white p-2.5 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-[#81796F] line-through block">
                        MRP ₹{(selectedProduct.mrp || 8999).toLocaleString('en-IN')}
                      </span>
                      <span className="text-xl font-black text-[#14110F]">
                        ₹{(selectedProduct.ourPrice || 4499).toLocaleString('en-IN')}
                      </span>
                    </div>
                    <span className="rounded-md bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[11px] font-bold text-emerald-700">
                      Pan-India Free Shipping
                    </span>
                  </div>
                </div>

                {/* Size Selector */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#14110F]">
                      Select UK Size
                    </span>
                    <Link
                      href={`/products/${selectedProduct.id}`}
                      className="text-[11px] font-bold text-[#D9480F] hover:underline"
                    >
                      Size Guide
                    </Link>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5">
                    {['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11', 'UK 12'].map((sizeNum) => {
                      const isActive = selectedSize === sizeNum
                      return (
                        <button
                          key={sizeNum}
                          type="button"
                          onClick={() => setSelectedSize(sizeNum)}
                          className={`rounded-lg py-2 text-xs font-bold transition-all cursor-pointer ${
                            isActive
                              ? 'bg-[#14110F] text-white shadow-xs'
                              : 'border border-[#E7E1D6] bg-white text-[#14110F] hover:border-[#14110F]'
                          }`}
                        >
                          {sizeNum}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-2 gap-2 text-[10px] font-bold text-[#81796F]">
                  <div className="flex items-center gap-1.5 rounded-lg bg-white border border-[#E7E1D6] p-1.5">
                    <ShieldCheck size={14} className="text-emerald-600 shrink-0" />
                    <span>100% Original Verified</span>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-lg bg-white border border-[#E7E1D6] p-1.5">
                    <Zap size={14} className="text-[#D9480F] shrink-0" />
                    <span>24h Express Dispatch</span>
                  </div>
                </div>
              </div>

              {/* Drawer Action Button - compact footer */}
              <div className="pt-3 border-t border-[#E7E1D6] space-y-2 shrink-0">
                <button
                  type="button"
                  onClick={() => handleQuickAdd(selectedProduct, selectedSize)}
                  className="btn-primary w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-white flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <ShoppingBag size={15} />
                  <span>Add to Bag · {selectedSize}</span>
                  <ArrowRight size={14} />
                </button>
                <Link
                  href={`/products/${selectedProduct.id}`}
                  onClick={() => setSelectedProduct(null)}
                  className="block text-center text-xs font-bold text-[#14110F] hover:text-[#D9480F] transition-colors py-1"
                >
                  View Full Product Details & Specs →
                </Link>
              </div>
            </aside>
          </div>
        )}
      </div>
    </section>
  )
}
