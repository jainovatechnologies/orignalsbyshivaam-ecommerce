'use client'

import React, { useState, useMemo, Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import {
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
  X,
} from 'lucide-react'
import { allProducts, Product } from '@/src/data/originals'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { CartDrawer } from '@/components/cart-drawer'
import { useCart } from '@/components/cart-context'

const CATEGORIES = ['All', 'Footwear', 'Apparel', 'Caps', 'Accessories'] as const

function ShopContent() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get('category') || 'All'

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory)

  const { addToCart } = useCart()

  // Filter Logic: Category + Search (No brand filter)
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      // Category filter
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false
      }
      // Text search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim()
        const matchName = product.name.toLowerCase().includes(query)
        const matchBrand = product.brand.toLowerCase().includes(query)
        const matchCategory = product.category.toLowerCase().includes(query)
        const matchDesc = product.description?.toLowerCase().includes(query) || false
        if (!matchName && !matchBrand && !matchCategory && !matchDesc) {
          return false
        }
      }
      return true
    })
  }, [selectedCategory, searchQuery])

  const resetFilters = () => {
    setSearchQuery('')
    setSelectedCategory('All')
  }

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#14110F] flex flex-col justify-between">
      <Nav />
      <CartDrawer />

      <main className="flex-1">
        {/* Top Control Bar: Breadcrumb + Search + Categories (No Heavy Borders) */}
        <div className="mx-auto max-w-[1780px] px-4 sm:px-8 md:px-12 lg:px-16 2xl:px-20 pt-6 pb-2">

          {/* Breadcrumb & Live Product Counter */}
          <div className="flex items-center justify-between gap-4 mb-4">
            <nav className="flex items-center gap-2 text-xs font-semibold text-[#81796F]">
              <Link href="/" className="hover:text-[#D9480F] transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-[#14110F] font-bold">Shop</span>
            </nav>

            <span className="text-xs font-bold text-[#81796F]">
              Showing <strong className="text-[#14110F]">{filteredProducts.length}</strong> items
            </span>
          </div>

          {/* Search Bar + Category Options with Tactile Hover Effects */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#81796F]"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products by model, brand, colorway..."
                className="w-full h-[42px] pl-10 pr-9 rounded-full bg-white text-xs font-semibold text-[#14110F] placeholder:text-[#81796F] focus:outline-none focus:ring-2 focus:ring-[#D9480F]/20 transition-all shadow-2xs hover:shadow-xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#81796F] hover:text-[#14110F] cursor-pointer"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Category Pills with Tactile Hover States */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`h-[42px] px-5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer shadow-2xs hover:shadow-xs hover:scale-102 active:scale-95 ${isActive
                        ? 'bg-[#14110F] text-white shadow-sm'
                        : 'bg-white text-[#14110F]/80 hover:text-[#D9480F] hover:bg-white'
                      }`}
                  >
                    {cat}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Product Catalog Grid - Direct Display Without Hero */}
        <section className="py-6 sm:py-8">
          <div className="mx-auto max-w-[1780px] px-4 sm:px-8 md:px-12 lg:px-16 2xl:px-20">
            {filteredProducts.length === 0 ? (
              /* Empty Search Fallback */
              <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-3xl p-8 shadow-xs">
                <div className="h-16 w-16 rounded-full bg-[#FAF8F4] flex items-center justify-center text-[#81796F] mb-4">
                  <Search size={24} />
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-black text-[#14110F]">
                  No matching pairs found
                </h3>
                <p className="mt-2 text-sm text-[#81796F] max-w-sm">
                  We couldn't find any products matching "{searchQuery || selectedCategory}".
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-6 btn-primary rounded-full px-6 py-2.5 text-xs font-bold text-white shadow-sm cursor-pointer"
                >
                  Clear Search
                </button>
              </div>
            ) : (
              /* High-Density Boutique Grid */
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-5">
                {filteredProducts.map((product) => {
                  const price = product.ourPrice || 4499
                  const mrp = product.mrp || 8999
                  const discountPercent = Math.round(((mrp - price) / mrp) * 100)

                  return (
                    <div
                      key={product.id}
                      className="group relative flex flex-col justify-between rounded-xl sm:rounded-2xl bg-white p-2.5 sm:p-3 shadow-2xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
                    >
                      <Link
                        href={`/products/${product.id}`}
                        className="flex flex-col text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9480F] rounded-lg"
                      >
                        {/* Media container */}
                        <div className="relative aspect-square w-full overflow-hidden rounded-lg sm:rounded-xl bg-[#F6F4EE]">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                            quality={80}
                            className="object-cover transition-transform duration-500 ease-out group-hover:scale-106"
                          />

                          {/* Quick Category Tag */}
                          <div className="absolute top-2 left-2 z-10">
                            <span className="rounded bg-white/90 backdrop-blur-xs px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-[#14110F] shadow-2xs">
                              {product.category}
                            </span>
                          </div>
                        </div>

                        {/* Info block */}
                        <div className="pt-2.5 pb-0.5 flex flex-col">
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-[10px] font-black uppercase tracking-wider text-[#9C7A52]">
                              {product.brand}
                            </span>
                            {discountPercent > 0 && (
                              <span className="rounded bg-[#D9480F]/10 px-1.5 py-0.5 text-[9px] font-extrabold text-[#D9480F]">
                                {discountPercent}% OFF
                              </span>
                            )}
                          </div>

                          <h3 className="text-xs sm:text-[14px] font-bold text-[#14110F] line-clamp-1 group-hover:text-[#D9480F] transition-colors mt-0.5">
                            {product.name}
                          </h3>

                          {product.description && (
                            <p className="text-[10px] sm:text-[11px] text-[#81796F] line-clamp-1 mt-0.5">
                              {product.description}
                            </p>
                          )}

                          <div className="flex items-baseline gap-1.5 mt-2">
                            <strong className="text-xs sm:text-base font-black text-[#14110F]">
                              ₹{price.toLocaleString('en-IN')}
                            </strong>
                            <span className="text-[10px] sm:text-xs text-[#81796F] line-through font-medium">
                              ₹{mrp.toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>
                      </Link>

                      {/* Add to Bag Action Button */}
                      <div className="mt-2.5 pt-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            addToCart(product, 'UK 8')
                          }}
                          className="w-full flex items-center justify-center gap-1.5 rounded-lg sm:rounded-xl bg-[#D9480F] py-2 px-3 text-xs font-bold text-white shadow-2xs hover:bg-[#C23E0C] active:scale-98 transition-all cursor-pointer"
                          title="Add to Bag"
                        >
                          <ShoppingBag size={13} />
                          <span>Add to Bag · UK 8</span>
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </section>

        {/* Bottom Trust Guarantee Strip (Clean & Borderless) */}
        <section className="bg-white/60 py-10 sm:py-12">
          <div className="mx-auto max-w-[1780px] px-4 sm:px-8 md:px-12 lg:px-16 2xl:px-20">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
              <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white shadow-2xs">
                <div className="h-10 w-10 rounded-full bg-[#D9480F]/10 flex items-center justify-center text-[#D9480F] shrink-0">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#14110F]">
                    100% Verified Authentic
                  </h4>
                  <p className="text-[11px] text-[#81796F] mt-0.5">
                    Physical barcode inspection & showroom testing
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white shadow-2xs">
                <div className="h-10 w-10 rounded-full bg-[#D9480F]/10 flex items-center justify-center text-[#D9480F] shrink-0">
                  <Truck size={20} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#14110F]">
                    Express Insured Dispatch
                  </h4>
                  <p className="text-[11px] text-[#81796F] mt-0.5">
                    24-48 hr fast courier delivery across India
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white shadow-2xs">
                <div className="h-10 w-10 rounded-full bg-[#D9480F]/10 flex items-center justify-center text-[#D9480F] shrink-0">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#14110F]">
                    Jaipur Flagship Showroom
                  </h4>
                  <p className="text-[11px] text-[#81796F] mt-0.5">
                    Try on in person at Malviya Nagar basement
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF8F4] flex items-center justify-center">
          <div className="flex items-center gap-2 font-bold text-sm text-[#14110F]">
            <span className="h-2 w-2 rounded-full bg-[#D9480F] animate-ping" />
            <span>Loading Originals Shop...</span>
          </div>
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  )
}
