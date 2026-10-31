'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  CreditCard,
  Lock,
  QrCode,
  ShieldCheck,
  ShoppingBag,
  Tag,
  Truck,
  Zap,
} from 'lucide-react'
import { useCart } from '@/components/cart-context'
import { allProducts } from '@/src/data/originals'

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart()

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    landmark: '',
    city: 'Jaipur',
    state: 'Rajasthan',
    pincode: '302017',
  })

  // Payment method: 'upi' | 'card' | 'cod' | 'netbanking'
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi')
  const [upiId, setUpiId] = useState('')

  // Promo Code
  const [coupon, setCoupon] = useState('')
  const [discount, setDiscount] = useState(0)
  const [couponApplied, setCouponApplied] = useState(false)
  const [couponError, setCouponError] = useState('')

  // Order State
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderConfirmed, setOrderConfirmed] = useState(false)
  const [orderId, setOrderId] = useState('')

  // Fallback checkout item if cart is empty
  const checkoutItems = items.length > 0 ? items : [
    { product: allProducts[3], size: 'UK 8', quantity: 1 } // ASICS Nimbus
  ]

  const subtotal = items.length > 0 ? totalPrice : (checkoutItems[0].product.ourPrice || 8499)
  const grandTotal = Math.max(0, subtotal - discount)

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault()
    const cleanCoupon = coupon.trim().toUpperCase()
    if (cleanCoupon === 'ORIGINALS500' || cleanCoupon === 'OBS500') {
      setDiscount(500)
      setCouponApplied(true)
      setCouponError('')
    } else if (cleanCoupon === 'WELCOME10') {
      setDiscount(Math.round(subtotal * 0.1))
      setCouponApplied(true)
      setCouponError('')
    } else {
      setCouponError('Invalid coupon. Try ORIGINALS500')
    }
  }

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setOrderId(`OBS-${Math.floor(100000 + Math.random() * 900000)}`)
      setOrderConfirmed(true)
      clearCart()
    }, 1200)
  }

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#14110F]">
      {/* Checkout Minimal Header */}
      <header className="border-b border-[#E7E1D6] bg-white sticky top-0 z-40">
        <div className="mx-auto flex h-16 max-w-[1780px] items-center justify-between px-5 sm:px-8 md:px-12 lg:px-16 2xl:px-20">
          <Link href="/" className="flex items-center gap-2 group cursor-pointer">
            <ArrowLeft size={16} className="text-[#81796F] group-hover:text-[#14110F] transition-colors" />
            <span className="text-xs font-bold text-[#81796F] group-hover:text-[#14110F]">
              Back to Store
            </span>
          </Link>

          <Link href="/" className="flex flex-col text-center">
            <span className="font-[family-name:var(--font-display)] text-lg font-black tracking-tight text-[#14110F]">
              ORIGINALS BY SHIVAAM
            </span>
            <span className="text-[9px] font-bold uppercase tracking-widest text-[#9C7A52]">
              Secure Checkout
            </span>
          </Link>

          <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-[11px] font-bold text-emerald-700">
            <Lock size={12} />
            <span className="hidden sm:inline">256-Bit SSL Encrypted</span>
            <span className="sm:hidden">SSL</span>
          </div>
        </div>
      </header>

      {/* Main Checkout Content */}
      <main className="mx-auto max-w-[1780px] px-5 sm:px-8 md:px-12 lg:px-16 2xl:px-20 py-8 md:py-12">
        {orderConfirmed ? (
          /* Order Confirmation Screen */
          <div className="mx-auto max-w-xl rounded-3xl border border-[#E7E1D6] bg-white p-8 md:p-10 shadow-lg text-center animate-in zoom-in-95 duration-300">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 border border-emerald-300 text-emerald-600 mb-5">
              <CheckCircle2 size={44} />
            </div>

            <span className="text-xs font-black uppercase tracking-widest text-[#D9480F]">
              Order Successfully Placed
            </span>
            <h1 className="mt-1 font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-black text-[#14110F]">
              Thank You for Your Order!
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-[#81796F] max-w-md mx-auto">
              We have received your order. Your sneakers are being inspected and packed at our Malviya Nagar showroom.
            </p>

            <div className="mt-6 rounded-2xl border border-[#E7E1D6] bg-[#FAF8F4] p-4 text-left space-y-2 text-xs">
              <div className="flex justify-between border-b border-[#E7E1D6] pb-2">
                <span className="font-bold text-[#81796F]">Order Reference:</span>
                <span className="font-black text-[#14110F]">{orderId}</span>
              </div>
              <div className="flex justify-between border-b border-[#E7E1D6] pb-2">
                <span className="font-bold text-[#81796F]">Payment Mode:</span>
                <span className="font-extrabold uppercase text-[#14110F]">{paymentMethod}</span>
              </div>
              <div className="flex justify-between border-b border-[#E7E1D6] pb-2">
                <span className="font-bold text-[#81796F]">Estimated Delivery:</span>
                <span className="font-extrabold text-emerald-700">2 - 3 Business Days</span>
              </div>
              <div className="flex justify-between pt-1 font-black text-sm text-[#14110F]">
                <span>Total Paid:</span>
                <span>₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/"
                className="btn-primary flex-1 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <ShoppingBag size={15} />
                <span>Continue Shopping</span>
              </Link>
            </div>
          </div>
        ) : (
          /* Checkout Grid */
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 items-start">
            {/* Left Column: Checkout Form */}
            <form onSubmit={handleSubmitOrder} className="lg:col-span-7 flex flex-col gap-8">
              {/* Step 1: Contact Information */}
              <div className="rounded-3xl border border-[#E7E1D6] bg-white p-6 sm:p-7 shadow-xs">
                <div className="flex items-center gap-2 mb-4">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#14110F] text-xs font-black text-white">
                    1
                  </span>
                  <h2 className="font-[family-name:var(--font-display)] text-lg font-black text-[#14110F]">
                    Contact Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#81796F] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-xl border border-[#E7E1D6] bg-[#FAF8F4] px-3.5 py-2.5 text-xs font-bold text-[#14110F] focus:outline-none focus:border-[#D9480F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#81796F] mb-1">
                      10-Digit Mobile Number (for delivery tracking) *
                    </label>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      placeholder="9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                      className="w-full rounded-xl border border-[#E7E1D6] bg-[#FAF8F4] px-3.5 py-2.5 text-xs font-bold text-[#14110F] focus:outline-none focus:border-[#D9480F]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-[#81796F] mb-1">
                      Email Address (for invoice & dispatch receipt) *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="rahul@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-xl border border-[#E7E1D6] bg-[#FAF8F4] px-3.5 py-2.5 text-xs font-bold text-[#14110F] focus:outline-none focus:border-[#D9480F]"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Shipping Address */}
              <div className="rounded-3xl border border-[#E7E1D6] bg-white p-6 sm:p-7 shadow-xs">
                <div className="flex items-center gap-2 mb-4">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#14110F] text-xs font-black text-white">
                    2
                  </span>
                  <h2 className="font-[family-name:var(--font-display)] text-lg font-black text-[#14110F]">
                    Shipping Address
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-[#81796F] mb-1">
                      House / Flat / Block / Street Address *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. C-350, Basement, Pradhan Marg"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full rounded-xl border border-[#E7E1D6] bg-[#FAF8F4] px-3.5 py-2.5 text-xs font-bold text-[#14110F] focus:outline-none focus:border-[#D9480F]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-[#81796F] mb-1">
                      Landmark / Colony / Sector
                    </label>
                    <input
                      type="text"
                      placeholder="Near Malviya Nagar Main Market"
                      value={formData.landmark}
                      onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                      className="w-full rounded-xl border border-[#E7E1D6] bg-[#FAF8F4] px-3.5 py-2.5 text-xs font-bold text-[#14110F] focus:outline-none focus:border-[#D9480F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#81796F] mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full rounded-xl border border-[#E7E1D6] bg-[#FAF8F4] px-3.5 py-2.5 text-xs font-bold text-[#14110F] focus:outline-none focus:border-[#D9480F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#81796F] mb-1">
                      State *
                    </label>
                    <select
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full rounded-xl border border-[#E7E1D6] bg-[#FAF8F4] px-3.5 py-2.5 text-xs font-bold text-[#14110F] focus:outline-none focus:border-[#D9480F]"
                    >
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Delhi">Delhi NCR</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="Haryana">Haryana</option>
                      <option value="Punjab">Punjab</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Other">Other State</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#81796F] mb-1">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      placeholder="302017"
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, '') })}
                      className="w-full rounded-xl border border-[#E7E1D6] bg-[#FAF8F4] px-3.5 py-2.5 text-xs font-bold text-[#14110F] focus:outline-none focus:border-[#D9480F]"
                    />
                  </div>
                </div>
              </div>

              {/* Step 3: Payment Method */}
              <div className="rounded-3xl border border-[#E7E1D6] bg-white p-6 sm:p-7 shadow-xs">
                <div className="flex items-center gap-2 mb-4">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#14110F] text-xs font-black text-white">
                    3
                  </span>
                  <h2 className="font-[family-name:var(--font-display)] text-lg font-black text-[#14110F]">
                    Payment Mode
                  </h2>
                </div>

                <div className="space-y-3">
                  {/* UPI Option */}
                  <label
                    className={`flex items-start gap-3 rounded-2xl border p-4 cursor-pointer transition-all ${
                      paymentMethod === 'upi'
                        ? 'border-[#D9480F] bg-orange-50/40 shadow-2xs'
                        : 'border-[#E7E1D6] bg-[#FAF8F4] hover:bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                      className="mt-1 accent-[#D9480F]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <strong className="text-sm font-extrabold text-[#14110F]">
                          Instant UPI (GPay, PhonePe, Paytm, QR)
                        </strong>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                          Fastest
                        </span>
                      </div>
                      <p className="text-xs text-[#81796F] mt-0.5">
                        Scan QR code or pay instantly with any UPI app on phone.
                      </p>

                      {paymentMethod === 'upi' && (
                        <div className="mt-3 pt-3 border-t border-[#E7E1D6]">
                          <input
                            type="text"
                            placeholder="Enter UPI ID (e.g. mobile@upi)"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            className="w-full rounded-xl border border-[#E7E1D6] bg-white px-3.5 py-2 text-xs font-bold text-[#14110F] focus:outline-none focus:border-[#D9480F]"
                          />
                        </div>
                      )}
                    </div>
                  </label>

                  {/* Card Option */}
                  <label
                    className={`flex items-start gap-3 rounded-2xl border p-4 cursor-pointer transition-all ${
                      paymentMethod === 'card'
                        ? 'border-[#D9480F] bg-orange-50/40 shadow-2xs'
                        : 'border-[#E7E1D6] bg-[#FAF8F4] hover:bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="mt-1 accent-[#D9480F]"
                    />
                    <div className="flex-1">
                      <strong className="text-sm font-extrabold text-[#14110F]">
                        Credit / Debit Card (Visa, MasterCard, RuPay)
                      </strong>
                      <p className="text-xs text-[#81796F] mt-0.5">
                        Secure checkout powered by RBI authorized payment gateway.
                      </p>
                    </div>
                  </label>

                  {/* COD Option */}
                  <label
                    className={`flex items-start gap-3 rounded-2xl border p-4 cursor-pointer transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-[#D9480F] bg-orange-50/40 shadow-2xs'
                        : 'border-[#E7E1D6] bg-[#FAF8F4] hover:bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="mt-1 accent-[#D9480F]"
                    />
                    <div className="flex-1">
                      <strong className="text-sm font-extrabold text-[#14110F]">
                        Cash on Delivery (COD)
                      </strong>
                      <p className="text-xs text-[#81796F] mt-0.5">
                        Pay cash or UPI at your doorstep upon receiving the parcel.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full py-4 rounded-2xl text-sm font-black uppercase tracking-wider text-white flex items-center justify-center gap-2 shadow-md cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-transform disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Processing Secure Order...</span>
                ) : (
                  <>
                    <Lock size={16} />
                    <span>Pay & Complete Order · ₹{grandTotal.toLocaleString('en-IN')}</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-5 flex flex-col gap-6 sticky top-24">
              <div className="rounded-3xl border border-[#E7E1D6] bg-white p-6 sm:p-7 shadow-xs space-y-5">
                <h2 className="font-[family-name:var(--font-display)] text-lg font-black text-[#14110F] pb-3 border-b border-[#E7E1D6]">
                  Order Summary ({checkoutItems.reduce((acc, i) => acc + i.quantity, 0)} Items)
                </h2>

                {/* Items List */}
                <div className="space-y-3">
                  {checkoutItems.map((item, idx) => {
                    const price = item.product.ourPrice || 4499
                    return (
                      <div
                        key={`${item.product.id}-${item.size}-${idx}`}
                        className="flex items-center gap-3 rounded-2xl border border-[#E7E1D6] bg-[#FAF8F4] p-3"
                      >
                        <div className="relative h-16 w-16 shrink-0 rounded-xl overflow-hidden bg-[#EDE8DF] border border-[#E7E1D6]">
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] font-black uppercase text-[#D9480F]">
                            {item.product.brand}
                          </span>
                          <h4 className="font-extrabold text-xs text-[#14110F] truncate">
                            {item.product.name}
                          </h4>
                          <div className="flex items-center justify-between mt-1 text-xs font-bold text-[#81796F]">
                            <span>Size: {item.size} · Qty: {item.quantity}</span>
                            <span className="text-[#14110F] font-black">
                              ₹{(price * item.quantity).toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Coupon Code Input */}
                <form onSubmit={handleApplyCoupon} className="border-t border-[#E7E1D6] pt-4">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag size={14} className="absolute left-3.5 top-3 text-[#81796F]" />
                      <input
                        type="text"
                        placeholder="Discount code (e.g. ORIGINALS500)"
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                        className="w-full rounded-xl border border-[#E7E1D6] bg-[#FAF8F4] pl-9 pr-3 py-2 text-xs font-bold text-[#14110F] focus:outline-none focus:border-[#D9480F] uppercase"
                      />
                    </div>
                    <button
                      type="submit"
                      className="rounded-xl bg-[#14110F] px-4 py-2 text-xs font-bold text-white hover:bg-[#D9480F] transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {couponApplied && (
                    <p className="mt-2 text-xs font-bold text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 size={13} />
                      <span>Coupon applied: ₹{discount} saved!</span>
                    </p>
                  )}
                  {couponError && (
                    <p className="mt-2 text-xs font-bold text-red-500">
                      {couponError}
                    </p>
                  )}
                </form>

                {/* Breakdown */}
                <div className="border-t border-[#E7E1D6] pt-4 space-y-2 text-xs font-bold text-[#81796F]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-[#14110F]">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Pan-India Express Shipping</span>
                    <span className="text-emerald-700 font-black">FREE</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Promo Discount</span>
                      <span>-₹{discount.toLocaleString('en-IN')}</span>
                    </div>
                  )}

                  <div className="flex justify-between border-t border-[#E7E1D6] pt-3 text-base font-black text-[#14110F]">
                    <span>Total Amount</span>
                    <span>₹{grandTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Security badges */}
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-3.5 space-y-1.5 text-xs text-emerald-800">
                  <div className="flex items-center gap-2 font-bold text-emerald-900">
                    <ShieldCheck size={16} className="text-emerald-700 shrink-0" />
                    <span>Originals By Shivaam Quality Assurance</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-emerald-700">
                    Your pairs are inspected for deadstock authenticity before sealing into waterproof courier packaging.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

