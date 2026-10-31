'use client'

import React, { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Clock,
  Compass,
  CreditCard,
  Heart,
  HelpCircle,
  PackageCheck,
  RefreshCw,
  Share2,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
  X,
  Zap,
} from 'lucide-react'
import { allProducts, Product } from '@/src/data/originals'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { CartDrawer } from '@/components/cart-drawer'
import { useCart } from '@/components/cart-context'

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { addToCart, openCart } = useCart()

  const productId = Number(params.id)
  const product: Product | undefined = useMemo(() => {
    return allProducts.find((p) => p.id === productId) || allProducts[0]
  }, [productId])

  const [selectedSize, setSelectedSize] = useState('UK 8')
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'authenticity'>('details')
  const [showSizeGuide, setShowSizeGuide] = useState(false)
  const [pincode, setPincode] = useState('')
  const [pincodeChecked, setPincodeChecked] = useState(false)
  const [activeImage, setActiveImage] = useState(product.image)

  const mrp = product.mrp || 8999
  const ourPrice = product.ourPrice || 4499
  const savings = mrp - ourPrice
  const discountPercent = Math.round((savings / mrp) * 100)

  // Other footwear products for the infinite similar products carousel
  const similarProducts = useMemo(() => {
    const others = allProducts.filter((p) => p.id !== product.id && p.category === 'Footwear')
    return [...others, ...others, ...others] // 3x for seamless infinite marquee loop
  }, [product.id])

  const handleAdd = () => {
    addToCart(product, selectedSize)
  }

  const handleBuyNow = () => {
    addToCart(product, selectedSize)
    router.push('/checkout')
  }

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault()
    if (pincode.length === 6) {
      setPincodeChecked(true)
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#14110F]">
      <Nav />
      <CartDrawer />

      {/* Main Container */}
      <main className="mx-auto max-w-[1780px] px-5 sm:px-8 md:px-12 lg:px-16 2xl:px-20 py-6 md:py-10 overflow-hidden">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-semibold text-[#81796F]">
          <Link href="/" className="hover:text-[#D9480F] transition-colors">
            Home
          </Link>
          <ChevronRight size={14} />
          <Link href="/#shoe-wall" className="hover:text-[#D9480F] transition-colors">
            Footwear
          </Link>
          <ChevronRight size={14} />
          <span className="text-[#14110F] font-bold truncate max-w-[200px] sm:max-w-none">
            {product.name}
          </span>
        </nav>

        {/* 2-Column Product Showcase */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14 items-start">
          {/* Left Column: Visual Gallery */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Main Showcase Image */}
            <div className="relative aspect-[4/4.5] sm:aspect-[4/3.8] w-full rounded-3xl overflow-hidden bg-[#EDE8DF] border border-[#E7E1D6] shadow-md group">
              <Image
                src={activeImage || product.image}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Thumbnail Selectors */}
            <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar">
              {[product.image, '/images/store-wall-1.jpg', '/images/store-floor-1.jpg'].map((imgSrc, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImage(imgSrc)}
                  className={`relative h-20 w-20 shrink-0 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    activeImage === imgSrc ? 'border-[#D9480F] shadow-sm' : 'border-[#E7E1D6] opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image src={imgSrc} alt="Thumbnail view" fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Buy Box & Product Info */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div>
              {/* Brand & Stock Status */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-[#D9480F]">
                  {product.brand} · AUTHENTIC FOOTWEAR
                </span>
                <span className="text-xs font-bold text-emerald-700 flex items-center gap-1 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                  ● Ready to Ship
                </span>
              </div>

              {/* Title */}
              <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight font-[family-name:var(--font-display)] text-[#14110F] leading-tight">
                {product.name}
              </h1>

              {/* Reviews Rating */}
              <div className="mt-3 flex items-center gap-3">
                <div className="flex items-center gap-1 text-[#D9480F]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill="#D9480F" />
                  ))}
                </div>
                <span className="text-xs font-bold text-[#14110F]">5.0</span>
                <span className="text-xs text-[#81796F]">· 68 Google Verified Reviews</span>
              </div>

              {/* Price Block */}
              <div className="mt-5 rounded-2xl border border-[#E7E1D6] bg-white p-4 shadow-2xs">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-black text-[#14110F]">
                    ₹{ourPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-base text-[#81796F] line-through font-semibold">
                    MRP ₹{mrp.toLocaleString('en-IN')}
                  </span>
                  <span className="rounded-lg bg-orange-50 border border-orange-200 px-2 py-0.5 text-xs font-extrabold text-[#D9480F]">
                    Save ₹{savings.toLocaleString('en-IN')}
                  </span>
                </div>
                <p className="mt-1 text-[11px] font-semibold text-[#81796F]">
                  Inclusive of all taxes · Free Pan-India Express Delivery
                </p>
              </div>

              {/* UK Size Selector */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-black uppercase tracking-wider text-[#14110F]">
                    Select UK Size
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowSizeGuide(true)}
                    className="text-xs font-bold text-[#D9480F] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <HelpCircle size={13} />
                    <span>Size Guide</span>
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11', 'UK 12'].map((size) => {
                    const isSelected = selectedSize === size
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`rounded-xl py-2.5 text-xs font-extrabold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#14110F] text-white shadow-sm ring-2 ring-[#14110F]'
                            : 'border border-[#E7E1D6] bg-white text-[#14110F] hover:border-[#14110F]'
                        }`}
                      >
                        {size}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* E-Commerce Buttons */}
              <div className="mt-6 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={handleAdd}
                  className="btn-primary w-full py-3.5 rounded-xl text-sm font-extrabold uppercase tracking-wider text-white flex items-center justify-center gap-2 shadow-sm cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-transform"
                >
                  <ShoppingBag size={18} />
                  <span>Add to Bag · {selectedSize}</span>
                  <ArrowRight size={16} />
                </button>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="btn-secondary w-full py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <Zap size={16} />
                  <span>Instant Buy · Express Checkout</span>
                </button>
              </div>

              {/* Delivery Pincode Checker */}
              <div className="mt-6 rounded-2xl border border-[#E7E1D6] bg-white p-4">
                <span className="block text-xs font-black uppercase tracking-wider text-[#14110F] mb-2">
                  Check Delivery Date
                </span>
                <form onSubmit={handlePincodeCheck} className="flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6-digit Pincode"
                    value={pincode}
                    onChange={(e) => {
                      setPincode(e.target.value.replace(/\D/g, ''))
                      setPincodeChecked(false)
                    }}
                    className="flex-1 rounded-xl border border-[#E7E1D6] bg-[#FAF8F4] px-3.5 py-2 text-xs font-bold text-[#14110F] focus:outline-none focus:border-[#D9480F]"
                  />
                  <button
                    type="submit"
                    className="rounded-xl bg-[#14110F] px-4 py-2 text-xs font-bold text-white hover:bg-[#D9480F] transition-colors cursor-pointer"
                  >
                    Check
                  </button>
                </form>

                {pincodeChecked && (
                  <div className="mt-3 flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg p-2.5">
                    <Truck size={16} className="shrink-0" />
                    <span>Free Express Delivery available! Delivery in 2 - 3 business days to {pincode}.</span>
                  </div>
                )}
              </div>

              {/* Trust Micro-Perks */}
              <div className="mt-6 grid grid-cols-2 gap-2.5 text-xs font-bold text-[#14110F]">
                <div className="flex items-center gap-2 rounded-xl border border-[#E7E1D6] bg-white p-3">
                  <ShieldCheck size={18} className="text-emerald-600 shrink-0" />
                  <span>100% Genuine Verified</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-[#E7E1D6] bg-white p-3">
                  <Truck size={18} className="text-[#D9480F] shrink-0" />
                  <span>Free Pan-India Courier</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-[#E7E1D6] bg-white p-3">
                  <RefreshCw size={18} className="text-[#D9480F] shrink-0" />
                  <span>7-Day Easy Exchange</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-[#E7E1D6] bg-white p-3">
                  <CreditCard size={18} className="text-emerald-600 shrink-0" />
                  <span>COD & UPI Supported</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Tabs Section */}
        <section className="mt-16 sm:mt-24 border-t border-[#E7E1D6] pt-12">
          {/* Tabs header */}
          <div className="flex border-b border-[#E7E1D6] gap-8">
            <button
              type="button"
              onClick={() => setActiveTab('details')}
              className={`pb-4 text-sm sm:text-base font-extrabold tracking-tight transition-colors cursor-pointer border-b-2 -mb-px ${
                activeTab === 'details' ? 'border-[#D9480F] text-[#D9480F]' : 'border-transparent text-[#81796F] hover:text-[#14110F]'
              }`}
            >
              Description & Performance
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('specs')}
              className={`pb-4 text-sm sm:text-base font-extrabold tracking-tight transition-colors cursor-pointer border-b-2 -mb-px ${
                activeTab === 'specs' ? 'border-[#D9480F] text-[#D9480F]' : 'border-transparent text-[#81796F] hover:text-[#14110F]'
              }`}
            >
              Specifications
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('authenticity')}
              className={`pb-4 text-sm sm:text-base font-extrabold tracking-tight transition-colors cursor-pointer border-b-2 -mb-px ${
                activeTab === 'authenticity' ? 'border-[#D9480F] text-[#D9480F]' : 'border-transparent text-[#81796F] hover:text-[#14110F]'
              }`}
            >
              Authenticity & Verification
            </button>
          </div>

          {/* Tab Content */}
          <div className="py-8">
            {activeTab === 'details' && (
              <div className="max-w-3xl space-y-4 text-sm sm:text-base leading-relaxed text-[#14110F]/80">
                <p>
                  The <strong className="text-[#14110F] font-bold">{product.name}</strong> is sourced directly for
                  serious runners and streetwear purists. Built with signature performance cushioning, responsive energy
                  return, and a structured lockdown fit that moves naturally with your stride.
                </p>
                <p>
                  {product.description ||
                    'Engineered for plush daily wear and athletic resilience. Featuring premium breathability, reinforced lateral support, and high-abrasion traction outsoles designed for maximum durability.'}
                </p>
                <p>
                  Whether you are stepping into our Malviya Nagar showroom or ordering online across India, every single
                  pair is checked by hand for deadstock condition, original factory labels, and perfect structural integrity.
                </p>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="max-w-2xl rounded-2xl border border-[#E7E1D6] bg-white overflow-hidden shadow-2xs">
                <table className="w-full text-left text-xs sm:text-sm">
                  <tbody className="divide-y divide-[#E7E1D6]">
                    <tr className="bg-[#FAF8F4]">
                      <td className="px-4 py-3 font-bold text-[#81796F]">Brand</td>
                      <td className="px-4 py-3 font-extrabold text-[#14110F]">{product.brand}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-bold text-[#81796F]">Model Silhouette</td>
                      <td className="px-4 py-3 font-extrabold text-[#14110F]">{product.name}</td>
                    </tr>
                    <tr className="bg-[#FAF8F4]">
                      <td className="px-4 py-3 font-bold text-[#81796F]">Category</td>
                      <td className="px-4 py-3 font-extrabold text-[#14110F]">{product.category}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-bold text-[#81796F]">Condition</td>
                      <td className="px-4 py-3 font-extrabold text-emerald-700">100% Brand New in Box (Deadstock)</td>
                    </tr>
                    <tr className="bg-[#FAF8F4]">
                      <td className="px-4 py-3 font-bold text-[#81796F]">Closure</td>
                      <td className="px-4 py-3 font-extrabold text-[#14110F]">Lace-up Lockdown</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-bold text-[#81796F]">Fit Recommendation</td>
                      <td className="px-4 py-3 font-extrabold text-[#14110F]">True to size (UK standard sizing)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'authenticity' && (
              <div className="max-w-3xl space-y-4 text-sm sm:text-base leading-relaxed text-[#14110F]/80">
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5">
                  <h4 className="font-bold text-emerald-900 text-sm uppercase tracking-wide flex items-center gap-2">
                    <ShieldCheck size={18} className="text-emerald-600" />
                    <span>The Originals By Shivaam Guarantee</span>
                  </h4>
                  <p className="mt-2 text-xs sm:text-sm text-emerald-800 leading-relaxed">
                    We hate fakes as much as you do. Every pair stocked at our Malviya Nagar flagship is authenticated across
                    12 physical inspection points including SKU code match, internal box stamps, barcode scanning, stitching
                    consistency, and insole glue patterns.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Similar Products Infinite Carousel */}
        <section className="mt-16 sm:mt-24 border-t border-[#E7E1D6] pt-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#D9480F]">
                YOU MIGHT ALSO LIKE
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-[family-name:var(--font-display)] text-[#14110F]">
                Similar <em>Footwear</em>
              </h2>
            </div>
            <Link
              href="/#shoe-wall"
              className="text-xs font-bold text-[#D9480F] hover:underline flex items-center gap-1"
            >
              <span>View All ({allProducts.length})</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          {/* Infinite Running Marquee Carousel for Similar Products */}
          <div className="relative w-full overflow-hidden py-4 -mx-5 px-5 sm:mx-0 sm:px-0">
            {/* Soft Edge Fade Masks */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#FAF8F4] to-transparent z-10"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#FAF8F4] to-transparent z-10"
            />

            {/* Continuous Marquee Track */}
            <div className="flex w-max items-center animate-brand-marquee">
              {similarProducts.map((simProduct, idx) => (
                <div
                  key={`${simProduct.id}-${idx}`}
                  className="w-[220px] sm:w-[260px] px-3 shrink-0"
                >
                  <Link
                    href={`/products/${simProduct.id}`}
                    className="group flex flex-col rounded-2xl border border-[#E7E1D6] bg-white p-3 shadow-2xs hover:shadow-md hover:border-[#14110F] transition-all cursor-pointer"
                  >
                    <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#EDE8DF]">
                      <Image
                        src={simProduct.image}
                        alt={simProduct.name}
                        fill
                        sizes="240px"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className="mt-2.5 flex flex-col gap-0.5">
                      <span className="text-[10px] font-black uppercase text-[#D9480F]">
                        {simProduct.brand}
                      </span>
                      <strong className="text-xs sm:text-sm font-bold text-[#14110F] truncate">
                        {simProduct.name}
                      </strong>
                      <div className="flex items-baseline gap-1.5 mt-0.5">
                        <span className="text-xs font-black text-[#14110F]">
                          ₹{(simProduct.ourPrice || 4499).toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] text-[#81796F] line-through">
                          ₹{(simProduct.mrp || 8999).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Size Guide Modal */}
        {showSizeGuide && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#14110F]/60 p-4 backdrop-blur-xs animate-in fade-in duration-200"
            onClick={() => setShowSizeGuide(false)}
          >
            <div
              className="relative w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl border border-[#E7E1D6]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-[#E7E1D6] pb-4">
                <h3 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-[#14110F]">
                  Shoe Size Conversion Chart
                </h3>
                <button
                  type="button"
                  onClick={() => setShowSizeGuide(false)}
                  className="rounded-full bg-[#FAF8F4] p-1.5 text-[#14110F] hover:bg-[#EDE8DF] cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-center text-xs">
                  <thead>
                    <tr className="bg-[#FAF8F4] border-b border-[#E7E1D6] text-[#81796F] font-black uppercase">
                      <th className="py-2.5 px-2">UK</th>
                      <th className="py-2.5 px-2">US Men</th>
                      <th className="py-2.5 px-2">EU</th>
                      <th className="py-2.5 px-2">Foot Length (CM)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E7E1D6] font-bold text-[#14110F]">
                    <tr><td className="py-2 text-[#D9480F]">UK 6</td><td>7.0</td><td>40.0</td><td>25.0 cm</td></tr>
                    <tr className="bg-[#FAF8F4]"><td className="py-2 text-[#D9480F]">UK 7</td><td>8.0</td><td>41.5</td><td>26.0 cm</td></tr>
                    <tr><td className="py-2 text-[#D9480F]">UK 8</td><td>9.0</td><td>42.5</td><td>27.0 cm</td></tr>
                    <tr className="bg-[#FAF8F4]"><td className="py-2 text-[#D9480F]">UK 9</td><td>10.0</td><td>44.0</td><td>28.0 cm</td></tr>
                    <tr><td className="py-2 text-[#D9480F]">UK 10</td><td>11.0</td><td>45.0</td><td>29.0 cm</td></tr>
                    <tr className="bg-[#FAF8F4]"><td className="py-2 text-[#D9480F]">UK 11</td><td>12.0</td><td>46.0</td><td>30.0 cm</td></tr>
                    <tr><td className="py-2 text-[#D9480F]">UK 12</td><td>13.0</td><td>47.5</td><td>31.0 cm</td></tr>
                  </tbody>
                </table>
              </div>

              <p className="mt-4 text-[11px] text-[#81796F] leading-relaxed">
                Tip: Indian shoe sizes generally correspond 1:1 with standard UK sizing. If you are between sizes, we recommend picking half a size up for running sneakers.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Mobile Sticky Add to Cart Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-between border-t border-[#E7E1D6] bg-white/95 backdrop-blur-md px-5 py-3 md:hidden shadow-lg">
        <div>
          <span className="text-[10px] font-black uppercase text-[#D9480F] block">
            {product.brand} · {selectedSize}
          </span>
          <span className="text-lg font-black text-[#14110F]">
            ₹{ourPrice.toLocaleString('en-IN')}
          </span>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="btn-primary flex items-center gap-2 rounded-xl px-6 py-2.5 text-xs font-extrabold uppercase tracking-wider text-white shadow-xs cursor-pointer"
        >
          <ShoppingBag size={15} />
          <span>Add to Bag</span>
        </button>
      </div>

      <Footer />
    </div>
  )
}

