'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react'
import { useCart } from './cart-context'

export function CartDrawer() {
  const { items, isOpen, closeCart, removeFromCart, updateQuantity, totalPrice, totalCount, clearCart } = useCart()
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const router = useRouter()

  // Prevent background scrolling and propagation when cart drawer is open
  useEffect(() => {
    if (!isOpen) return

    const originalHtmlOverflow = document.documentElement.style.overflow
    const originalBodyOverflow = document.body.style.overflow
    const originalTouchAction = document.body.style.touchAction

    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    document.body.style.touchAction = 'none'

    const handleWheelOrTouch = (e: WheelEvent | TouchEvent) => {
      const panel = document.getElementById('cart-drawer-panel')
      // If event happened outside drawer panel, block it completely
      if (!panel || !panel.contains(e.target as Node)) {
        e.preventDefault()
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeCart()
      }
    }

    window.addEventListener('wheel', handleWheelOrTouch, { passive: false })
    window.addEventListener('touchmove', handleWheelOrTouch, { passive: false })
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.documentElement.style.overflow = originalHtmlOverflow
      document.body.style.overflow = originalBodyOverflow
      document.body.style.touchAction = originalTouchAction
      window.removeEventListener('wheel', handleWheelOrTouch)
      window.removeEventListener('touchmove', handleWheelOrTouch)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, closeCart])

  if (!isOpen) return null

  const handleProceedToCheckout = () => {
    closeCart()
    router.push('/checkout')
  }

  const handleResetOrder = () => {
    clearCart()
    setOrderPlaced(false)
    closeCart()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#14110F]/65 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={closeCart}
      onWheel={(e) => {
        e.preventDefault()
        e.stopPropagation()
      }}
      onTouchMove={(e) => {
        e.preventDefault()
        e.stopPropagation()
      }}
    >
      <aside
        id="cart-drawer-panel"
        className="relative h-full w-full max-w-[420px] bg-[#FAF8F4] border-l border-[#E7E1D6] shadow-2xl flex flex-col justify-between overflow-hidden overscroll-contain"
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-[#E7E1D6] px-5 py-3.5 bg-white shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} className="text-[#D9480F]" />
            <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-[#14110F] tracking-tight">
              Your Bag ({totalCount})
            </h2>
          </div>
          <button
            type="button"
            aria-label="Close cart"
            onClick={closeCart}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FAF8F4] border border-[#E7E1D6] text-[#14110F] hover:bg-[#EDE8DF] transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Free Shipping Pill */}
        <div className="bg-[#FAF8F4] border-b border-[#E7E1D6] px-5 py-2 text-center shrink-0">
          <p className="text-[11px] font-bold text-[#D9480F]">
            🎉 Free Insured Pan-India Express Delivery Unlocked!
          </p>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col justify-between p-4 overflow-hidden">
          {orderPlaced ? (
            <div className="flex flex-col items-center justify-center text-center my-auto px-4 py-6">
              <div className="h-14 w-14 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mb-3">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-2xl font-black text-[#14110F]">
                Order Confirmed!
              </h3>
              <p className="text-xs text-[#14110F]/70 mt-1.5 max-w-[280px]">
                Thank you! Your verified sneakers are being packed and dispatched via Express Courier from Malviya Nagar.
              </p>
              <div className="mt-4 rounded-xl bg-white border border-[#E7E1D6] p-3 text-left w-full text-xs space-y-1">
                <div className="flex justify-between font-bold text-[#14110F]">
                  <span>Order Total:</span>
                  <span>₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-[#81796F]">
                  <span>Estimated Delivery:</span>
                  <span className="font-semibold text-[#14110F]">2 - 3 Days</span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleResetOrder}
                className="btn-primary mt-5 w-full py-2.5 rounded-xl text-xs font-bold text-white shadow-xs cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center my-auto p-6">
              <div className="h-14 w-14 rounded-full bg-white border border-[#E7E1D6] flex items-center justify-center text-[#81796F] mb-3">
                <ShoppingBag size={24} />
              </div>
              <p className="font-[family-name:var(--font-display)] text-lg font-bold text-[#14110F]">
                Your bag is empty
              </p>
              <p className="text-xs text-[#81796F] mt-1">
                Explore our Shoe Wall and add your size to bag!
              </p>
              <button
                type="button"
                onClick={closeCart}
                className="btn-primary mt-4 px-6 py-2 rounded-xl text-xs font-bold text-white shadow-xs cursor-pointer"
              >
                Browse Shoe Wall
              </button>
            </div>
          ) : (
            <>
              {/* Product list with smooth internal scroll */}
              <div className="space-y-2.5 overflow-y-auto max-h-[calc(100vh-330px)] pr-1 overscroll-contain">
                {items.map((item) => {
                  const price = item.product.ourPrice || item.product.mrp || 4999
                  return (
                    <div
                      key={`${item.product.id}-${item.size}`}
                      className="flex items-center gap-3 rounded-xl border border-[#E7E1D6] bg-white p-2.5 shadow-2xs"
                    >
                      {/* Short compact thumbnail */}
                      <div className="relative h-14 w-14 shrink-0 rounded-lg overflow-hidden bg-[#EBE5DA] border border-[#E7E1D6]">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <div>
                            <span className="text-[10px] font-black uppercase text-[#D9480F] tracking-wide block">
                              {item.product.brand}
                            </span>
                            <h4 className="font-bold text-xs text-[#14110F] truncate max-w-[170px]">
                              {item.product.name}
                            </h4>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.product.id, item.size)}
                            className="text-[#81796F] hover:text-red-500 transition-colors p-1"
                            title="Remove item"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-1">
                          <span className="inline-block rounded-md bg-[#FAF8F4] border border-[#E7E1D6] px-1.5 py-0.5 text-[10px] font-bold text-[#14110F]">
                            {item.size}
                          </span>

                          <div className="flex items-center gap-2">
                            {/* Quantity controls */}
                            <div className="flex items-center rounded-lg border border-[#E7E1D6] bg-[#FAF8F4] px-1 py-0.5">
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.product.id, item.size, -1)}
                                className="text-[#14110F] hover:text-[#D9480F] p-0.5 cursor-pointer"
                              >
                                <Minus size={11} />
                              </button>
                              <span className="px-1.5 text-[11px] font-bold text-[#14110F]">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.product.id, item.size, 1)}
                                className="text-[#14110F] hover:text-[#D9480F] p-0.5 cursor-pointer"
                              >
                                <Plus size={11} />
                              </button>
                            </div>

                            <span className="text-xs font-black text-[#14110F]">
                              ₹{(price * item.quantity).toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Bottom Order Summary & Checkout - fixed, no scroll */}
              <div className="rounded-2xl border border-[#E7E1D6] bg-white p-3.5 shadow-xs space-y-2.5 mt-2 shrink-0">
                <div className="space-y-1 text-xs text-[#81796F]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-[#14110F]">
                      ₹{totalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pan-India Shipping</span>
                    <span className="font-bold text-emerald-600">FREE</span>
                  </div>
                  <div className="flex justify-between border-t border-[#E7E1D6] pt-1.5 font-black text-[#14110F] text-sm">
                    <span>Total Amount</span>
                    <span>₹{totalPrice.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] text-[#81796F] justify-center">
                  <ShieldCheck size={13} className="text-emerald-600" />
                  <span>100% Original Verified · 7-Day Exchange</span>
                </div>

                <button
                  type="button"
                  onClick={handleProceedToCheckout}
                  className="btn-primary w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-white flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </>
          )}
        </div>
      </aside>
    </div>
  )
}

